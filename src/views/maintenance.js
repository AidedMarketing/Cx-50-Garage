/* ─── View: Maintenance Log ────────────────────────────────── */

window.Views = window.Views || {};

let _maintViewMode = 'list';

const MAINT_FILTERS = [
  { key: 'all',        label: 'All' },
  { key: 'oil',        label: 'Oil',       types: ['Oil & Filter Change'] },
  { key: 'tires',      label: 'Tires',     types: ['Tire Rotation', 'Tire Replacement', 'Alignment'] },
  { key: 'brakes',     label: 'Brakes',    types: ['Brake Inspection', 'Brake Fluid'] },
  { key: 'fluids',     label: 'Fluids',    types: ['Transmission Fluid', 'Coolant Flush'] },
  { key: 'filters',    label: 'Filters',   types: ['Cabin Air Filter', 'Engine Air Filter'] },
  { key: 'other',      label: 'Other',     types: ['Spark Plugs', 'Multi-Point Inspection', 'Wiper Blades', 'Detail / Wash', 'Battery', 'Other'] },
];

function renderMaintenanceTimeline(entries) {
  if (entries.length === 0) return `
    <div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      <p>No service entries yet.</p>
    </div>`;

  const dotColor = type => {
    if (!type) return 'var(--text-tertiary)';
    if (type.includes('Oil'))    return 'var(--accent)';
    if (type.includes('Tire') || type.includes('Align')) return 'var(--blue)';
    if (type.includes('Brake'))  return 'var(--amber)';
    if (type.includes('Filter')) return 'var(--green)';
    return 'var(--text-tertiary)';
  };

  return `<div style="padding: 4px 0 8px;">` +
    entries.map((e, i) => `
      <div style="display:flex; gap:14px; padding-bottom:0;">
        <div style="display:flex; flex-direction:column; align-items:center; width:14px; flex-shrink:0; padding-top:4px;">
          <div style="width:10px;height:10px;border-radius:50%;background:${dotColor(e.type)};flex-shrink:0;"></div>
          ${i < entries.length - 1 ? `<div style="width:1.5px;flex:1;background:var(--border-light);margin-top:3px;min-height:20px;"></div>` : ''}
        </div>
        <div style="flex:1;padding-bottom:${i < entries.length - 1 ? '14px' : '4px'};cursor:pointer;" onclick="openMaintenanceDetail('${e.id}')">
          <div style="font-size:14px;font-weight:500;color:var(--text-primary);margin-bottom:2px;">${e.type || 'Service'}</div>
          <div style="font-size:12px;color:var(--text-secondary);">${App.formatDate(e.date)}${e.mileage ? ' · ' + App.formatMileage(e.mileage) : ''}</div>
          <div style="font-size:11px;color:var(--text-tertiary);margin-top:1px;">${[e.shop, e.cost ? App.formatCurrency(e.cost) : ''].filter(Boolean).join(' · ')}</div>
          ${e.partsUsed ? `<div style="font-size:11px;color:var(--text-tertiary);margin-top:1px;font-style:italic;">${e.partsUsed.length > 65 ? e.partsUsed.slice(0, 65) + '…' : e.partsUsed}</div>` : ''}
        </div>
      </div>`
    ).join('') + `</div>`;
}

function renderMaintenanceList(entries, filter) {
  const def = MAINT_FILTERS.find(f => f.key === filter);
  const filtered = filter === 'all' ? entries : entries.filter(e => def?.types?.includes(e.type));
  if (filtered.length === 0) return `
    <div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
      <p>No entries in this category.</p>
    </div>`;
  return filtered.map(e => maintenanceItem(e)).join('');
}

Views.maintenance = function () {
  const entries = [...App.getMaintenance()].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalCost = entries.reduce((s, e) => s + (Number(e.cost) || 0), 0);

  window._postRenderHooks['maintenance'] = function () {
    document.getElementById('maint-filter-bar')?.addEventListener('click', ev => {
      const pill = ev.target.closest('.filter-pill');
      if (!pill) return;
      document.querySelectorAll('#maint-filter-bar .filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      if (_maintViewMode === 'list') {
        const all = [...App.getMaintenance()].sort((a, b) => new Date(b.date) - new Date(a.date));
        document.getElementById('maint-list').innerHTML = renderMaintenanceList(all, pill.dataset.filter);
      }
    });

    document.getElementById('maint-view-toggles')?.addEventListener('click', ev => {
      const btn = ev.target.closest('[data-mode]');
      if (!btn) return;
      _maintViewMode = btn.dataset.mode;
      document.querySelectorAll('#maint-view-toggles [data-mode]').forEach(b => {
        b.classList.toggle('view-toggle-active', b.dataset.mode === _maintViewMode);
      });
      const all = [...App.getMaintenance()].sort((a, b) => new Date(b.date) - new Date(a.date));
      const activePill = document.querySelector('#maint-filter-bar .filter-pill.active');
      const filter = activePill?.dataset.filter || 'all';
      document.getElementById('maint-list').innerHTML = _maintViewMode === 'timeline'
        ? renderMaintenanceTimeline(all)
        : renderMaintenanceList(all, filter);
    });
  };

  return `
  <div class="view" id="view-maintenance">
    <div class="page-header">
      <div style="display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <h1>Service Log</h1>
          <div class="subtitle">${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} · ${App.formatCurrency(totalCost)} total</div>
        </div>
        ${entries.length > 0 ? `
        <div style="display:flex; align-items:center; gap:6px; margin-bottom:2px;">
          <div id="maint-view-toggles" style="display:flex; border:1px solid var(--border); border-radius:var(--radius-sm); overflow:hidden;">
            <button data-mode="list" class="${_maintViewMode === 'list' ? 'view-toggle-active' : ''}" style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);" title="List view">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px;"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1"/><circle cx="3" cy="12" r="1"/><circle cx="3" cy="18" r="1"/></svg>
            </button>
            <button data-mode="timeline" class="${_maintViewMode === 'timeline' ? 'view-toggle-active' : ''}" style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:var(--text-tertiary);border-left:1px solid var(--border);" title="Timeline view">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            </button>
          </div>
          <button onclick="App.exportData('maintenance')" style="
            padding:6px 10px; border:1px solid var(--border); border-radius: var(--radius-sm);
            font-size:12px; color: var(--text-tertiary); font-family: var(--font-ui);
            background: var(--bg-card); display:flex; align-items:center; gap:5px;
          ">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>
        </div>` : ''}
      </div>
    </div>

    ${entries.length > 0 ? `
    <div class="filter-bar" id="maint-filter-bar">
      ${MAINT_FILTERS.map((f, i) => `<button class="filter-pill${i === 0 ? ' active' : ''}" data-filter="${f.key}">${f.label}</button>`).join('')}
    </div>` : ''}

    <div id="maint-list" style="padding: ${entries.length > 0 ? '8px' : '0'} 16px;">
      ${entries.length === 0 ? `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
          <p>No service entries yet.<br>Tap + to log your first service.</p>
        </div>` :
        _maintViewMode === 'timeline' ? renderMaintenanceTimeline(entries) : renderMaintenanceList(entries, 'all')
      }
    </div>

    <button class="fab" onclick="openMaintenanceForm()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </button>
  </div>`;
};

function maintenanceItem(e) {
  return `
  <div class="list-item" onclick="openMaintenanceDetail('${e.id}')">
    <div class="list-item-content">
      <div class="list-item-title">${e.type}</div>
      <div class="list-item-meta">${App.formatDate(e.date)} · ${App.formatMileage(e.mileage)}</div>
      ${e.shop ? `<div class="list-item-meta" style="margin-top: 2px;">${e.shop}</div>` : ''}
      ${e.partsUsed ? `<div class="list-item-meta" style="margin-top: 2px; font-size: 11px; color: var(--text-tertiary);">${e.partsUsed.length > 70 ? e.partsUsed.slice(0,70) + '…' : e.partsUsed}</div>` : ''}
      ${e.notes ? `<div class="list-item-meta" style="margin-top: 3px; font-size: 11px; color: var(--text-tertiary);">${e.notes.length > 60 ? e.notes.slice(0,60) + '…' : e.notes}</div>` : ''}
    </div>
    <div class="list-item-right">
      <span class="cost">${App.formatCurrency(e.cost)}</span>
      ${e.nextDueDate || e.nextMileage ? `<span class="text-muted">Next: ${e.nextDueDate ? App.formatDate(e.nextDueDate) : ''}${e.nextDueDate && e.nextMileage ? ' · ' : ''}${e.nextMileage ? App.formatMileage(e.nextMileage) : ''}</span>` : ''}
    </div>
  </div>`;
}

const SERVICE_INTERVALS = {
  'Oil & Filter Change':    { miles: 5000,   months: 6  },
  'Tire Rotation':          { miles: 5000,   months: null },
  'Brake Inspection':       { miles: null,   months: 12 },
  'Brake Fluid':            { miles: 20000,  months: 24 },
  'Cabin Air Filter':       { miles: 10000,  months: null },
  'Engine Air Filter':      { miles: 15000,  months: null },
  'Spark Plugs':            { miles: 30000,  months: null },
  'Transmission Fluid':     { miles: 30000,  months: null },
  'Coolant Flush':          { miles: 100000, months: null },
  'Multi-Point Inspection': { miles: null,   months: 12 },
  'Battery':                { miles: null,   months: 48 },
};

function calcMaintenanceNextDue() {
  const type    = document.getElementById('m-type')?.value;
  const dateStr = document.getElementById('m-date')?.value;
  const mileage = parseInt(document.getElementById('m-mileage')?.value, 10);
  const nextDateEl    = document.getElementById('m-next-date');
  const nextMileageEl = document.getElementById('m-next-mileage');
  if (!nextDateEl || !nextMileageEl) return;
  const interval = SERVICE_INTERVALS[type];
  if (!interval) return;
  if (!nextDateEl.value && interval.months && dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setMonth(d.getMonth() + interval.months);
    nextDateEl.value = d.toISOString().split('T')[0];
  }
  if (!nextMileageEl.value && interval.miles && !isNaN(mileage) && mileage > 0) {
    nextMileageEl.value = mileage + interval.miles;
  }
}

function openMaintenanceForm(existing) {
  const e = existing || {};
  const SERVICE_TYPES = [
    'Oil & Filter Change','Tire Rotation','Brake Inspection','Brake Fluid',
    'Cabin Air Filter','Engine Air Filter','Spark Plugs','Transmission Fluid',
    'Coolant Flush','Wiper Blades','Multi-Point Inspection','Tire Replacement',
    'Detail / Wash','Battery','Alignment','Other',
  ];

  App.openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">${e.id ? 'Edit Service' : 'Log Service'}</span>
      <button class="modal-close" onclick="App.closeModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Service Type</label>
        <select class="form-select" id="m-type" onchange="calcMaintenanceNextDue()">
          ${SERVICE_TYPES.map(t => `<option value="${t}" ${e.type === t ? 'selected' : ''}>${t}</option>`).join('')}
        </select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="date" class="form-input" id="m-date" value="${e.date || new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group">
          <label class="form-label">Mileage</label>
          <input type="number" class="form-input" id="m-mileage" placeholder="e.g. 12500" value="${e.mileage || ''}" oninput="calcMaintenanceNextDue()">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Cost ($)</label>
          <input type="number" class="form-input" id="m-cost" placeholder="0.00" value="${e.cost || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Shop / DIY</label>
          <select class="form-select" id="m-shop">
            <option value="">— select —</option>
            <option value="DIY" ${e.shop === 'DIY' ? 'selected' : ''}>DIY</option>
            <option value="Dealership" ${e.shop === 'Dealership' ? 'selected' : ''}>Dealership</option>
            <option value="Independent Shop" ${e.shop === 'Independent Shop' ? 'selected' : ''}>Independent Shop</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Next Due Date</label>
          <input type="date" class="form-input" id="m-next-date" value="${e.nextDueDate || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Next Due Mileage</label>
          <input type="number" class="form-input" id="m-next-mileage" placeholder="e.g. 17500" value="${e.nextMileage || ''}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Parts / Materials Used</label>
        <input type="text" class="form-input" id="m-parts" placeholder="e.g. Mobil 1 0W-20, OEM filter MA-010-PH9-30B" value="${e.partsUsed || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <textarea class="form-textarea" id="m-notes" placeholder="Observations, warnings, etc.">${e.notes || ''}</textarea>
      </div>
      <button class="btn-primary" onclick="saveMaintenanceEntry('${e.id || ''}')">
        ${e.id ? 'Save Changes' : 'Add Entry'}
      </button>
      ${e.id ? `<button class="btn-destructive" onclick="deleteMaintenanceEntry('${e.id}')">Delete Entry</button>` : ''}
    </div>
  `);
}

function openMaintenanceDetail(id) {
  const e = App.getMaintenance().find(x => x.id === id);
  if (e) openMaintenanceForm(e);
}

function saveMaintenanceEntry(existingId) {
  const all = App.getMaintenance();
  const entry = {
    id:           existingId || App.uid(),
    type:         document.getElementById('m-type').value,
    date:         document.getElementById('m-date').value,
    mileage:      document.getElementById('m-mileage').value,
    cost:         document.getElementById('m-cost').value,
    shop:         document.getElementById('m-shop').value,
    nextDueDate:  document.getElementById('m-next-date').value,
    nextMileage:  document.getElementById('m-next-mileage').value,
    partsUsed:    document.getElementById('m-parts').value.trim(),
    notes:        document.getElementById('m-notes').value,
  };

  if (!entry.date || !entry.type) { App.toast('Please select a service type and date.'); return; }

  if (existingId) {
    const idx = all.findIndex(x => x.id === existingId);
    if (idx > -1) all[idx] = entry;
  } else {
    all.push(entry);
  }

  App.saveMaintenance(all);
  App.closeModal();
  App.toast('Service entry saved ✓');
  App.navigate('maintenance');
}

function deleteMaintenanceEntry(id) {
  App.confirm('Delete this service entry?', () => {
    App.saveMaintenance(App.getMaintenance().filter(x => x.id !== id));
    App.toast('Entry deleted');
    App.navigate('maintenance');
  });
}

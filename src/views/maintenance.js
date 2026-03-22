/* ─── View: Maintenance Log ────────────────────────────────── */

window.Views = window.Views || {};

Views.maintenance = function () {
  const entries = [...App.getMaintenance()].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalCost = entries.reduce((s, e) => s + (Number(e.cost) || 0), 0);

  return `
  <div class="view" id="view-maintenance">
    <div class="page-header">
      <div style="display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <h1>Service Log</h1>
          <div class="subtitle">${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} · ${App.formatCurrency(totalCost)} total</div>
        </div>
        ${entries.length > 0 ? `
        <button onclick="App.exportData('maintenance')" style="
          padding:7px 12px; border:1px solid var(--border); border-radius: var(--radius-sm);
          font-size:12px; color: var(--text-tertiary); font-family: var(--font-ui);
          background: var(--bg-card); display:flex; align-items:center; gap:5px; margin-bottom:2px;
        ">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>` : ''}
      </div>
    </div>

    <div style="padding: 8px 0;">
      ${entries.length === 0 ? `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
          <p>No service entries yet.<br>Tap + to log your first service.</p>
        </div>` :
        `<div style="padding: 0 16px;">
          ${entries.map(e => maintenanceItem(e)).join('')}
        </div>`
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
      ${e.notes ? `<div class="list-item-meta" style="margin-top: 3px; font-size: 11px; color: var(--text-tertiary);">${e.notes.length > 60 ? e.notes.slice(0,60) + '…' : e.notes}</div>` : ''}
    </div>
    <div class="list-item-right">
      <span class="cost">${App.formatCurrency(e.cost)}</span>
      ${e.nextDueDate ? `<span class="text-muted">Next: ${App.formatDate(e.nextDueDate)}</span>` : ''}
    </div>
  </div>`;
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
        <select class="form-select" id="m-type">
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
          <input type="number" class="form-input" id="m-mileage" placeholder="e.g. 12500" value="${e.mileage || ''}">
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
        <label class="form-label">Notes</label>
        <textarea class="form-textarea" id="m-notes" placeholder="Parts used, observations, etc.">${e.notes || ''}</textarea>
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

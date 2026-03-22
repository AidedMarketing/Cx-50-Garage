/* ─── View: Mods & Upgrades Tracker ───────────────────────── */

window.Views = window.Views || {};

Views.mods = function () {
  const mods = App.getMods();
  const installed = mods.filter(m => m.status === 'installed').length;
  const totalEstimated = mods
    .filter(m => m.status !== 'installed' && m.status !== 'skipped')
    .reduce((s, m) => s + (Number(m.estimatedCost) || 0), 0);
  const totalActualSpend = mods
    .filter(m => m.status === 'installed')
    .reduce((s, m) => s + (Number(m.actualCost) || 0), 0);

  // Register post-render hook for filter pills (replaces global postRender)
  window._postRenderHooks['mods'] = function () {
    document.getElementById('mods-filter-bar')?.addEventListener('click', e => {
      const pill = e.target.closest('.filter-pill');
      if (!pill) return;
      document.querySelectorAll('#mods-filter-bar .filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      document.getElementById('mods-list').innerHTML = renderModsList(App.getMods(), pill.dataset.filter);
    });
  };

  return `
  <div class="view" id="view-mods">
    <div class="page-header">
      <div style="display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <h1>Mods &amp; Upgrades</h1>
          <div class="subtitle">${installed} installed · ${App.formatCurrency(totalActualSpend)} spent · ${App.formatCurrency(totalEstimated)} pipeline</div>
        </div>
        <button onclick="App.exportData('mods')" style="
          padding:7px 12px; border:1px solid var(--border); border-radius: var(--radius-sm);
          font-size:12px; color: var(--text-tertiary); font-family: var(--font-ui);
          background: var(--bg-card); display:flex; align-items:center; gap:5px; margin-bottom:2px;
        ">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>
      </div>
    </div>

    <div class="filter-bar" id="mods-filter-bar">
      <button class="filter-pill active" data-filter="all">All</button>
      <button class="filter-pill" data-filter="to-do">To Do</button>
      <button class="filter-pill" data-filter="researching">Researching</button>
      <button class="filter-pill" data-filter="ready-to-buy">Ready to Buy</button>
      <button class="filter-pill" data-filter="installed">Installed</button>
      <button class="filter-pill" data-filter="skipped">Skipped</button>
    </div>

    <div id="mods-list" style="padding: 0 16px 8px;">
      ${renderModsList(mods, 'all')}
    </div>

    <button class="fab" onclick="openModForm()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </button>
  </div>`;
};

function renderModsList(mods, filter) {
  const filtered = filter === 'all' ? mods : mods.filter(m => m.status === filter);
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  const sorted = [...filtered].sort((a, b) => {
    const pd = (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9);
    return pd !== 0 ? pd : a.name.localeCompare(b.name);
  });

  if (sorted.length === 0) return `
    <div class="empty-state">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      <p>No mods in this category.</p>
    </div>`;

  return sorted.map(m => `
    <div class="list-item" onclick="openModDetail('${m.id}')">
      <div class="list-item-content">
        <div class="list-item-title">${m.name}</div>
        <div class="list-item-meta" style="margin-top: 3px;">${m.category}${m.brand ? ' · ' + m.brand : ''}</div>
        ${m.notes ? `<div class="list-item-meta" style="margin-top: 4px; font-size: 11px; color: var(--text-tertiary); line-height: 1.4;">${m.notes.length > 90 ? m.notes.slice(0,90) + '…' : m.notes}</div>` : ''}
      </div>
      <div class="list-item-right">
        ${App.statusBadge(m.status)}
        ${App.priorityBadge(m.priority)}
        ${m.status === 'installed' && m.actualCost != null ? (() => {
          const variance = (m.estimatedCost != null) ? m.estimatedCost - m.actualCost : null;
          const varHtml = variance !== null && variance !== 0
            ? `<span style="font-size:10px; color:${variance > 0 ? 'var(--green)' : 'var(--accent)'};">${variance > 0 ? 'saved ' : 'over '}${App.formatCurrency(Math.abs(variance))}</span>`
            : '';
          return `<span class="cost" style="font-size:13px;">${App.formatCurrency(m.actualCost)}</span>${varHtml}`;
        })() : `<span class="cost" style="font-size:13px; color:var(--text-tertiary);">${App.formatCurrency(m.estimatedCost)}</span>`}
      </div>
    </div>`).join('');
}

function openModDetail(id) {
  const m = App.getMods().find(x => x.id === id);
  if (m) openModForm(m);
}

function openModForm(existing) {
  const m = existing || {};
  const CATEGORIES = ['Sound / Performance','Protection','Comfort & Tech','Cosmetic','Maintenance Upgrade','Other'];

  App.openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">${m.id ? 'Edit Mod' : 'Add Mod'}</span>
      <button class="modal-close" onclick="App.closeModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Mod / Upgrade Name</label>
        <input type="text" class="form-input" id="mod-name" placeholder="e.g. Cold Air Intake" value="${m.name || ''}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Status</label>
          <select class="form-select" id="mod-status">
            ${[['researching','Researching'],['to-do','To Do'],['ready-to-buy','Ready to Buy'],['installed','Installed'],['skipped','Skipped']]
              .map(([v,l]) => `<option value="${v}" ${m.status === v ? 'selected' : ''}>${l}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Priority</label>
          <select class="form-select" id="mod-priority">
            <option value="high" ${m.priority === 'high' ? 'selected' : ''}>High</option>
            <option value="medium" ${m.priority === 'medium' ? 'selected' : ''}>Medium</option>
            <option value="low" ${m.priority === 'low' ? 'selected' : ''}>Low</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select" id="mod-category">
          ${CATEGORIES.map(c => `<option value="${c}" ${m.category === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Est. Cost ($)</label>
          <input type="number" class="form-input" id="mod-est-cost" placeholder="0" value="${m.estimatedCost || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Actual Cost ($)</label>
          <input type="number" class="form-input" id="mod-actual-cost" placeholder="0" value="${m.actualCost || ''}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Brand / Source</label>
          <input type="text" class="form-input" id="mod-brand" placeholder="e.g. CorkSport" value="${m.brand || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Install Type</label>
          <select class="form-select" id="mod-install">
            <option value="DIY" ${m.installType === 'DIY' ? 'selected' : ''}>DIY</option>
            <option value="Shop" ${m.installType === 'Shop' ? 'selected' : ''}>Shop</option>
            <option value="Dealer" ${m.installType === 'Dealer' ? 'selected' : ''}>Dealer</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Date Installed</label>
        <input type="date" class="form-input" id="mod-date" value="${m.dateInstalled || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <textarea class="form-textarea" id="mod-notes" placeholder="Research notes, install tips, observations…">${m.notes || ''}</textarea>
      </div>
      <button class="btn-primary" onclick="saveModEntry('${m.id || ''}')">
        ${m.id ? 'Save Changes' : 'Add Mod'}
      </button>
      ${m.id ? `<button class="btn-destructive" onclick="deleteModEntry('${m.id}')">Delete Mod</button>` : ''}
    </div>
  `);
}

function saveModEntry(existingId) {
  const all = App.getMods();
  const entry = {
    id:            existingId || App.uid(),
    name:          document.getElementById('mod-name').value.trim(),
    status:        document.getElementById('mod-status').value,
    priority:      document.getElementById('mod-priority').value,
    category:      document.getElementById('mod-category').value,
    estimatedCost: document.getElementById('mod-est-cost').value !== '' ? Number(document.getElementById('mod-est-cost').value) : null,
    actualCost:    document.getElementById('mod-actual-cost').value !== '' ? Number(document.getElementById('mod-actual-cost').value) : null,
    brand:         document.getElementById('mod-brand').value.trim(),
    installType:   document.getElementById('mod-install').value,
    dateInstalled: document.getElementById('mod-date').value,
    notes:         document.getElementById('mod-notes').value.trim(),
  };

  if (!entry.name) { App.toast('Please enter a mod name.'); return; }

  if (existingId) {
    const idx = all.findIndex(x => x.id === existingId);
    if (idx > -1) all[idx] = entry;
  } else {
    all.push(entry);
  }

  App.saveMods(all);
  App.closeModal();
  App.toast(existingId ? 'Mod updated ✓' : 'Mod added ✓');
  App.navigate('mods');
}

function deleteModEntry(id) {
  App.confirm('Delete this mod?', () => {
    App.saveMods(App.getMods().filter(x => x.id !== id));
    App.toast('Mod deleted');
    App.navigate('mods');
  });
}

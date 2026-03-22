/* ─── View: Fuel Log ───────────────────────────────────────── */

window.Views = window.Views || {};

Views.fuel = function () {
  const allFuel = App.getFuel();
  const entries = [...allFuel].sort((a, b) => new Date(b.date) - new Date(a.date));
  const sorted  = [...allFuel].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Stats
  let totalMiles = 0, totalGallons = 0;
  for (let i = 1; i < sorted.length; i++) {
    const miles   = Number(sorted[i].odometer) - Number(sorted[i-1].odometer);
    const gallons = Number(sorted[i].gallons);
    if (miles > 0 && gallons > 0) { totalMiles += miles; totalGallons += gallons; }
  }
  const totalSpent = sorted.reduce((s, e) => s + (Number(e.totalPrice) || 0), 0);
  const avgMpg = totalGallons > 0 ? (totalMiles / totalGallons).toFixed(1) : '—';
  const avgPpg = sorted.length > 0
    ? (sorted.reduce((s, e) => s + (Number(e.pricePerGallon) || 0), 0) / sorted.length).toFixed(2)
    : '—';

  return `
  <div class="view" id="view-fuel">
    <div class="page-header">
      <div style="display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <h1>Fuel Log</h1>
          <div class="subtitle">${entries.length} fill-ups · ${App.formatCurrency(totalSpent)} total</div>
        </div>
        ${entries.length > 0 ? `
        <button onclick="App.exportData('fuel')" style="
          padding:7px 12px; border:1px solid var(--border); border-radius: var(--radius-sm);
          font-size:12px; color: var(--text-tertiary); font-family: var(--font-ui);
          background: var(--bg-card); display:flex; align-items:center; gap:5px; margin-bottom:2px;
        ">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:13px;height:13px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export
        </button>` : ''}
      </div>
    </div>

    ${entries.length > 0 ? `
    <div style="padding: 12px 16px 0;">
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-value">${avgMpg}</div>
          <div class="stat-label">Avg MPG</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">$${avgPpg}</div>
          <div class="stat-label">Avg price / gal</div>
        </div>
      </div>
    </div>` : ''}

    <div style="padding: ${entries.length > 0 ? '12px' : '0'} 16px 8px;">
      ${entries.length === 0 ? `
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 22V6a2 2 0 012-2h8a2 2 0 012 2v16"/><path d="M17 14h1a2 2 0 012 2v2a1 1 0 001 1 1 1 0 001-1V9l-3-3"/><path d="M3 22h14"/><rect x="6" y="8" width="5" height="4" rx="1"/></svg>
          <p>No fill-ups logged yet.<br>Tap + to add your first entry.</p>
        </div>` :
        entries.map(e => fuelItem(e, sorted)).join('')
      }
    </div>

    <button class="fab" onclick="openFuelForm()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </button>
  </div>`;
};

function fuelItem(e, allSorted) {
  const idx = allSorted.findIndex(x => x.id === e.id);
  let mpg = null;
  if (idx > 0) {
    const miles   = Number(allSorted[idx].odometer) - Number(allSorted[idx-1].odometer);
    const gallons = Number(allSorted[idx].gallons);
    if (miles > 0 && gallons > 0) mpg = (miles / gallons).toFixed(1);
  }

  return `
  <div class="list-item" onclick="openFuelDetail('${e.id}')">
    <div class="list-item-content">
      <div class="list-item-title">${App.formatDate(e.date)}</div>
      <div class="list-item-meta">${e.gallons ? e.gallons + ' gal' : ''}${e.pricePerGallon ? ' · $' + Number(e.pricePerGallon).toFixed(2) + '/gal' : ''}${e.odometer ? ' · ' + App.formatMileage(e.odometer) : ''}</div>
      ${e.station ? `<div class="list-item-meta" style="margin-top: 2px;">${e.station}</div>` : ''}
    </div>
    <div class="list-item-right">
      <span class="cost">${App.formatCurrency(e.totalPrice)}</span>
      ${mpg ? `<span class="text-muted">${mpg} mpg</span>` : ''}
    </div>
  </div>`;
}

function openFuelForm(existing) {
  const e = existing || {};
  App.openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">${e.id ? 'Edit Fill-Up' : 'Log Fill-Up'}</span>
      <button class="modal-close" onclick="App.closeModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Date</label>
          <input type="date" class="form-input" id="f-date" value="${e.date || new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group">
          <label class="form-label">Odometer (mi)</label>
          <input type="number" class="form-input" id="f-odometer" placeholder="e.g. 14250" value="${e.odometer || ''}" oninput="calcFuelTotal()">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Gallons</label>
          <input type="number" step="0.001" class="form-input" id="f-gallons" placeholder="e.g. 11.2" value="${e.gallons || ''}" oninput="calcFuelTotal()">
        </div>
        <div class="form-group">
          <label class="form-label">Price / Gallon ($)</label>
          <input type="number" step="0.001" class="form-input" id="f-ppg" placeholder="e.g. 3.89" value="${e.pricePerGallon || ''}" oninput="calcFuelTotal()">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Total Paid ($)</label>
        <input type="number" step="0.01" class="form-input" id="f-total" placeholder="auto-calculated" value="${e.totalPrice || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Station / Location</label>
        <input type="text" class="form-input" id="f-station" placeholder="e.g. Costco Doral" value="${e.station || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <textarea class="form-textarea" id="f-notes" placeholder="Premium, full tank, etc." style="min-height: 60px;">${e.notes || ''}</textarea>
      </div>
      <button class="btn-primary" onclick="saveFuelEntry('${e.id || ''}')">
        ${e.id ? 'Save Changes' : 'Add Fill-Up'}
      </button>
      ${e.id ? `<button class="btn-destructive" onclick="deleteFuelEntry('${e.id}')">Delete Entry</button>` : ''}
    </div>
  `);
}

function calcFuelTotal() {
  const gallons = parseFloat(document.getElementById('f-gallons')?.value);
  const ppg     = parseFloat(document.getElementById('f-ppg')?.value);
  const totalEl = document.getElementById('f-total');
  if (gallons > 0 && ppg > 0 && totalEl) totalEl.value = (gallons * ppg).toFixed(2);
}

function openFuelDetail(id) {
  const e = App.getFuel().find(x => x.id === id);
  if (e) openFuelForm(e);
}

function saveFuelEntry(existingId) {
  const all = App.getFuel();
  const entry = {
    id:             existingId || App.uid(),
    date:           document.getElementById('f-date').value,
    odometer:       document.getElementById('f-odometer').value,
    gallons:        document.getElementById('f-gallons').value,
    pricePerGallon: document.getElementById('f-ppg').value,
    totalPrice:     document.getElementById('f-total').value,
    station:        document.getElementById('f-station').value.trim(),
    notes:          document.getElementById('f-notes').value.trim(),
  };

  if (!entry.date) { App.toast('Please enter a date.'); return; }

  if (existingId) {
    const idx = all.findIndex(x => x.id === existingId);
    if (idx > -1) all[idx] = entry;
  } else {
    all.push(entry);
  }

  App.saveFuel(all);
  App.closeModal();
  App.toast('Fill-up saved ✓');
  App.navigate('fuel');
}

function deleteFuelEntry(id) {
  if (!confirm('Delete this fill-up?')) return;
  App.saveFuel(App.getFuel().filter(x => x.id !== id));
  App.closeModal();
  App.toast('Entry deleted');
  App.navigate('fuel');
}

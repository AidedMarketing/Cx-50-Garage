/* ─── View: Dashboard ──────────────────────────────────────── */

window.Views = window.Views || {};

Views.dashboard = function () {
  const maintenance = App.getMaintenance();
  const mods = App.getMods();
  const fuel = App.getFuel();
  const v = App.getVehicle();

  // Stats
  const totalServiceCost = maintenance.reduce((s, m) => s + (Number(m.cost) || 0), 0);
  const modsInstalled = mods.filter(m => m.status === 'installed').length;
  const modsActualSpend = mods.filter(m => m.status === 'installed').reduce((s, m) => s + (Number(m.actualCost) || 0), 0);
  const totalFuelSpend = fuel.reduce((s, e) => s + (Number(e.totalPrice) || 0), 0);

  // Cost per mile — total all-in spend ÷ miles driven (from fuel odometer range)
  const fuelChron = [...fuel].sort((a, b) => new Date(a.date) - new Date(b.date));
  const firstOdo = fuelChron[0]?.odometer ? Number(fuelChron[0].odometer) : null;
  const lastOdo  = fuelChron[fuelChron.length - 1]?.odometer ? Number(fuelChron[fuelChron.length - 1].odometer) : null;
  const totalMilesDriven = firstOdo && lastOdo && lastOdo > firstOdo ? lastOdo - firstOdo : null;
  const allInSpend = totalServiceCost + totalFuelSpend + modsActualSpend;
  const costPerMile = totalMilesDriven ? (allInSpend / totalMilesDriven).toFixed(2) : null;

  // Miles since last oil change
  const lastOilChange = [...maintenance]
    .filter(m => m.type === 'Oil & Filter Change' && m.mileage)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  // Current odometer — prefer latest fuel entry, fall back to latest service entry
  const latestFuel = [...fuel].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const latestMaint = [...maintenance].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const currentOdometer = latestFuel?.odometer
    ? Number(latestFuel.odometer)
    : (latestMaint?.mileage ? Number(latestMaint.mileage) : null);

  // Next maintenance alert — priority: overdue by mileage > overdue by date > near mileage > upcoming date
  const now = new Date();
  let alertEntry = null, alertKind = null;

  if (currentOdometer) {
    alertEntry = maintenance
      .filter(m => m.nextMileage && Number(m.nextMileage) <= currentOdometer)
      .sort((a, b) => Number(a.nextMileage) - Number(b.nextMileage))[0] || null;
    if (alertEntry) alertKind = 'overdue-miles';
  }

  if (!alertEntry) {
    alertEntry = maintenance
      .filter(m => m.nextDueDate && new Date(m.nextDueDate) < now)
      .sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate))[0] || null;
    if (alertEntry) alertKind = 'overdue-date';
  }

  if (!alertEntry && currentOdometer) {
    alertEntry = maintenance
      .filter(m => m.nextMileage && Number(m.nextMileage) > currentOdometer && Number(m.nextMileage) - currentOdometer <= 1000)
      .sort((a, b) => Number(a.nextMileage) - Number(b.nextMileage))[0] || null;
    if (alertEntry) alertKind = 'near-miles';
  }

  if (!alertEntry) {
    alertEntry = maintenance
      .filter(m => m.nextDueDate && new Date(m.nextDueDate) >= now)
      .sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate))[0] || null;
    if (alertEntry) alertKind = 'upcoming-date';
  }

  const clockIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
  const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;

  const milesSinceOil = currentOdometer && lastOilChange?.mileage
    ? currentOdometer - Number(lastOilChange.mileage)
    : null;
  const oilInsight = milesSinceOil !== null && milesSinceOil >= 0 ? (() => {
    const color = milesSinceOil > 5000 ? 'var(--accent)' : milesSinceOil > 4000 ? 'var(--amber)' : 'var(--text-tertiary)';
    return `<div style="text-align:center; font-size:12px; color:${color}; margin-top:6px;">${App.formatMileage(milesSinceOil)} since last oil change</div>`;
  })() : '';

  let upcomingAlert;
  if (!alertEntry) {
    upcomingAlert = `<div class="alert-banner alert-green">${checkIcon}<span>No upcoming maintenance scheduled</span></div>`;
  } else if (alertKind === 'overdue-miles') {
    const milesOver = currentOdometer - Number(alertEntry.nextMileage);
    upcomingAlert = `<div class="alert-banner alert-red">${clockIcon}<span><strong>Overdue by mileage:</strong> ${alertEntry.type} — was due at ${App.formatMileage(alertEntry.nextMileage)} (${App.formatMileage(milesOver)} over)</span></div>`;
  } else if (alertKind === 'overdue-date') {
    upcomingAlert = `<div class="alert-banner alert-red">${clockIcon}<span><strong>Overdue:</strong> ${alertEntry.type} — ${App.formatDate(alertEntry.nextDueDate)}${alertEntry.nextMileage ? ` · ${App.formatMileage(alertEntry.nextMileage)}` : ''}</span></div>`;
  } else if (alertKind === 'near-miles') {
    const milesLeft = Number(alertEntry.nextMileage) - currentOdometer;
    upcomingAlert = `<div class="alert-banner alert-amber">${clockIcon}<span><strong>Due soon:</strong> ${alertEntry.type} — ${App.formatMileage(alertEntry.nextMileage)} (${App.formatMileage(milesLeft)} away)</span></div>`;
  } else {
    upcomingAlert = `<div class="alert-banner alert-amber">${clockIcon}<span><strong>Due:</strong> ${alertEntry.type} — ${App.formatDate(alertEntry.nextDueDate)}${alertEntry.nextMileage ? ` · ${App.formatMileage(alertEntry.nextMileage)}` : ''}</span></div>`;
  }

  // Top priority mod
  const topMod = mods.find(m => m.priority === 'high' && m.status !== 'installed' && m.status !== 'skipped');

  // Avg MPG
  let avgMpg = '—';
  if (fuel.length >= 2) {
    const sorted = [...fuel].sort((a, b) => new Date(a.date) - new Date(b.date));
    let totalMiles = 0, totalGallons = 0;
    for (let i = 1; i < sorted.length; i++) {
      const miles = Number(sorted[i].odometer) - Number(sorted[i-1].odometer);
      const gallons = Number(sorted[i].gallons);
      if (miles > 0 && gallons > 0) { totalMiles += miles; totalGallons += gallons; }
    }
    if (totalGallons > 0) avgMpg = (totalMiles / totalGallons).toFixed(1);
  }

  return `
  <div class="view" id="view-dashboard">
    <div style="padding-top: 52px;">

      <!-- Hero Card (tap to edit vehicle info) -->
      <div class="hero-card" onclick="openVehicleEdit()" style="cursor:pointer;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div class="hero-model">${v.year} ${v.make} ${v.model}</div>
            <div class="hero-trim">${v.trim}</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1.5" style="width:16px;height:16px;flex-shrink:0;margin-top:2px;"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </div>
        <div class="hero-stats">
          <div>
            <div class="hero-stat-value">${v.hp}<span style="font-size:12px;color:rgba(255,255,255,0.5)"> hp</span></div>
            <div class="hero-stat-label">Power</div>
          </div>
          <div>
            <div class="hero-stat-value">${v.torque}<span style="font-size:12px;color:rgba(255,255,255,0.5)"> lb-ft</span></div>
            <div class="hero-stat-label">Torque</div>
          </div>
          <div>
            <div class="hero-stat-value">${avgMpg}</div>
            <div class="hero-stat-label">Avg MPG</div>
          </div>
        </div>
      </div>

      <!-- Alert -->
      <div style="margin-top: 12px;">${upcomingAlert}${oilInsight}</div>

      <!-- Stats Grid -->
      <div style="padding: 0 16px;">
        <div class="stat-grid">
          <div class="stat-card" onclick="App.navigate('maintenance')" style="cursor:pointer;">
            <div class="stat-value">${maintenance.length}</div>
            <div class="stat-label">Service entries</div>
          </div>
          <div class="stat-card" onclick="App.navigate('maintenance')" style="cursor:pointer;">
            <div class="stat-value">${App.formatCurrency(totalServiceCost)}</div>
            <div class="stat-label">Total service cost</div>
          </div>
          <div class="stat-card" onclick="App.navigate('mods')" style="cursor:pointer;">
            <div class="stat-value">${App.formatCurrency(modsActualSpend)}</div>
            <div class="stat-label">Mods spend · ${modsInstalled}/${mods.length} installed</div>
          </div>
          <div class="stat-card" onclick="App.navigate('fuel')" style="cursor:pointer;">
            <div class="stat-value">${costPerMile ? '$' + costPerMile : '—'}</div>
            <div class="stat-label">Cost / mile · ${fuel.length} fill-ups</div>
          </div>
        </div>
      </div>

      <!-- Monthly Spend Chart + Budget -->
      <div style="margin-top: 14px; display:flex; flex-direction:column; gap:8px;">
        ${buildSpendChart(maintenance, fuel, mods)}
        ${buildBudgetSection(fuel, maintenance)}
      </div>

      <!-- Top Priority Mod -->
      ${topMod ? `
      <div style="padding: 0 16px; margin-top: 24px;">
        <div class="card-label" style="padding: 0 4px;">Next up — Mods</div>
        <div class="card" style="margin-top: 8px; cursor: pointer;" onclick="App.navigate('mods')">
          <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:10px;">
            <div style="flex:1; min-width:0;">
              <div style="font-size:15px; font-weight:500; margin-bottom:4px;">${topMod.name}</div>
              <div style="font-size:12px; color: var(--text-secondary);">${topMod.category} · Est. ${App.formatCurrency(topMod.estimatedCost)}</div>
            </div>
            ${App.priorityBadge(topMod.priority)}
          </div>
          ${topMod.notes ? `<div style="font-size:12px; color: var(--text-tertiary); margin-top: 10px; line-height: 1.5;">${topMod.notes}</div>` : ''}
        </div>
      </div>` : ''}

      <!-- Recent Service -->
      ${maintenance.length > 0 ? `
      <div style="padding: 0 16px; margin-top: 24px; margin-bottom: 8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 0 4px; margin-bottom: 8px;">
          <div class="card-label" style="margin-bottom:0;">Recent Service</div>
          <button onclick="App.navigate('maintenance')" style="font-size:12px; color: var(--text-tertiary); font-family: var(--font-ui);">View all →</button>
        </div>
        ${[...maintenance].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0, 3).map(m => `
          <div class="list-item" style="margin-bottom: 8px;" onclick="App.navigate('maintenance')">
            <div class="list-item-content">
              <div class="list-item-title">${m.type}</div>
              <div class="list-item-meta">${App.formatDate(m.date)} · ${App.formatMileage(m.mileage)}</div>
            </div>
            <div class="list-item-right">
              <span class="cost">${App.formatCurrency(m.cost)}</span>
            </div>
          </div>`).join('')}
      </div>` : ''}

      <!-- Export / Import Backup -->
      <div style="padding: 8px 16px 24px; display:flex; gap:8px;">
        <button onclick="App.exportData('all')" style="
          flex:1; padding:12px; border:1px solid var(--border); border-radius: var(--radius-md);
          font-size:13px; color: var(--text-tertiary); font-family: var(--font-ui);
          background: var(--bg-card); display:flex; align-items:center; justify-content:center; gap:6px;
        ">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:15px;height:15px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export backup
        </button>
        <button onclick="App.importData()" style="
          flex:1; padding:12px; border:1px solid var(--border); border-radius: var(--radius-md);
          font-size:13px; color: var(--text-tertiary); font-family: var(--font-ui);
          background: var(--bg-card); display:flex; align-items:center; justify-content:center; gap:6px;
        ">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:15px;height:15px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Import backup
        </button>
      </div>

    </div>
  </div>`;
};

function buildSpendChart(maintenance, fuel, mods) {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleDateString('en-US', { month: 'short' }),
      fuel: 0, service: 0, mods: 0
    });
  }
  const byKey = Object.fromEntries(months.map((m, i) => [m.key, i]));
  fuel.forEach(e => { const k = e.date?.slice(0, 7); if (k in byKey) months[byKey[k]].fuel += Number(e.totalPrice) || 0; });
  maintenance.forEach(e => { const k = e.date?.slice(0, 7); if (k in byKey) months[byKey[k]].service += Number(e.cost) || 0; });
  mods.filter(m => m.status === 'installed' && m.dateInstalled).forEach(m => { const k = m.dateInstalled?.slice(0, 7); if (k in byKey) months[byKey[k]].mods += Number(m.actualCost) || 0; });

  const hasData = months.some(m => m.fuel > 0 || m.service > 0 || m.mods > 0);
  if (!hasData) return '';

  const maxTotal = Math.max(...months.map(m => m.fuel + m.service + m.mods)) || 1;
  const W = 300, H = 88;
  const PAD = { top: 10, bottom: 18, left: 30, right: 8 };
  const iW = W - PAD.left - PAD.right;
  const iH = H - PAD.top - PAD.bottom;
  const barW = (iW / months.length) * 0.54;
  const barGap = iW / months.length;
  const xOf = i => PAD.left + i * barGap + (barGap - barW) / 2;
  const hOf = v => Math.max((v / maxTotal) * iH, v > 0 ? 2 : 0);

  const bars = months.map((m, i) => {
    const x = xOf(i); let y = PAD.top + iH; const segs = [];
    if (m.fuel > 0)    { const h = hOf(m.fuel);    y -= h; segs.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="var(--accent)" rx="2"/>`); }
    if (m.service > 0) { const h = hOf(m.service); y -= h; segs.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="var(--amber)" rx="2"/>`); }
    if (m.mods > 0)    { const h = hOf(m.mods);    y -= h; segs.push(`<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${h.toFixed(1)}" fill="var(--blue)" rx="2"/>`); }
    segs.push(`<text x="${(x + barW/2).toFixed(1)}" y="${PAD.top + iH + 12}" text-anchor="middle" font-size="8" fill="var(--text-tertiary)" font-family="var(--font-ui)">${m.label}</text>`);
    return segs.join('');
  }).join('');

  const fmtY = v => v >= 1000 ? `$${(v/1000).toFixed(1)}k` : `$${v.toFixed(0)}`;
  const gridLines = [0, 0.5, 1].map(t => {
    const y = PAD.top + t * iH;
    return `<line x1="${PAD.left}" y1="${y}" x2="${W - PAD.right}" y2="${y}" stroke="var(--border)" stroke-width="0.75" stroke-dasharray="3,3"/>
            <text x="${PAD.left - 3}" y="${y + 3.5}" text-anchor="end" font-size="7" fill="var(--text-tertiary)" font-family="var(--font-ui)">${fmtY(maxTotal * (1 - t))}</text>`;
  }).join('');

  return `
  <div style="padding: 0 16px 4px;">
    <div class="card" style="padding: 14px 14px 10px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
        <span style="font-size:12px; font-weight:500; color:var(--text-secondary);">Monthly Spend</span>
        <div style="display:flex; gap:10px; font-size:10px; color:var(--text-tertiary);">
          <span><span style="display:inline-block;width:7px;height:7px;background:var(--accent);border-radius:1px;margin-right:3px;vertical-align:middle;"></span>Fuel</span>
          <span><span style="display:inline-block;width:7px;height:7px;background:var(--amber);border-radius:1px;margin-right:3px;vertical-align:middle;"></span>Service</span>
          <span><span style="display:inline-block;width:7px;height:7px;background:var(--blue);border-radius:1px;margin-right:3px;vertical-align:middle;"></span>Mods</span>
        </div>
      </div>
      <svg viewBox="0 0 ${W} ${H}" style="width:100%; height:${H}px; display:block;">
        ${gridLines}
        ${bars}
      </svg>
    </div>
  </div>`;
}

function buildBudgetSection(fuel, maintenance) {
  const s = App.getSettings();
  const now = new Date();
  const curMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const monthName = now.toLocaleDateString('en-US', { month: 'long' });

  if (!s.monthlyFuelBudget && !s.monthlyServiceBudget) {
    return `
    <div style="padding: 0 16px 4px;">
      <button onclick="openBudgetEdit()" class="card" style="
        width:100%; padding: 13px 16px; display:flex; align-items:center; justify-content:space-between;
        text-align:left; cursor:pointer;
      ">
        <div>
          <div style="font-size:13px; font-weight:500; color:var(--text-primary); margin-bottom:2px;">Set a monthly budget</div>
          <div style="font-size:11px; color:var(--text-tertiary);">Track fuel & service spend vs. target</div>
        </div>
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" style="width:16px;height:16px;flex-shrink:0;"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>`;
  }

  const fuelThis    = fuel.filter(e => e.date?.slice(0, 7) === curMonth).reduce((s, e) => s + (Number(e.totalPrice) || 0), 0);
  const serviceThis = maintenance.filter(e => e.date?.slice(0, 7) === curMonth).reduce((s, e) => s + (Number(e.cost) || 0), 0);

  function bar(spent, budget, baseColor) {
    const pct = Math.min((spent / budget) * 100, 100);
    const col = pct >= 100 ? 'var(--accent)' : pct >= 80 ? 'var(--amber)' : baseColor;
    return `<div style="height:5px; background:var(--bg-subtle); border-radius:3px; overflow:hidden; margin-top:4px;">
      <div style="width:${pct.toFixed(1)}%; height:100%; background:${col}; border-radius:3px;"></div>
    </div>`;
  }

  const rows = [];
  if (s.monthlyFuelBudget) rows.push(`
    <div style="margin-bottom:10px;">
      <div style="display:flex; justify-content:space-between; font-size:12px;">
        <span style="color:var(--text-secondary);">Fuel</span>
        <span style="color:var(--text-primary);">${App.formatCurrency(fuelThis)} <span style="color:var(--text-tertiary);">/ ${App.formatCurrency(s.monthlyFuelBudget)}</span></span>
      </div>
      ${bar(fuelThis, s.monthlyFuelBudget, 'var(--accent)')}
    </div>`);
  if (s.monthlyServiceBudget) rows.push(`
    <div>
      <div style="display:flex; justify-content:space-between; font-size:12px;">
        <span style="color:var(--text-secondary);">Service</span>
        <span style="color:var(--text-primary);">${App.formatCurrency(serviceThis)} <span style="color:var(--text-tertiary);">/ ${App.formatCurrency(s.monthlyServiceBudget)}</span></span>
      </div>
      ${bar(serviceThis, s.monthlyServiceBudget, 'var(--amber)')}
    </div>`);

  return `
  <div style="padding: 0 16px 4px;">
    <div class="card" style="padding: 14px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span style="font-size:12px; font-weight:500; color:var(--text-secondary);">${monthName} Budget</span>
        <button onclick="openBudgetEdit()" style="font-size:11px; color:var(--text-tertiary); font-family:var(--font-ui);">Edit</button>
      </div>
      ${rows.join('')}
    </div>
  </div>`;
}

function openBudgetEdit() {
  const s = App.getSettings();
  App.openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">Monthly Budget</span>
      <button class="modal-close" onclick="App.closeModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Monthly Fuel Budget ($)</label>
        <input type="number" class="form-input" id="b-fuel" placeholder="e.g. 200" value="${s.monthlyFuelBudget || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Monthly Service Budget ($)</label>
        <input type="number" class="form-input" id="b-service" placeholder="e.g. 100" value="${s.monthlyServiceBudget || ''}">
      </div>
      <p style="font-size:12px; color:var(--text-tertiary); margin-bottom:16px; line-height:1.5;">Leave blank to hide a category. Resets tracked spending each calendar month automatically.</p>
      <button class="btn-primary" onclick="saveBudget()">Save Budget</button>
    </div>
  `);
}

function saveBudget() {
  const fuel    = document.getElementById('b-fuel').value;
  const service = document.getElementById('b-service').value;
  App.saveSettings({
    ...App.getSettings(),
    monthlyFuelBudget:    fuel    ? Number(fuel)    : null,
    monthlyServiceBudget: service ? Number(service) : null,
  });
  App.closeModal();
  App.toast('Budget saved ✓');
  App.navigate('dashboard');
}

function openVehicleEdit() {
  const v = App.getVehicle();
  App.openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">Vehicle Info</span>
      <button class="modal-close" onclick="App.closeModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Year</label>
          <input type="text" class="form-input" id="v-year" value="${v.year}">
        </div>
        <div class="form-group">
          <label class="form-label">Make</label>
          <input type="text" class="form-input" id="v-make" value="${v.make}">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Model</label>
        <input type="text" class="form-input" id="v-model" value="${v.model}">
      </div>
      <div class="form-group">
        <label class="form-label">Trim</label>
        <input type="text" class="form-input" id="v-trim" value="${v.trim}">
      </div>
      <div class="form-group">
        <label class="form-label">Engine</label>
        <input type="text" class="form-input" id="v-engine" value="${v.engine}">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">HP</label>
          <input type="text" class="form-input" id="v-hp" value="${v.hp}">
        </div>
        <div class="form-group">
          <label class="form-label">Torque (lb-ft)</label>
          <input type="text" class="form-input" id="v-torque" value="${v.torque}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Drivetrain</label>
          <input type="text" class="form-input" id="v-drivetrain" value="${v.drivetrain}">
        </div>
        <div class="form-group">
          <label class="form-label">Transmission</label>
          <input type="text" class="form-input" id="v-trans" value="${v.transmission}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Oil Spec</label>
          <input type="text" class="form-input" id="v-oil" value="${v.oilSpec}">
        </div>
        <div class="form-group">
          <label class="form-label">Oil Capacity</label>
          <input type="text" class="form-input" id="v-oilcap" value="${v.oilCapacity}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Tire Pressure</label>
          <input type="text" class="form-input" id="v-tirepsi" value="${v.tirePressure}">
        </div>
        <div class="form-group">
          <label class="form-label">Fuel Type</label>
          <input type="text" class="form-input" id="v-fuel" value="${v.fuelType}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Wiper — Driver</label>
          <input type="text" class="form-input" id="v-wiperd" value="${v.tiresDriver}">
        </div>
        <div class="form-group">
          <label class="form-label">Wiper — Passenger</label>
          <input type="text" class="form-input" id="v-wiperp" value="${v.tiresPassenger}">
        </div>
      </div>
      <button class="btn-primary" onclick="saveVehicleInfo()">Save Changes</button>
    </div>
  `);
}

function saveVehicleInfo() {
  App.saveVehicle({
    year:         document.getElementById('v-year').value.trim(),
    make:         document.getElementById('v-make').value.trim(),
    model:        document.getElementById('v-model').value.trim(),
    trim:         document.getElementById('v-trim').value.trim(),
    engine:       document.getElementById('v-engine').value.trim(),
    hp:           document.getElementById('v-hp').value.trim(),
    torque:       document.getElementById('v-torque').value.trim(),
    drivetrain:   document.getElementById('v-drivetrain').value.trim(),
    transmission: document.getElementById('v-trans').value.trim(),
    oilSpec:      document.getElementById('v-oil').value.trim(),
    oilCapacity:  document.getElementById('v-oilcap').value.trim(),
    tirePressure: document.getElementById('v-tirepsi').value.trim(),
    fuelType:     document.getElementById('v-fuel').value.trim(),
    tiresDriver:  document.getElementById('v-wiperd').value.trim(),
    tiresPassenger: document.getElementById('v-wiperp').value.trim(),
  });
  App.closeModal();
  App.toast('Vehicle info saved');
  App.navigate('dashboard');
}

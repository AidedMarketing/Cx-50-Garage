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

  // Next maintenance alert — show soonest upcoming
  const now = new Date();
  const upcoming = maintenance
    .filter(m => m.nextDueDate)
    .sort((a, b) => new Date(a.nextDueDate) - new Date(b.nextDueDate))[0];
  const isOverdue = upcoming && new Date(upcoming.nextDueDate) < now;

  const upcomingAlert = upcoming ? `
    <div class="alert-banner ${isOverdue ? 'alert-red' : 'alert-amber'}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
      <span>${isOverdue ? '<strong>Overdue:</strong>' : '<strong>Due:</strong>'} ${upcoming.type} — ${App.formatDate(upcoming.nextDueDate)}${upcoming.nextMileage ? ` · ${App.formatMileage(upcoming.nextMileage)}` : ''}</span>
    </div>` : `
    <div class="alert-banner alert-green">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      <span>No upcoming maintenance scheduled</span>
    </div>`;

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
      <div style="margin-top: 12px;">${upcomingAlert}</div>

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
            <div class="stat-value">${fuel.length}</div>
            <div class="stat-label">Fill-ups logged</div>
          </div>
        </div>
      </div>

      <!-- Top Priority Mod -->
      ${topMod ? `
      <div style="padding: 0 16px; margin-top: 20px;">
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
      <div style="padding: 0 16px; margin-top: 20px; margin-bottom: 8px;">
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

      <!-- Export Backup -->
      <div style="padding: 8px 16px 24px;">
        <button onclick="App.exportData('all')" style="
          width:100%; padding:12px; border:1px solid var(--border); border-radius: var(--radius-md);
          font-size:13px; color: var(--text-tertiary); font-family: var(--font-ui);
          background: var(--bg-card); display:flex; align-items:center; justify-content:center; gap:8px;
        ">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:15px;height:15px;"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export full backup (JSON)
        </button>
      </div>

    </div>
  </div>`;
};

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

/* ─── CX-50 Garage — App Core ──────────────────────────────── */

const App = (() => {

  // ── Utilities first — uid() needed by DEFAULT_MODS ──────────
  function uid() {
    return Math.random().toString(36).slice(2, 9);
  }

  function toast(msg, duration = 1800) {
    const existing = document.getElementById('cx50-toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.id = 'cx50-toast';
    el.textContent = msg;
    el.style.cssText = `
      position:fixed; bottom:calc(var(--nav-height) + env(safe-area-inset-bottom,0px) + 16px); left:50%;
      transform:translateX(-50%) translateY(8px); background:#1A1A1A; color:#fff;
      padding:10px 18px; border-radius:20px; font-size:13px; font-weight:500;
      z-index:9999; opacity:0; transition:opacity 0.18s, transform 0.18s;
      white-space:nowrap; pointer-events:none; box-shadow: 0 4px 16px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(8px)';
      setTimeout(() => el.remove(), 200);
    }, duration);
  }

  // ── State ────────────────────────────────────────────────────
  const KEYS = {
    maintenance: 'cx50_maintenance',
    mods:        'cx50_mods',
    fuel:        'cx50_fuel',
    vehicle:     'cx50_vehicle',
  };

  const DEFAULT_VEHICLE = {
    year: '2023',
    make: 'Mazda',
    model: 'CX-50',
    trim: 'Turbo — Meridian Edition',
    engine: '2.5L SkyActiv-G Turbo',
    hp: '256',
    torque: '320',
    drivetrain: 'AWD',
    transmission: '6-Speed Automatic',
    tiresDriver: '26"',
    tiresPassenger: '16"',
    oilSpec: '0W-20 Full Synthetic',
    oilCapacity: '4.8 qt',
    tirePressure: '35 PSI',
    fuelType: 'Premium (91+ octane)',
  };

  // uid() is defined above so these IDs generate correctly
  const DEFAULT_MODS = [
    { id: uid(), name: 'Cold Air Intake (CAI)', status: 'to-do', priority: 'high', category: 'Sound / Performance', estimatedCost: 225, actualCost: null, brand: 'CorkSport', installType: 'DIY', notes: 'Unlocks turbo whoosh. Heat shield optional. Use dry-flow filter only. Miami heat: install heat shield for summer.', dateInstalled: null },
    { id: uid(), name: 'Paint Protection Film (PPF)', status: 'to-do', priority: 'high', category: 'Protection', estimatedCost: 1200, actualCost: null, brand: 'XPEL or LLumar', installType: 'Shop', notes: 'Full front or partial (hood, fenders, mirrors). Miami road debris and bugs make this essential.', dateInstalled: null },
    { id: uid(), name: 'Ceramic Window Tint', status: 'to-do', priority: 'high', category: 'Protection', estimatedCost: 450, actualCost: null, brand: 'Llumar CTX or 3M Crystalline', installType: 'Shop', notes: 'Miami heat requires ceramic (not dyed). Max legal tint varies by window. Front 28% limit in FL.', dateInstalled: null },
    { id: uid(), name: 'Dashcam (Front + Rear)', status: 'to-do', priority: 'high', category: 'Comfort & Tech', estimatedCost: 300, actualCost: null, brand: 'Vantrue, BlackVue, or Thinkware', installType: 'Shop', notes: 'Hardwire kit enables parking mode. Rear cam covers tailgate hits. Consider capacitor-based for Miami heat.', dateInstalled: null },
    { id: uid(), name: 'All-Weather Floor Mats', status: 'to-do', priority: 'high', category: 'Protection', estimatedCost: 150, actualCost: null, brand: 'OEM Mazda or WeatherTech', installType: 'DIY', notes: 'Miami rain, sand, daily wear. Significant resale value protection.', dateInstalled: null },
    { id: uid(), name: 'Wireless CarPlay Adapter', status: 'to-do', priority: 'medium', category: 'Comfort & Tech', estimatedCost: 80, actualCost: null, brand: 'Carlinkit or AAWireless', installType: 'DIY', notes: 'Stock CX-50 is wired CarPlay only. Plug-and-play, takes minutes.', dateInstalled: null },
    { id: uid(), name: 'Mud Flaps / Splash Guards', status: 'researching', priority: 'medium', category: 'Protection', estimatedCost: 100, actualCost: null, brand: 'OEM Mazda or aftermarket', installType: 'DIY', notes: 'Protects rocker panels from debris, especially in Miami rain.', dateInstalled: null },
    { id: uid(), name: 'Axle-Back Exhaust Upgrade', status: 'researching', priority: 'medium', category: 'Sound / Performance', estimatedCost: 600, actualCost: null, brand: 'CorkSport, Borla, or MagnaFlow', installType: 'Shop', notes: 'Deeper exhaust note. No tune needed for axle-back. Pairs well with CAI.', dateInstalled: null },
  ];

  // ── Storage ──────────────────────────────────────────────────
  const store = {
    get(key) {
      try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
    },
    set(key, val) {
      localStorage.setItem(key, JSON.stringify(val));
    },
  };

  function getMaintenance() { return store.get(KEYS.maintenance) || []; }
  function getMods()        { return store.get(KEYS.mods)        || DEFAULT_MODS; }
  function getFuel()        { return store.get(KEYS.fuel)        || []; }
  function getVehicle()     { return { ...DEFAULT_VEHICLE, ...(store.get(KEYS.vehicle) || {}) }; }

  function saveMaintenance(data) { store.set(KEYS.maintenance, data); }
  function saveMods(data)        { store.set(KEYS.mods, data); }
  function saveFuel(data)        { store.set(KEYS.fuel, data); }
  function saveVehicle(data)     { store.set(KEYS.vehicle, data); }

  // Seed mods on first run
  function seedIfNeeded() {
    if (!store.get(KEYS.mods)) store.set(KEYS.mods, DEFAULT_MODS);
  }

  // ── Export ───────────────────────────────────────────────────
  function exportData(type) {
    const dataMap = {
      maintenance: { data: getMaintenance(), filename: 'cx50-service-log.json' },
      mods:        { data: getMods(),        filename: 'cx50-mods-tracker.json' },
      fuel:        { data: getFuel(),        filename: 'cx50-fuel-log.json'     },
      all: {
        data: { maintenance: getMaintenance(), mods: getMods(), fuel: getFuel(), vehicle: getVehicle(), exportedAt: new Date().toISOString() },
        filename: 'cx50-garage-backup.json',
      },
    };
    const { data, filename } = dataMap[type] || dataMap.all;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast('Exported ' + filename);
  }

  // ── Router ───────────────────────────────────────────────────
  let currentView = 'dashboard';

  function navigate(view) {
    currentView = view;
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === view);
    });
    const container = document.getElementById('view-container');
    switch (view) {
      case 'dashboard':   container.innerHTML = Views.dashboard();   break;
      case 'maintenance': container.innerHTML = Views.maintenance(); break;
      case 'mods':        container.innerHTML = Views.mods();        break;
      case 'fuel':        container.innerHTML = Views.fuel();        break;
      case 'reference':   container.innerHTML = Views.reference();   break;
    }
    container.scrollTop = 0;
    // Run each view's post-render setup
    if (window._postRenderHooks && window._postRenderHooks[view]) {
      window._postRenderHooks[view]();
    }
  }

  function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr + 'T12:00:00');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function formatCurrency(n) {
    if (n == null || n === '') return '—';
    return '$' + Number(n).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  function formatMileage(n) {
    if (!n) return '—';
    return Number(n).toLocaleString('en-US') + ' mi';
  }

  function statusBadge(status) {
    const map = {
      'installed':    ['badge-green',  'Installed'],
      'to-do':        ['badge-blue',   'To Do'],
      'researching':  ['badge-gray',   'Researching'],
      'ready-to-buy': ['badge-amber',  'Ready to Buy'],
      'skipped':      ['badge-gray',   'Skipped'],
    };
    const [cls, label] = map[status] || ['badge-gray', status];
    return `<span class="badge ${cls}">${label}</span>`;
  }

  function priorityBadge(priority) {
    const map = {
      'high':   ['badge-red',   '↑ High'],
      'medium': ['badge-amber', '→ Med'],
      'low':    ['badge-gray',  '↓ Low'],
    };
    const [cls, label] = map[priority] || ['badge-gray', priority];
    return `<span class="badge ${cls}">${label}</span>`;
  }

  // ── Modal helpers ────────────────────────────────────────────
  function openModal(html) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modal-overlay';
    overlay.innerHTML = `<div class="modal">${html}</div>`;
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });
    document.body.appendChild(overlay);
  }

  function closeModal() {
    const el = document.getElementById('modal-overlay');
    if (el) el.remove();
  }

  function confirm(message, onConfirm) {
    openModal(`
      <div class="modal-handle"></div>
      <div class="modal-header">
        <span class="modal-title">Confirm</span>
      </div>
      <div class="modal-body">
        <p style="font-size:15px; color:var(--text-secondary); line-height:1.5; margin-bottom:20px;">${message}</p>
        <button class="btn-destructive" style="margin-top:0;" onclick="(function(){ App.closeModal(); (${onConfirm.toString()})(); })()">Delete</button>
        <button onclick="App.closeModal()" style="
          width:100%; padding:14px; border:1px solid var(--border); border-radius:var(--radius-md);
          font-size:15px; font-weight:500; color:var(--text-secondary); font-family:var(--font-ui);
          background:var(--bg-card); margin-top:8px;
        ">Cancel</button>
      </div>
    `);
  }

  // ── Init ─────────────────────────────────────────────────────
  function init() {
    window._postRenderHooks = {};
    seedIfNeeded();
    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.view));
    });
    navigate('dashboard');
  }

  // ── Public API ───────────────────────────────────────────────
  return {
    init, navigate, uid, toast, exportData,
    formatDate, formatCurrency, formatMileage,
    statusBadge, priorityBadge,
    openModal, closeModal, confirm,
    getMaintenance, saveMaintenance,
    getMods, saveMods,
    getFuel, saveFuel,
    getVehicle, saveVehicle,
  };
})();

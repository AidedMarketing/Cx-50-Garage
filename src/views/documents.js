/* ─── View: Documents Vault ────────────────────────────────── */

window.Views = window.Views || {};

Views.documents = function () {
  const docs = App.getDocuments();
  const v = App.getVehicle();

  // Warranty countdown
  function warrantyStatus(startDate, years, miles, currentMiles) {
    if (!startDate) return { text: 'Set purchase date to track', cls: 'badge-gray' };
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(start);
    end.setFullYear(end.getFullYear() + years);
    const now = new Date();
    const daysLeft = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    const milesLeft = currentMiles ? miles - currentMiles : null;

    if (daysLeft <= 0 || (milesLeft !== null && milesLeft <= 0)) {
      return { text: 'Expired', cls: 'badge-red' };
    }
    const timeStr = daysLeft > 365 ? Math.floor(daysLeft / 365) + 'y ' + Math.floor((daysLeft % 365) / 30) + 'mo' : daysLeft + ' days';
    const mileStr = milesLeft !== null ? ' · ' + milesLeft.toLocaleString() + ' mi' : '';
    return { text: timeStr + mileStr + ' left', cls: daysLeft < 180 ? 'badge-amber' : 'badge-green' };
  }

  // Current odometer from fuel or maintenance
  const fuel = App.getFuel();
  const maint = App.getMaintenance();
  const latestFuel = [...fuel].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const latestMaint = [...maint].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  const currentOdo = latestFuel?.odometer ? Number(latestFuel.odometer)
    : (latestMaint?.mileage ? Number(latestMaint.mileage) : null);

  const purchaseDate = docs.purchaseDate || '';
  const purchaseMileage = docs.purchaseMileage ? Number(docs.purchaseMileage) : 0;
  const milesSincePurchase = currentOdo ? currentOdo - purchaseMileage : null;

  const b2b = warrantyStatus(purchaseDate, 3, 36000, milesSincePurchase);
  const pwt = warrantyStatus(purchaseDate, 5, 60000, milesSincePurchase);
  const corr = warrantyStatus(purchaseDate, 5, null, null);

  // Registration & insurance expiry
  function expiryBadge(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    const now = new Date();
    const days = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
    if (days < 0) return `<span class="badge badge-red">Expired</span>`;
    if (days <= 30) return `<span class="badge badge-amber">${days}d left</span>`;
    if (days <= 90) return `<span class="badge badge-amber">${Math.ceil(days/30)}mo left</span>`;
    return `<span class="badge badge-green">${Math.ceil(days/30)}mo left</span>`;
  }

  return `
  <div class="view" id="view-documents">
    <div class="page-header">
      <h1>My CX-50</h1>
      <div class="subtitle">Documents, warranty & vehicle info</div>
    </div>

    <div style="padding: 12px 16px 0;">

      <!-- VIN & Purchase -->
      <div class="card" style="margin-bottom: 10px; cursor:pointer;" onclick="openDocsEdit()">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:12px; font-weight:500; color:var(--text-secondary);">Vehicle Identity</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" style="width:14px;height:14px;"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">VIN</span>
          <span class="ref-item-value" style="font-family:monospace; font-size:12px; letter-spacing:0.04em;">${docs.vin || '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">License Plate</span>
          <span class="ref-item-value">${docs.licensePlate || '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Color</span>
          <span class="ref-item-value">${docs.color || '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Purchase Date</span>
          <span class="ref-item-value">${purchaseDate ? App.formatDate(purchaseDate) : '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Purchase Mileage</span>
          <span class="ref-item-value">${docs.purchaseMileage ? App.formatMileage(docs.purchaseMileage) : '—'}</span>
        </div>
      </div>

      <!-- Warranty Tracker -->
      <div class="card" style="margin-bottom: 10px;">
        <div style="font-size:12px; font-weight:500; color:var(--text-secondary); margin-bottom:10px;">Warranty Tracker</div>
        <div class="ref-item" style="border:none; padding:6px 0;">
          <span class="ref-item-label">Bumper-to-Bumper</span>
          <span class="badge ${b2b.cls}" style="font-size:10px;">${b2b.text}</span>
        </div>
        <div class="ref-item" style="border:none; padding:6px 0;">
          <span class="ref-item-label">Powertrain</span>
          <span class="badge ${pwt.cls}" style="font-size:10px;">${pwt.text}</span>
        </div>
        <div class="ref-item" style="border:none; padding:6px 0;">
          <span class="ref-item-label">Corrosion</span>
          <span class="badge ${corr.cls}" style="font-size:10px;">${corr.text}</span>
        </div>
        ${!purchaseDate ? `<div style="font-size:11px; color:var(--text-tertiary); margin-top:6px;">Tap "Vehicle Identity" above to set your purchase date and enable warranty countdown.</div>` : ''}
      </div>

      <!-- Insurance -->
      <div class="card" style="margin-bottom: 10px; cursor:pointer;" onclick="openInsuranceEdit()">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:12px; font-weight:500; color:var(--text-secondary);">Insurance</span>
          <div style="display:flex; align-items:center; gap:6px;">
            ${expiryBadge(docs.insuranceExpiry)}
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" style="width:14px;height:14px;"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Provider</span>
          <span class="ref-item-value">${docs.insuranceProvider || '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Policy #</span>
          <span class="ref-item-value" style="font-family:monospace; font-size:12px;">${docs.insurancePolicyNum || '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Expiration</span>
          <span class="ref-item-value">${docs.insuranceExpiry ? App.formatDate(docs.insuranceExpiry) : '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Claims Phone</span>
          <span class="ref-item-value">${docs.insurancePhone || '—'}</span>
        </div>
      </div>

      <!-- Registration -->
      <div class="card" style="margin-bottom: 10px; cursor:pointer;" onclick="openRegistrationEdit()">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:12px; font-weight:500; color:var(--text-secondary);">Registration</span>
          <div style="display:flex; align-items:center; gap:6px;">
            ${expiryBadge(docs.registrationExpiry)}
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" style="width:14px;height:14px;"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </div>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">State</span>
          <span class="ref-item-value">${docs.registrationState || '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Expiration</span>
          <span class="ref-item-value">${docs.registrationExpiry ? App.formatDate(docs.registrationExpiry) : '—'}</span>
        </div>
      </div>

      <!-- Emergency Contacts -->
      <div class="card" style="margin-bottom: 10px; cursor:pointer;" onclick="openEmergencyEdit()">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:12px; font-weight:500; color:var(--text-secondary);">Emergency Contacts</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" stroke-width="1.5" style="width:14px;height:14px;"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Mazda Roadside</span>
          <span class="ref-item-value" style="color:var(--accent); font-weight:500;">1-800-866-1998</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Preferred Dealer</span>
          <span class="ref-item-value">${docs.preferredDealer || '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Preferred Mechanic</span>
          <span class="ref-item-value">${docs.preferredMechanic || '—'}</span>
        </div>
        <div class="ref-item" style="border:none; padding:4px 0;">
          <span class="ref-item-label">Emergency Contact</span>
          <span class="ref-item-value">${docs.emergencyContact || '—'}</span>
        </div>
      </div>

    </div>
  </div>`;
};

// ── Form Modals ──────────────────────────────────────────────

function openDocsEdit() {
  const d = App.getDocuments();
  App.openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">Vehicle Identity</span>
      <button class="modal-close" onclick="App.closeModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">VIN</label>
        <input type="text" class="form-input" id="d-vin" maxlength="17" placeholder="17-character VIN" value="${d.vin || ''}" style="font-family:monospace; letter-spacing:0.08em;">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">License Plate</label>
          <input type="text" class="form-input" id="d-plate" placeholder="e.g. ABC 1234" value="${d.licensePlate || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Color</label>
          <input type="text" class="form-input" id="d-color" placeholder="e.g. Zircon Sand" value="${d.color || ''}">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Purchase Date</label>
          <input type="date" class="form-input" id="d-purchase-date" value="${d.purchaseDate || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Purchase Mileage</label>
          <input type="number" class="form-input" id="d-purchase-mi" placeholder="e.g. 12" value="${d.purchaseMileage || ''}">
        </div>
      </div>
      <p style="font-size:11px; color:var(--text-tertiary); margin-bottom:16px; line-height:1.4;">Purchase date enables warranty countdown tracking. VIN is used for NHTSA recall lookups.</p>
      <button class="btn-primary" onclick="saveDocsInfo()">Save</button>
    </div>
  `);
}

function saveDocsInfo() {
  const docs = App.getDocuments();
  docs.vin = document.getElementById('d-vin').value.trim().toUpperCase();
  docs.licensePlate = document.getElementById('d-plate').value.trim().toUpperCase();
  docs.color = document.getElementById('d-color').value.trim();
  docs.purchaseDate = document.getElementById('d-purchase-date').value;
  docs.purchaseMileage = document.getElementById('d-purchase-mi').value;
  App.saveDocuments(docs);
  App.closeModal();
  App.toast('Vehicle info saved');
  App.navigate('documents');
}

function openInsuranceEdit() {
  const d = App.getDocuments();
  App.openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">Insurance</span>
      <button class="modal-close" onclick="App.closeModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Insurance Provider</label>
        <input type="text" class="form-input" id="d-ins-provider" placeholder="e.g. GEICO, State Farm" value="${d.insuranceProvider || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Policy Number</label>
        <input type="text" class="form-input" id="d-ins-policy" placeholder="Policy #" value="${d.insurancePolicyNum || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Expiration Date</label>
        <input type="date" class="form-input" id="d-ins-expiry" value="${d.insuranceExpiry || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Claims Phone</label>
        <input type="tel" class="form-input" id="d-ins-phone" placeholder="e.g. 1-800-555-1234" value="${d.insurancePhone || ''}">
      </div>
      <button class="btn-primary" onclick="saveInsurance()">Save</button>
    </div>
  `);
}

function saveInsurance() {
  const docs = App.getDocuments();
  docs.insuranceProvider = document.getElementById('d-ins-provider').value.trim();
  docs.insurancePolicyNum = document.getElementById('d-ins-policy').value.trim();
  docs.insuranceExpiry = document.getElementById('d-ins-expiry').value;
  docs.insurancePhone = document.getElementById('d-ins-phone').value.trim();
  App.saveDocuments(docs);
  App.closeModal();
  App.toast('Insurance saved');
  App.navigate('documents');
}

function openRegistrationEdit() {
  const d = App.getDocuments();
  App.openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">Registration</span>
      <button class="modal-close" onclick="App.closeModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">State</label>
          <input type="text" class="form-input" id="d-reg-state" placeholder="e.g. FL" value="${d.registrationState || ''}">
        </div>
        <div class="form-group">
          <label class="form-label">Expiration Date</label>
          <input type="date" class="form-input" id="d-reg-expiry" value="${d.registrationExpiry || ''}">
        </div>
      </div>
      <button class="btn-primary" onclick="saveRegistration()">Save</button>
    </div>
  `);
}

function saveRegistration() {
  const docs = App.getDocuments();
  docs.registrationState = document.getElementById('d-reg-state').value.trim().toUpperCase();
  docs.registrationExpiry = document.getElementById('d-reg-expiry').value;
  App.saveDocuments(docs);
  App.closeModal();
  App.toast('Registration saved');
  App.navigate('documents');
}

function openEmergencyEdit() {
  const d = App.getDocuments();
  App.openModal(`
    <div class="modal-handle"></div>
    <div class="modal-header">
      <span class="modal-title">Emergency Contacts</span>
      <button class="modal-close" onclick="App.closeModal()">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="modal-body">
      <div class="form-group">
        <label class="form-label">Preferred Dealer</label>
        <input type="text" class="form-input" id="d-dealer" placeholder="e.g. Ocean Mazda Doral" value="${d.preferredDealer || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Preferred Mechanic</label>
        <input type="text" class="form-input" id="d-mechanic" placeholder="Shop name or phone" value="${d.preferredMechanic || ''}">
      </div>
      <div class="form-group">
        <label class="form-label">Emergency Contact</label>
        <input type="text" class="form-input" id="d-emergency" placeholder="Name & phone" value="${d.emergencyContact || ''}">
      </div>
      <button class="btn-primary" onclick="saveEmergency()">Save</button>
    </div>
  `);
}

function saveEmergency() {
  const docs = App.getDocuments();
  docs.preferredDealer = document.getElementById('d-dealer').value.trim();
  docs.preferredMechanic = document.getElementById('d-mechanic').value.trim();
  docs.emergencyContact = document.getElementById('d-emergency').value.trim();
  App.saveDocuments(docs);
  App.closeModal();
  App.toast('Contacts saved');
  App.navigate('documents');
}

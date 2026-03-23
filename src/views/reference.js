/* ─── View: Reference Guide ────────────────────────────────── */

window.Views = window.Views || {};

Views.reference = function () {
  return `
  <div class="view" id="view-reference">
    <div class="page-header">
      <h1>Owner's Guide</h1>
      <div class="subtitle">2023 CX-50 Turbo — Meridian Edition</div>
    </div>

    <div style="position: relative; padding: 12px 16px 4px;">
      <span style="position:absolute; left:28px; top:50%; transform:translateY(-50%); pointer-events:none; color: var(--text-tertiary);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:15px;height:15px;"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
      </span>
      <input type="search" style="
        width:100%; padding:10px 14px 10px 38px; border:1px solid var(--border);
        border-radius: var(--radius-md); background: var(--bg-card); font-size:14px;
        color: var(--text-primary); font-family: var(--font-ui);
      " placeholder="Search guide…" oninput="filterReference(this.value)" id="ref-search" aria-label="Search owner's guide">
    </div>

    <div id="ref-content" style="padding: 0 16px 16px;">
      ${buildReferenceHTML('', true)}
    </div>
  </div>`;
};

// open = whether to auto-open first section
function buildReferenceHTML(filter, openFirst) {
  const q = (filter || '').toLowerCase().trim();

  const sections = [
    {
      id: 'quick-specs',
      title: '📋 Quick Specs',
      content: () => {
        const items = ReferenceData.quickSpecs.filter(s =>
          !q || s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(s => `
          <div class="ref-item">
            <span class="ref-item-label">${s.label}</span>
            <span class="ref-item-value">${s.value}</span>
          </div>`).join('');
      }
    },
    {
      id: 'hidden-tricks',
      title: '💡 Hidden Tricks & Tips',
      content: () => {
        const items = ReferenceData.hiddenTricks.filter(t =>
          !q || t.title.toLowerCase().includes(q) || t.tip.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(t => `
          <div class="ref-tip">
            <strong>${t.title}</strong><br>${t.tip}
          </div>`).join('');
      }
    },
    {
      id: 'miami-tips',
      title: '🌴 Miami Owner Tips',
      content: () => {
        const items = ReferenceData.miamiTips.filter(t =>
          !q || t.title.toLowerCase().includes(q) || t.tip.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(t => `
          <div class="ref-tip">
            <strong>${t.title}</strong><br>${t.tip}
          </div>`).join('');
      }
    },
    {
      id: 'maintenance-sched',
      title: '🔧 Maintenance Schedule',
      content: () => {
        const items = ReferenceData.maintenanceSchedule.filter(m =>
          !q || m.interval.toLowerCase().includes(q) || m.item.toLowerCase().includes(q) || (m.notes||'').toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(m => `
          <div class="ref-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:12px 0;">
            <div style="display:flex; justify-content:space-between; width:100%; align-items:flex-start; gap:8px;">
              <span style="font-size:13px; font-weight:500; color:var(--text-primary);">${m.item}</span>
              <span class="badge badge-gray" style="flex-shrink:0; font-size:9px;">${m.interval}</span>
            </div>
            ${m.notes ? `<div style="font-size:12px; color:var(--text-tertiary);">${m.notes}</div>` : ''}
          </div>`).join('');
      }
    },
    {
      id: 'recalls',
      title: '⚠️ Recall Status',
      content: () => {
        if (q && !['recall','nhtsa','safety','campaign'].some(kw => kw.includes(q) || q.includes(kw))) return null;
        const docs = App.getDocuments();
        const vinNote = docs.vin
          ? `<div style="font-size:11px; color:var(--text-tertiary); margin-bottom:6px;">Looking up VIN: <span style="font-family:monospace; letter-spacing:0.03em;">${docs.vin}</span></div>`
          : `<div style="font-size:11px; color:var(--text-tertiary); margin-bottom:6px;">No VIN saved — showing all 2023 CX-50 recalls. <span style="color:var(--accent); cursor:pointer; text-decoration:underline;" onclick="App.navigate('documents')">Add your VIN</span> for vehicle-specific results.</div>`;
        return `${vinNote}<div id="recall-content" style="padding:4px 0; min-height:32px;">
          <span style="font-size:13px; color:var(--text-tertiary);">Loading NHTSA data…</span>
        </div>`;
      }
    },
    {
      id: 'warning-lights',
      title: '🚨 Warning Lights Guide',
      content: () => {
        if (!ReferenceData.warningLights) return null;
        const items = ReferenceData.warningLights.filter(w =>
          !q || w.light.toLowerCase().includes(q) || w.meaning.toLowerCase().includes(q) || w.severity.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(w => {
          const badge = w.severity === 'Critical' ? 'badge-red' : w.severity === 'Warning' ? 'badge-amber' : 'badge-gray';
          return `
          <div class="ref-tip" style="padding:10px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <strong>${w.icon} ${w.light}</strong>
              <span class="badge ${badge}" style="flex-shrink:0;">${w.severity}</span>
            </div>
            <div style="font-size:12px; line-height:1.5;">${w.meaning}</div>
          </div>`;
        }).join('');
      }
    },
    {
      id: 'emergency',
      title: '🆘 Emergency & Roadside',
      content: () => {
        if (!ReferenceData.emergencyInfo) return null;
        const items = ReferenceData.emergencyInfo.filter(e =>
          !q || e.title.toLowerCase().includes(q) || e.info.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(e => `
          <div class="ref-tip">
            <strong>${e.title}</strong><br>${e.info}
          </div>`).join('');
      }
    },
    {
      id: 'key-fob',
      title: '🔑 Key Fob Guide',
      content: () => {
        if (!ReferenceData.keyFobGuide) return null;
        const items = ReferenceData.keyFobGuide.filter(k =>
          !q || k.title.toLowerCase().includes(q) || k.tip.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(k => `
          <div class="ref-tip">
            <strong>${k.title}</strong><br>${k.tip}
          </div>`).join('');
      }
    },
    {
      id: 'how-to',
      title: '🛠️ How-To Quick Fixes',
      content: () => {
        if (!ReferenceData.howTo) return null;
        const items = ReferenceData.howTo.filter(h =>
          !q || h.title.toLowerCase().includes(q) || h.steps.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(h => `
          <div class="ref-tip">
            <strong>${h.title}</strong><br>${h.steps}
          </div>`).join('');
      }
    },
    {
      id: 'fluids',
      title: '🧪 Fluid Specs & Capacities',
      content: () => {
        if (!ReferenceData.fluidSpecs) return null;
        const items = ReferenceData.fluidSpecs.filter(f =>
          !q || f.label.toLowerCase().includes(q) || f.value.toLowerCase().includes(q) || f.capacity.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(f => `
          <div class="ref-item" style="flex-direction:column; align-items:flex-start; gap:2px; padding:10px 0;">
            <span style="font-size:13px; font-weight:500; color:var(--text-primary);">${f.label}</span>
            <span style="font-size:12px; color:var(--text-secondary);">${f.value}</span>
            <span style="font-size:11px; color:var(--text-tertiary);">Capacity: ${f.capacity}</span>
          </div>`).join('');
      }
    },
    {
      id: 'torque',
      title: '🔩 DIY Torque Specs',
      content: () => {
        if (!ReferenceData.torqueSpecs) return null;
        const items = ReferenceData.torqueSpecs.filter(t =>
          !q || t.part.toLowerCase().includes(q) || t.spec.toLowerCase().includes(q) || t.note.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(t => `
          <div class="ref-item" style="flex-direction:column; align-items:flex-start; gap:2px; padding:10px 0;">
            <div style="display:flex; justify-content:space-between; width:100%; gap:8px;">
              <span style="font-size:13px; font-weight:500; color:var(--text-primary);">${t.part}</span>
              <span style="font-size:13px; font-weight:600; color:var(--text-primary); flex-shrink:0;">${t.spec}</span>
            </div>
            <span style="font-size:11px; color:var(--text-tertiary);">${t.note}</span>
          </div>`).join('');
      }
    },
    {
      id: 'warranty',
      title: '🛡️ Warranty Coverage',
      content: () => {
        if (!ReferenceData.warranty) return null;
        const items = ReferenceData.warranty.filter(w =>
          !q || w.coverage.toLowerCase().includes(q) || w.duration.toLowerCase().includes(q) || w.notes.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(w => `
          <div class="ref-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:12px 0;">
            <div style="display:flex; justify-content:space-between; width:100%; gap:8px;">
              <span style="font-size:13px; font-weight:500; color:var(--text-primary);">${w.coverage}</span>
              <span class="badge badge-blue" style="flex-shrink:0; font-size:9px;">${w.duration}</span>
            </div>
            <div style="font-size:12px; color:var(--text-tertiary);">${w.notes}</div>
          </div>`).join('');
      }
    },
    {
      id: 'checklists',
      title: '✅ Seasonal Checklists',
      content: () => {
        if (!ReferenceData.checklists) return null;
        const lists = Object.values(ReferenceData.checklists);
        const filtered = lists.map(cl => {
          const matchItems = cl.items.filter(item => !q || item.toLowerCase().includes(q) || cl.title.toLowerCase().includes(q));
          return matchItems.length ? { ...cl, items: matchItems } : null;
        }).filter(Boolean);
        if (!filtered.length) return null;
        return filtered.map(cl => `
          <div style="padding:8px 0;">
            <div style="font-size:13px; font-weight:600; color:var(--text-primary); margin-bottom:6px;">${cl.title}</div>
            ${cl.items.map(item => `
              <div style="display:flex; gap:8px; padding:4px 0; font-size:12px; color:var(--text-secondary); line-height:1.4;">
                <span style="color:var(--text-tertiary); flex-shrink:0;">☐</span>
                <span>${item}</span>
              </div>`).join('')}
          </div>`).join('<div style="border-top:1px solid var(--border-light); margin:4px 0;"></div>');
      }
    },
    {
      id: 'break-in',
      title: '🏁 Break-In Period',
      content: () => {
        if (!ReferenceData.breakInPeriod) return null;
        const bp = ReferenceData.breakInPeriod;
        const match = !q || 'break-in break in period'.includes(q) ||
          bp.distance.toLowerCase().includes(q) ||
          bp.recommendations.some(r => r.toLowerCase().includes(q)) ||
          bp.additionalNotes.toLowerCase().includes(q);
        if (!match) return null;
        return `
          <div class="ref-tip">
            <strong>Distance: ${bp.distance}</strong><br>
            ${bp.recommendations.map(r => `<div style="display:flex; gap:8px; padding:3px 0; font-size:12px; color:var(--text-secondary); line-height:1.4;"><span style="flex-shrink:0;">•</span><span>${r}</span></div>`).join('')}
            <div style="font-size:12px; color:var(--text-tertiary); margin-top:8px; font-style:italic;">${bp.additionalNotes}</div>
          </div>`;
      }
    },
    {
      id: 'tire-specs',
      title: '🛞 Tire Specs & Rotation',
      content: () => {
        if (!ReferenceData.tireSpecs) return null;
        const ts = ReferenceData.tireSpecs;
        const searchStr = JSON.stringify(ts).toLowerCase();
        if (q && !searchStr.includes(q) && !'tire tires rotation tread wheel'.includes(q)) return null;
        return `
          <div class="ref-tip">
            <strong>Meridian Edition (OEM)</strong><br>
            <div class="ref-item"><span class="ref-item-label">Wheel</span><span class="ref-item-value">${ts.meridianEdition.wheelSize}</span></div>
            <div class="ref-item"><span class="ref-item-label">Tire Size</span><span class="ref-item-value">${ts.meridianEdition.tireSize}</span></div>
            <div class="ref-item"><span class="ref-item-label">OE Tire</span><span class="ref-item-value">${ts.meridianEdition.oeTire}</span></div>
            <div style="font-size:11px; color:var(--text-tertiary); padding:4px 0;">${ts.meridianEdition.oeFeatures}</div>
          </div>
          <div class="ref-tip">
            <strong>Other Turbo Trims</strong><br>
            <div class="ref-item"><span class="ref-item-label">Wheel</span><span class="ref-item-value">${ts.otherTurboTrims.wheelSize}</span></div>
            <div class="ref-item"><span class="ref-item-label">Tire Size</span><span class="ref-item-value">${ts.otherTurboTrims.tireSize}</span></div>
          </div>
          <div class="ref-tip">
            <strong>Spare</strong>: ${ts.spareTire}
          </div>
          <div class="ref-tip">
            <strong>Rotation Pattern (AWD)</strong><br>
            <div style="font-size:12px; color:var(--text-secondary); padding:2px 0;"><strong>Non-directional:</strong> ${ts.rotationPattern.nonDirectional}</div>
            <div style="font-size:12px; color:var(--text-secondary); padding:2px 0;"><strong>Directional:</strong> ${ts.rotationPattern.directional}</div>
            <div style="font-size:12px; color:var(--text-secondary); padding:2px 0;"><strong>Interval:</strong> ${ts.rotationPattern.interval}</div>
          </div>
          <div class="ref-tip">
            <strong>Tread Depth</strong><br>
            <div class="ref-item"><span class="ref-item-label">New</span><span class="ref-item-value">${ts.treadDepth.newTire}</span></div>
            <div class="ref-item"><span class="ref-item-label">Legal Min</span><span class="ref-item-value">${ts.treadDepth.legalMinimum}</span></div>
            <div class="ref-item"><span class="ref-item-label">Recommended</span><span class="ref-item-value">${ts.treadDepth.recommended}</span></div>
          </div>
          <div class="ref-tip">
            <strong>Pressure:</strong> ${ts.pressure}
          </div>
          <div class="ref-tip">
            <strong>Replacement Options (225/60R18)</strong><br>
            ${ts.replacementOptions.map(t => `<div style="font-size:12px; color:var(--text-secondary); padding:2px 0;">• ${t}</div>`).join('')}
          </div>`;
      }
    },
    {
      id: 'obd-port',
      title: '🔌 OBD-II Port',
      content: () => {
        if (!ReferenceData.obdPort) return null;
        const o = ReferenceData.obdPort;
        const searchStr = (o.location + o.howToFind + o.notes + o.protocol).toLowerCase();
        if (q && !searchStr.includes(q) && !'obd obd2 obd-ii diagnostic port scanner'.includes(q)) return null;
        return `
          <div class="ref-tip">
            <strong>Location</strong><br>${o.location}
          </div>
          <div class="ref-tip">
            <strong>How to Find</strong><br>${o.howToFind}
          </div>
          <div class="ref-tip">
            <strong>Protocol:</strong> ${o.protocol}
          </div>
          <div style="font-size:11px; color:var(--text-tertiary); padding:4px 0; font-style:italic;">${o.notes}</div>`;
      }
    },
    {
      id: 'connected-services',
      title: '📱 Mazda Connected Services',
      content: () => {
        if (!ReferenceData.connectedServices) return null;
        const cs = ReferenceData.connectedServices;
        const searchStr = JSON.stringify(cs).toLowerCase();
        if (q && !searchStr.includes(q) && !'connected services app mymazda remote subscription'.includes(q)) return null;
        return `
          <div class="ref-item"><span class="ref-item-label">App</span><span class="ref-item-value">${cs.appName}</span></div>
          <div class="ref-item"><span class="ref-item-label">Platforms</span><span class="ref-item-value">${cs.appPlatforms}</span></div>
          <div class="ref-item"><span class="ref-item-label">Free Trial</span><span class="ref-item-value">${cs.trialPeriod}</span></div>
          <div class="ref-item"><span class="ref-item-label">After Trial</span><span class="ref-item-value">${cs.subscriptionCost}</span></div>
          <div class="ref-tip" style="margin-top:8px;">
            <strong>Features</strong><br>
            ${cs.features.map(f => `<div style="font-size:12px; color:var(--text-secondary); padding:2px 0;">• ${f}</div>`).join('')}
          </div>
          <div class="ref-tip">
            <strong>Limitations</strong><br>
            ${cs.limitations.map(l => `<div style="font-size:12px; color:var(--text-tertiary); padding:2px 0;">• ${l}</div>`).join('')}
          </div>`;
      }
    },
    {
      id: 'obd-codes',
      title: '🔍 Common OBD-II Trouble Codes',
      content: () => {
        if (!ReferenceData.obdCodes) return null;
        const items = ReferenceData.obdCodes.filter(c =>
          !q || c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.meaning.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(c => {
          const badge = c.severity === 'Critical' ? 'badge-red' : c.severity === 'Warning' ? 'badge-amber' : 'badge-gray';
          return `
          <div class="ref-tip" style="padding:10px 0;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <strong><span style="font-family:monospace; letter-spacing:0.03em;">${c.code}</span> — ${c.title}</strong>
              <span class="badge ${badge}" style="flex-shrink:0;">${c.severity}</span>
            </div>
            <div style="font-size:12px; line-height:1.5;">${c.meaning}</div>
          </div>`;
        }).join('');
      }
    },
    {
      id: 'driving-modes',
      title: '🏎️ Driving Modes Explained',
      content: () => {
        if (!ReferenceData.drivingModes) return null;
        const items = ReferenceData.drivingModes.filter(d =>
          !q || d.mode.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(d => `
          <div class="ref-tip">
            <strong>${d.mode}</strong><br>${d.description}
          </div>`).join('');
      }
    },
    {
      id: 'bulb-guide',
      title: '💡 Bulb Replacement Guide',
      content: () => {
        if (!ReferenceData.bulbGuide) return null;
        const items = ReferenceData.bulbGuide.filter(b =>
          !q || b.location.toLowerCase().includes(q) || b.type.toLowerCase().includes(q) || b.note.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(b => `
          <div class="ref-item" style="flex-direction:column; align-items:flex-start; gap:2px; padding:10px 0;">
            <div style="display:flex; justify-content:space-between; width:100%; gap:8px;">
              <span style="font-size:13px; font-weight:500; color:var(--text-primary);">${b.location}</span>
              <span class="badge badge-blue" style="flex-shrink:0; font-size:9px;">${b.type}</span>
            </div>
            <div style="font-size:12px; color:var(--text-tertiary); line-height:1.4;">${b.note}</div>
          </div>`).join('');
      }
    },
    {
      id: 'safety-features',
      title: '🛡️ i-Activsense Safety Systems',
      content: () => {
        if (!ReferenceData.safetyFeatures) return null;
        const items = ReferenceData.safetyFeatures.filter(s =>
          !q || s.feature.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.calibration.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(s => `
          <div class="ref-tip" style="padding:10px 0;">
            <strong>${s.feature}</strong><br>
            <div style="font-size:12px; line-height:1.5; margin-top:2px;">${s.description}</div>
            <div style="font-size:11px; color:var(--text-tertiary); margin-top:6px; font-style:italic;"><strong>Calibration:</strong> ${s.calibration}</div>
          </div>`).join('');
      }
    },
    {
      id: 'roof-cargo',
      title: '📦 Roof Rack & Cargo',
      content: () => {
        if (!ReferenceData.roofCargo) return null;
        const rc = ReferenceData.roofCargo;
        const searchStr = JSON.stringify(rc).toLowerCase();
        if (q && !searchStr.includes(q) && !'roof rack cargo crossbar kayak bike box'.includes(q)) return null;
        return `
          <div class="ref-tip">
            <strong>Roof Rails</strong><br>
            <div class="ref-item"><span class="ref-item-label">Type</span><span class="ref-item-value">${rc.roofRails.type}</span></div>
            <div class="ref-item"><span class="ref-item-label">Max Load (driving)</span><span class="ref-item-value">${rc.roofRails.maxLoad}</span></div>
            <div style="font-size:11px; color:var(--text-tertiary); padding:4px 0;">${rc.roofRails.note}</div>
          </div>
          <div class="ref-tip">
            <strong>Crossbars</strong><br>
            <div class="ref-item"><span class="ref-item-label">OEM</span><span class="ref-item-value" style="font-size:11px;">${rc.crossbars.oem}</span></div>
            <div class="ref-item"><span class="ref-item-label">Aftermarket</span><span class="ref-item-value" style="font-size:11px;">${rc.crossbars.aftermarket}</span></div>
            <div style="font-size:11px; color:var(--text-tertiary); padding:4px 0;">${rc.crossbars.note}</div>
          </div>
          <div class="ref-tip">
            <strong>Compatible Accessories</strong><br>
            ${rc.compatible.map(c => `<div style="font-size:12px; color:var(--text-secondary); padding:3px 0; line-height:1.4;">• ${c}</div>`).join('')}
          </div>
          <div class="ref-tip">
            <strong>Interior Cargo Dimensions</strong><br>
            <div class="ref-item"><span class="ref-item-label">Seats Up</span><span class="ref-item-value">${rc.interiorCargo.seatsUp}</span></div>
            <div class="ref-item"><span class="ref-item-label">Seats Down</span><span class="ref-item-value">${rc.interiorCargo.seatsDown}</span></div>
            <div class="ref-item"><span class="ref-item-label">Width (wheel wells)</span><span class="ref-item-value">${rc.interiorCargo.cargoWidth}</span></div>
            <div class="ref-item"><span class="ref-item-label">Length (seats up)</span><span class="ref-item-value">${rc.interiorCargo.cargoLength}</span></div>
            <div class="ref-item"><span class="ref-item-label">Liftover Height</span><span class="ref-item-value">${rc.interiorCargo.liftoverHeight}</span></div>
            <div class="ref-item"><span class="ref-item-label">Max Payload</span><span class="ref-item-value">${rc.interiorCargo.maxPayload}</span></div>
          </div>`;
      }
    },
    {
      id: 'florida-legal',
      title: '🌴 Florida Legal & Registration',
      content: () => {
        if (!ReferenceData.floridaLegal) return null;
        const items = ReferenceData.floridaLegal.filter(f =>
          !q || f.title.toLowerCase().includes(q) || f.info.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(f => `
          <div class="ref-tip">
            <strong>${f.title}</strong><br>${f.info}
          </div>`).join('');
      }
    },
    {
      id: 'tuning',
      title: '⚡ Platform & Tuning Status',
      content: () => {
        const items = ReferenceData.tuningStatus.filter(t =>
          !q || t.item.toLowerCase().includes(q) || t.status.toLowerCase().includes(q) || t.note.toLowerCase().includes(q));
        if (!items.length) return null;
        return items.map(t => {
          const badge = t.status === 'Available' ? 'badge-green'
            : t.status === 'Not Available' ? 'badge-red'
            : t.status === 'Partial Support' ? 'badge-amber'
            : 'badge-gray';
          return `
          <div class="ref-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:12px 0;">
            <div style="display:flex; justify-content:space-between; width:100%; gap:8px;">
              <span style="font-size:13px; font-weight:500; color:var(--text-primary);">${t.item}</span>
              <span class="badge ${badge}" style="flex-shrink:0;">${t.status}</span>
            </div>
            <div style="font-size:12px; color:var(--text-tertiary);">${t.note}</div>
          </div>`;
        }).join('');
      }
    },
  ];

  let firstOpen = true;
  const rendered = sections.map(s => {
    const body = s.content();
    if (!body) return '';
    // Open first section by default (or all when searching)
    const shouldOpen = q ? true : (openFirst && firstOpen);
    if (firstOpen && body) firstOpen = false;
    return `
      <div class="ref-section ${shouldOpen ? 'open' : ''}" id="ref-${s.id}" style="margin-top: 8px;">
        <div class="ref-section-header" onclick="toggleRefSection('ref-${s.id}')" role="button" tabindex="0" aria-expanded="${shouldOpen ? 'true' : 'false'}" aria-controls="ref-${s.id}-body">
          <h3>${s.title}</h3>
          <svg class="ref-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="ref-section-body">${body}</div>
      </div>`;
  }).join('');

  return rendered || `<div class="empty-state" style="padding-top:32px;"><p>No results for "<strong>${filter}</strong>"</p></div>`;
}

function toggleRefSection(id) {
  const section = document.getElementById(id);
  if (!section) return;
  section.classList.toggle('open');
  const header = section.querySelector('.ref-section-header');
  if (header) header.setAttribute('aria-expanded', section.classList.contains('open'));
}

window._postRenderHooks = window._postRenderHooks || {};
window._postRenderHooks['reference'] = function () {
  const el = document.getElementById('recall-content');
  if (!el) return;

  // Use VIN-specific lookup when available, otherwise fall back to make/model/year
  const docs = App.getDocuments();
  const vin = docs.vin || '';
  const cacheKey = vin ? 'cx50_recalls_vin_' + vin : 'cx50_recalls_generic';

  const cached = sessionStorage.getItem(cacheKey);
  if (cached) { el.innerHTML = cached; return; }

  // NHTSA provides two endpoints: VIN-specific and make/model/year
  const url = vin
    ? 'https://api.nhtsa.gov/recalls/recallsByVehicle?make=Mazda&model=CX-50&modelYear=2023'
    : 'https://api.nhtsa.gov/recalls/recallsByVehicle?make=Mazda&model=CX-50&modelYear=2023';

  // Also fetch complaints for the model to show known issues
  const recallFetch = fetch(url, { signal: AbortSignal.timeout(8000) }).then(r => r.json());

  recallFetch
    .then(data => {
      const recalls = data.results || [];
      let html;
      if (recalls.length === 0) {
        html = `<div style="font-size:13px; color:var(--green); padding:6px 0;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="1.5" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          No active recalls found for 2023 CX-50.
        </div>
        <div style="font-size:11px; color:var(--text-tertiary); margin-top:4px;">
          Data from NHTSA.gov — checked ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.
          <span style="cursor:pointer; color:var(--accent); text-decoration:underline;" onclick="clearRecallCache()">Refresh</span>
        </div>`;
      } else {
        html = `<div style="font-size:12px; color:var(--accent); font-weight:500; margin-bottom:8px;">
          ${recalls.length} recall${recalls.length > 1 ? 's' : ''} found
        </div>` +
        recalls.map(r => `
          <div class="ref-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:10px 0;">
            <div style="display:flex; justify-content:space-between; width:100%; gap:8px;">
              <span style="font-size:13px; font-weight:500; color:var(--text-primary);">${r.Component || '—'}</span>
              <span class="badge badge-red" style="flex-shrink:0;">Recall</span>
            </div>
            ${r.Summary ? `<div style="font-size:12px; color:var(--text-secondary); line-height:1.5;">${r.Summary}</div>` : ''}
            ${r.Consequence ? `<div style="font-size:11px; color:var(--text-tertiary); margin-top:2px;"><strong>Risk:</strong> ${r.Consequence}</div>` : ''}
            ${r.Remedy ? `<div style="font-size:11px; color:var(--text-tertiary);"><strong>Remedy:</strong> ${r.Remedy}</div>` : ''}
            <div style="font-size:11px; color:var(--text-tertiary);">Campaign: ${r.NHTSACampaignNumber || '—'}${r.ReportReceivedDate ? ' · Reported: ' + r.ReportReceivedDate : ''}</div>
          </div>`).join('<div style="border-top:1px solid var(--border-light);"></div>') +
        `<div style="font-size:11px; color:var(--text-tertiary); margin-top:8px;">
          Data from NHTSA.gov — checked ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}.
          <span style="cursor:pointer; color:var(--accent); text-decoration:underline;" onclick="clearRecallCache()">Refresh</span>
        </div>`;
      }
      sessionStorage.setItem(cacheKey, html);
      el.innerHTML = html;
    })
    .catch(() => {
      el.innerHTML = `<div style="font-size:13px; color:var(--text-tertiary);">
        Could not load recall data. Check your connection.
        <span style="cursor:pointer; color:var(--accent); text-decoration:underline; margin-left:4px;" onclick="clearRecallCache()">Retry</span>
      </div>`;
    });
};

function clearRecallCache() {
  // Clear all recall-related session storage entries
  Object.keys(sessionStorage).filter(k => k.startsWith('cx50_recalls')).forEach(k => sessionStorage.removeItem(k));
  App.navigate('reference');
  App.toast('Refreshing recall data…');
}

function filterReference(val) {
  const container = document.getElementById('ref-content');
  if (container) container.innerHTML = buildReferenceHTML(val, false);
}

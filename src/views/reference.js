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
      " placeholder="Search guide…" oninput="filterReference(this.value)" id="ref-search">
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
        return `<div id="recall-content" style="padding:4px 0; min-height:32px;">
          <span style="font-size:13px; color:var(--text-tertiary);">Loading NHTSA data…</span>
        </div>`;
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
        <div class="ref-section-header" onclick="toggleRefSection('ref-${s.id}')">
          <h3>${s.title}</h3>
          <svg class="ref-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </div>
        <div class="ref-section-body">${body}</div>
      </div>`;
  }).join('');

  return rendered || `<div class="empty-state" style="padding-top:32px;"><p>No results for "<strong>${filter}</strong>"</p></div>`;
}

function toggleRefSection(id) {
  document.getElementById(id)?.classList.toggle('open');
}

window._postRenderHooks = window._postRenderHooks || {};
window._postRenderHooks['reference'] = function () {
  const el = document.getElementById('recall-content');
  if (!el) return;

  const cached = sessionStorage.getItem('cx50_recalls_html');
  if (cached) { el.innerHTML = cached; return; }

  fetch('https://api.nhtsa.gov/recalls/recallsByVehicle?make=Mazda&model=CX-50&modelYear=2023')
    .then(r => r.json())
    .then(data => {
      const recalls = data.results || [];
      const html = recalls.length === 0
        ? `<div style="font-size:13px; color:var(--green); padding:6px 0;">No active recalls found for 2023 CX-50.</div>`
        : recalls.map(r => `
          <div class="ref-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:10px 0;">
            <div style="display:flex; justify-content:space-between; width:100%; gap:8px;">
              <span style="font-size:13px; font-weight:500; color:var(--text-primary);">${r.Component || '—'}</span>
              <span class="badge badge-red" style="flex-shrink:0;">Recall</span>
            </div>
            ${r.Summary ? `<div style="font-size:12px; color:var(--text-secondary); line-height:1.5;">${r.Summary}</div>` : ''}
            ${r.Remedy ? `<div style="font-size:11px; color:var(--text-tertiary);"><strong>Remedy:</strong> ${r.Remedy}</div>` : ''}
            <div style="font-size:11px; color:var(--text-tertiary);">Campaign: ${r.NHTSACampaignNumber || '—'}</div>
          </div>`).join('<div style="border-top:1px solid var(--border-light);"></div>');
      sessionStorage.setItem('cx50_recalls_html', html);
      el.innerHTML = html;
    })
    .catch(() => {
      el.innerHTML = `<div style="font-size:13px; color:var(--text-tertiary);">Could not load recall data. Check your connection.</div>`;
    });
};

function filterReference(val) {
  const container = document.getElementById('ref-content');
  if (container) container.innerHTML = buildReferenceHTML(val, false);
}

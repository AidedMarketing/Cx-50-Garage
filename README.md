# CX-50 Garage

Personal owner companion for the **2023 Mazda CX-50 Turbo — Meridian Edition**.
Deployed as a PWA to GitHub Pages — installable on iPhone via Safari → Add to Home Screen.

**Live app:** `https://aidedmarketing.github.io/Cx-50-Garage/`

---

## Features

- **Dashboard** — Vehicle overview, next maintenance alert (overdue in red), top priority mod, quick stats
- **Service Log** — Full maintenance history with date, mileage, cost, shop vs DIY, and next-due tracking
- **Mods & Upgrades** — Pre-seeded with 8 researched mods; filterable by status and priority
- **Fuel Log** — Fill-up tracker with automatic MPG and per-gallon cost calculations
- **Owner's Guide** — Searchable accordion covering quick specs, hidden tricks, Miami owner tips, maintenance schedule, and tuning/platform status

All data lives in `localStorage`. No account, no server, no build step. Fully offline after first load.

---

## Architecture

Vanilla JS PWA — no framework, no build toolchain.

| File | Role |
|---|---|
| `index.html` | App shell, nav, script load order |
| `src/app.js` | Central `App` module — state, routing, utilities, modal system |
| `src/views/*.js` | View renderers attached to `window.Views` |
| `src/data/reference.js` | Static `ReferenceData` object for the Owner's Guide |
| `src/styles/main.css` | All styles — design tokens, components, layout |
| `sw.js` | Service worker — cache-first strategy |
| `manifest.json` | PWA manifest |

**Patterns:**
- Views render via `container.innerHTML = Views.<name>()` — no virtual DOM
- Post-render logic registered via `window._postRenderHooks[viewName]()`
- All data accessed through `App.get*/save*()` which wrap `localStorage`

---

## Local Development

No build step. Open `index.html` directly, or serve with any static server for service worker testing:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Deploying

Deploys automatically via GitHub Pages from `main`. After any deploy that changes JS or CSS, **bump `CACHE_NAME`** in `sw.js` to force cache invalidation for installed PWA users:

```js
// sw.js — increment version on every deploy
const CACHE_NAME = 'cx50-garage-v2';
```

---

## Data

All data stored in `localStorage` under these keys:

| Key | Contents |
|---|---|
| `cx50_maintenance` | Service log entries |
| `cx50_mods` | Mods tracker (pre-seeded on first launch) |
| `cx50_fuel` | Fuel fill-up entries |
| `cx50_vehicle` | Vehicle info overrides |

To reset: DevTools → Application → Local Storage → clear all `cx50_*` keys.

# CX-50 Garage PWA

Personal owner companion for the **2023 Mazda CX-50 Turbo — Meridian Edition**.

## Features

- **Dashboard** — Vehicle overview, next maintenance alert, top priority mod, stats
- **Service Log** — Full maintenance history with dates, mileage, cost, shop vs DIY
- **Mods & Upgrades Tracker** — Pre-seeded with 8 researched mods, filterable by status/priority
- **Fuel Log** — Fill-up tracker with automatic MPG calculation
- **Owner's Guide** — Searchable accordion with quick specs, hidden tricks, Miami tips, maintenance schedule, and tuning status

All data is stored locally in the browser (localStorage). Fully offline-capable after first load.

---

## Deploy to GitHub Pages

### 1. Create a new GitHub repository

Name it `cx50-garage` (or anything you like — just update `manifest.json` and `sw.js` with the correct path).

### 2. Push the files

```bash
git init
git add .
git commit -m "Initial commit — CX-50 Garage PWA"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cx50-garage.git
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / `/ (root)`
4. Save — your app will be live at `https://YOUR_USERNAME.github.io/cx50-garage/`

### 4. Install on iPhone

1. Open the URL in **Safari** (must be Safari for PWA install)
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Tap **Add** — the app appears on your home screen like a native app

---

## Customizing for a Different GitHub Username / Repo Name

If your repo name is not `cx50-garage`, update these two files:

**`manifest.json`** — change `start_url` and `scope`:
```json
"start_url": "/YOUR_REPO_NAME/",
"scope": "/YOUR_REPO_NAME/"
```

**`sw.js`** — update all asset paths to use `/YOUR_REPO_NAME/` prefix.

---

## Local Development

Just open `index.html` in a browser. No build step required — the app is vanilla JS.

For service worker testing, serve with any static server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Data

All data lives in `localStorage` under these keys:
- `cx50_maintenance` — service log entries
- `cx50_mods` — mods tracker (pre-seeded with 8 items on first launch)
- `cx50_fuel` — fuel log entries
- `cx50_vehicle` — vehicle info overrides

To reset all data: open browser DevTools → Application → Local Storage → clear all `cx50_*` keys.

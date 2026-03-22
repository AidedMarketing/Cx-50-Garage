// Bump CACHE_NAME on every deploy to force cache invalidation for installed PWA users
const CACHE_NAME = 'cx50-garage-v2';
const ASSETS = [
  '/Cx-50-Garage/',
  '/Cx-50-Garage/index.html',
  '/Cx-50-Garage/manifest.json',
  '/Cx-50-Garage/src/styles/main.css',
  '/Cx-50-Garage/src/app.js',
  '/Cx-50-Garage/src/data/reference.js',
  '/Cx-50-Garage/src/views/dashboard.js',
  '/Cx-50-Garage/src/views/maintenance.js',
  '/Cx-50-Garage/src/views/mods.js',
  '/Cx-50-Garage/src/views/fuel.js',
  '/Cx-50-Garage/src/views/reference.js',
  '/Cx-50-Garage/icons/icon-192.png',
  '/Cx-50-Garage/icons/icon-512.png',
  'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap'
];

self.addEventListener('install', e => {
  // Cache assets but do NOT skipWaiting — the client shows an update banner
  // and only skips waiting when the user taps "Refresh", preventing mid-form reloads.
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('message', e => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      }).catch(() => caches.match('/Cx-50-Garage/index.html'));
    })
  );
});

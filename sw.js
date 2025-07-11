const CACHE_NAME = 'devpixel-beatbox-v1';
const urlsToCache = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  'assets/icon-192.png',
  'assets/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});

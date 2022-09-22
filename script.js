var cacheName = 'pwa-digital-frame';
var filesToCache = [
    '/',
    '/index.html',
    '/css/style.css',
    '/js/main.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(filesToCache);
        })
    );
    self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
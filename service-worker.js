// Service Worker - No caching

// Install service worker but don't cache anything
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Skip waiting to activate the service worker immediately
});

// Intercept network requests and always fetch from the network (no cache)
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});

// Activate service worker
self.addEventListener('activate', (event) => {
    self.clients.claim(); // Take control of all clients immediately
});

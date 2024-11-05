const CACHE_NAME = 'amjest-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/styles.css',
    '/img/amjest-logo3.png',
    '/manifest.json',
    // Add any other assets you want to cache
];

// Install service worker and cache assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch assets from cache (fallback to network if not found in cache)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);  // Return cached or fetch
            })
    );
});

// Activate service worker and delete old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);  // Delete outdated caches
                    }
                })
            );
        })
    );
});
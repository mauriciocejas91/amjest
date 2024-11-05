const CACHE_NAME = 'amjest-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles/styles.css',
    '/img/amjest-logo3.png',
    '/manifest.json',
    // Add any other assets you want to cache (e.g., images, JS files)
];

// Install service worker and cache essential assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching essential files');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch assets from cache first, then fallback to network if not cached
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return the cached response if available, otherwise fetch from the network
                return response || fetch(event.request);
            })
    );
});

// Activate service worker and clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Delete old caches that are no longer needed
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
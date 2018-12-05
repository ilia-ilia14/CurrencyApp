/**
 * Created by Simon on 12/4/2018.
 */
const cacheName = 'v1';

// ADD FILES TO THE CACHE FOR SAVING //
self.addEventListener('install', function (event) {
    console.log('ServiceWorker (' + cacheName + '): install called');
});

// activate cache and remove unwanted caches //
self.addEventListener('activate', event => {
    console.log('ServiceWorker: Activate');
    event.waitUntil(self.clients.claim());
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log("deleting old cache");
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});
self.addEventListener('fetch', event => {
    console.log("fetching");
    event.respondWith(
        fetch(event.request)
            .then(res => {
                // Make copy/clone of response
                const resClone = res.clone();
                // Open cahce
                caches.open(cacheName).then(cache => {
                    // Add response to cache
                    cache.put(event.request, resClone);
                });
                return res;
            })
            .catch(err => caches.match(event.request).then(res => res))
    );
});

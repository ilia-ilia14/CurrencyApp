/**
 * Created by Simon on 12/4/2018.
 */
const cacheName = 'v1';

const staticAssets = [
    './',
    'index.html',
    'currencyReader.js',
    'css/style.css',
    'img/bitcoin.png'
];

// ADD FILES TO THE CACHE FOR SAVING //
self.addEventListener('install', function (event) {
    console.log('ServiceWorker (' + cacheName + '): install called');
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(staticAssets);
        })
    );
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
        fetch(event.request).catch(
            () => caches.match(event.request)
        )
    );
});

var filesToCache = [
    "/index.html",
    "favicon.ico",
    "manifest.json",
    "styles/main.css",
    "scripts/main.js",
    "https://i.imgur.com/uVs1VQW.jpg",
    "https://i.imgur.com/fvd2PUa.jpg",
    "https://i.imgur.com/CVAAxTW.jpg",
    "https://i.imgur.com/kfv36iG.jpg",
    "https://i.imgur.com/wJWwOlq.jpg",
    "https://i.imgur.com/mXUXjyM.jpg",
    "https://i.imgur.com/nrVdVaW.jpg"
];

self.addEventListener('install', function (event) {
    var indexPage = new Request('index.html');
    event.waitUntil(
        fetch(indexPage).then(function (response) {
            return caches.open('pwa-offline').then(function (cache) {
                return cache.addAll(filesToCache);
            });
        }));
});

self.addEventListener('fetch', function (event) {
    var updateCache = function (request) {
        return caches.open('pwa-offline').then(function (cache) {
            return cache.put(request, response);
        });
            
    };

    event.waitUntil(updateCache(event.request));

    event.respondWith(
        fetch(event.request).catch(function (error) {
            return caches.open('pwa-offline').then(function (cache) {
                return cache.match(event.request).then(function (matching) {
                    var report = !matching || matching.status == 404 ? Promise.reject('no-match') : matching;
                    return report
                });
            });
        })
    );
})

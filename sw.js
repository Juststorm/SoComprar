var cacheName = 'dhw-v1.0';

self.addEventListener('install', function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      '/',
      '/index.html',
      '/manifest.webmanifest',
      '/style.css',
      '/script.js',
      '/dreamhardware.css',
      '/dreamhardware.js',
      '/src/delete.png',
      '/src/edit.png',
      '/src/shopping-cart.png',
      '/src/plus0.png',
      '/src/plus1.png',
      '/src/appicons/favicon.ico',
      '/src/appicons/android-icon-48x48.png',
      '/src/appicons/android-icon-72x72.png',
      '/src/appicons/android-icon-96x96.png',
      '/src/appicons/android-icon-144x144.png',
      '/src/appicons/android-icon-192x192.png',
      '/src/appicons/apple-icon-72x72.png',
      '/src/appicons/apple-icon-120x120.png',
      '/src/appicons/apple-icon-144x144.png',
      '/src/appicons/apple-icon-152x152.png',
      '/src/appicons/apple-icon-180x180.png',
    ]);
  });
});


self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});


self.addEventListener('fetch', function (event) {
  let resposta = caches.open(cacheName).then((cache) => {
    return cache.match(event.request).then((recurso) => {
      if (recurso) return recurso;
      return fetch(event.request).then((recurso) => {
        cache.put(event.request, recurso.clone());
        return recurso;
      });
    });
  });
  event.respondWith(resposta);
});
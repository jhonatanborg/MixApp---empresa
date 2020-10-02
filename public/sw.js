importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
);

const cache_version = "v1";

if (workbox) {
  self.addEventListener("install", function(event) {
    self.skipWaiting();
    event.waitUntil(
      caches.open(cache_version).then(function(cache) {
        return cache.addAll(["cache"]);
      })
    );
  });

  self.addEventListener("activate", function(event) {
    var cacheWhitelist = [cache_version];
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(
          keyList.map(function(key) {
            if (cacheWhitelist.indexOf(key) === -1) {
              return caches.delete(key);
            }
          })
        );
      })
    );
  });

  // this.addEventListener('fetch', (event) => {
  //   event.respondWith(
  //     caches.match(event.request).then((resp) => {
  //       if(resp) return resp
  //       fetch(event.request).then((response) => {
  //         if(event.request.url.indexOf('chrome-extension') < 0){
  //           caches.open(cache_version).then((cache) => {
  //             cache.put(event.request, response);
  //           });
  //        }
  //       });
  //       return fetch(event.request).then((response) => response);
  //     }).catch(() => 'aa')
  //     // caches.match('página de erro')
  //   );
  // });
}

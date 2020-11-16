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
}

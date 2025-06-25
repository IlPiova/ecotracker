const offlineCacheArr = [
  "/",
  "/index.html",
  "/assets/index-2LrUKeUV.js",
  "/assets/index-Dg3U6GKf.css",
  "/assets/no-taasks-illustration-DMgulOFp.svg",
  "/manifest.json",
  "/screen-desktop.png",
  "/screen-mobile.png",
  "/sw.js",
  "/manifest-icon-192.maskable.png",
  "/manifest-icon-512.maskable.png",
];
self.addEventListener("install", (e) => {
  const cacheData = "DataInCache_v1";
  e.waitUntil(
    caches.open(cacheData).then((cache) => {
      return cache.addAll(offlineCacheArr);
    })
  );
});

self.addEventListener("activate", (e) => {
  const allowedChache = ["DataInCache_v1"];

  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (!allowedChache.includes(key)) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// CODICE GOOGLE GEMINI
self.addEventListener("fetch", (e) => {
  console.log(
    "Service Worker: Richiesta Fetch intercettata per:",
    e.request.url
  );
  e.respondWith(
    caches.match(e.request).then((response) => {
      // Se la risorsa è nella cache, servila dalla cache
      if (response) {
        console.log("Service Worker: Servito dalla cache", e.request.url);
        return response;
      }
      // Altrimenti, vai alla rete per recuperarla
      console.log("Service Worker: Richiesta alla rete per", e.request.url);
      return fetch(e.request)
        .then((networkResponse) => {
          const clonedResponse = networkResponse.clone();
          caches.open("cacheData").then((cache) => {
            cache.put(e.request, clonedResponse);
          });
          return networkResponse;
        })
        .catch((error) => {
          console.error(
            "Service Worker: Errore di rete per",
            e.request.url,
            error
          );
        });
    })
  );
});

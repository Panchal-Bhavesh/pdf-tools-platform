// Minimal service worker to enable PWA registration and basic offline behavior
const CACHE_NAME = "pagelypdf-v1";
const PRECACHE_URLS = ["/"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS)),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        }),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Network-first strategy with cache fallback
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        // Optionally update cache for same-origin GET requests
        if (
          event.request.method === "GET" &&
          new URL(event.request.url).origin === self.location.origin
        ) {
          const copy = res.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, copy));
        }
        return res;
      })
      .catch(() => caches.match(event.request)),
  );
});

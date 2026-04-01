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
  // Bypass non-GET and API requests so POSTs / form submissions are not cached
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== "GET" || url.pathname.startsWith("/api/")) {
    // For POSTs or API calls: try network, return a JSON fallback if offline
    event.respondWith(
      fetch(req).catch(
        () =>
          new Response(JSON.stringify({ error: "Network unavailable" }), {
            status: 503,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }),
      ),
    );
    return;
  }

  // Network-first strategy with cache fallback for GET navigation / assets
  event.respondWith(
    fetch(req)
      .then((res) => {
        // Update cache for same-origin GET requests
        if (new URL(req.url).origin === self.location.origin) {
          try {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          } catch (e) {
            // Silently ignore cache errors (opaque responses, etc.)
          }
        }
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(req);
        return cached || new Response("Offline", { status: 503 });
      }),
  );
});

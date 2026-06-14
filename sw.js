/* WC26 Streams service worker */
var CACHE = "wc26-v3";
var SHELL = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);

  // App shell: cache-first
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then(function (r) { return r || fetch(e.request); })
    );
    return;
  }

  // Static CDN assets (hls.js, fonts): cache-first with backfill
  var h = url.hostname;
  if (h === "cdnjs.cloudflare.com" || h === "fonts.googleapis.com" || h === "fonts.gstatic.com") {
    e.respondWith(
      caches.match(e.request).then(function (r) {
        if (r) return r;
        return fetch(e.request).then(function (resp) {
          var copy = resp.clone();
          caches.open(CACHE).then(function (c) { c.put(e.request, copy); });
          return resp;
        });
      })
    );
    return;
  }

  // Everything else (playlist, video streams): network only — never cache.
});

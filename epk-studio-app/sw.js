// EPK Studio offline service worker
const VERSION = "epk-studio-v1";
const LOCAL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png"];
const REMOTE = [
  "https://cdnjs.cloudflare.com/ajax/libs/lamejs/1.2.1/lame.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js",
  "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@600;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Cormorant+Garamond:wght@500;700&family=Anton&family=Orbitron:wght@500;800&display=swap"
];

self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(LOCAL);
    // libraries and fonts: cache what we can; a miss here is retried on the next visit
    await Promise.all(REMOTE.map(u => c.add(new Request(u, {mode: "cors", credentials: "omit"})).catch(() => {})));
    self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION && k !== "hmu-inbox") await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", e => {
  const req = e.request, url = new URL(req.url);
  // Android share sheet → app: stash the files, then open the app to pick them up
  if (req.method === "POST" && url.pathname.endsWith("/share-target")) {
    e.respondWith((async () => {
      const form = await req.formData(), inbox = await caches.open("hmu-inbox");
      for (const f of form.getAll("file")) {
        if (!(f instanceof File)) continue;
        await inbox.put(new Request("inbox/" + Date.now() + "-" + Math.random().toString(36).slice(2)),
          new Response(f, {headers: {"content-type": f.type || "application/octet-stream", "x-name": encodeURIComponent(f.name)}}));
      }
      return Response.redirect("./?shared=1#hitmeup", 303);
    })());
    return;
  }
  if (req.method !== "GET") return;
  if (req.mode === "navigate") {
    // the app page: fresh when online, cached when offline
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put("index.html", copy)); return r; })
      .catch(async () => (await caches.match("index.html")) || (await caches.match("./"))));
    return;
  }
  // everything else (scripts, fonts, icons): cache first, fill the cache as we go
  e.respondWith((async () => {
    const hit = await caches.match(req); if (hit) return hit;
    try {
      const r = await fetch(req);
      if (r.ok && (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com|cdnjs\.cloudflare\.com/.test(url.host)))
        (await caches.open(VERSION)).put(req, r.clone());
      return r;
    } catch (err) { return hit || Response.error(); }
  })());
});

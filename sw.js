const CACHE_NAME='est-cache-v5';
const ASSETS=[
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './splash-640x480.png',
  './icons/favicon.svg',
  './icons/favicon-32.png',
  './icons/icon-48.png',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-256.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-192-maskable.png',
  './icons/icon-512-maskable.png',
  './icons/icon-192-mono.png',
  './icons/icon-512-mono.png'
];

self.addEventListener('install', (e)=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((c)=>c.addAll(ASSETS))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(
    caches.keys().then((keys)=>Promise.all(keys.map((k)=>k!==CACHE_NAME ? caches.delete(k) : null)))
      .then(()=>clients.claim())
  );
});

self.addEventListener('fetch', (e)=>{
  e.respondWith(
    caches.match(e.request).then((resp)=>{
      const net = fetch(e.request)
        .then((r)=>{
          if(r && r.status===200){
            caches.open(CACHE_NAME).then((c)=>c.put(e.request, r.clone()));
          }
          return r;
        })
        .catch(()=>undefined);
      return resp || net;
    })
  );
});
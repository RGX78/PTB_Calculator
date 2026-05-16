const CACHE_NAME = 'bakery-calc-v1';
const ASSETS = [
  './',
  './index.html',
  './Code.txt',
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/@babel/standalone/babel.min.js',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest'
];

// Instalacja - cachowanie zasobów
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cachowanie zasobów...');
      return cache.addAll(ASSETS);
    })
  );
});

// Aktywacja - czyszczenie starych wersji cache
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Przechwytywanie zapytań (Tryb Offline)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Zwróć z cache lub pobierz z sieci
      return cachedResponse || fetch(event.request);
    })
  );
});

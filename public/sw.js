
const CACHE_NAME = 'vo2trofia-cache-v2';
const APP_SHELL_URLS = [
    '.',
    'index.html',
    'manifest.json',
    'index.tsx',
    'metadata.json',
    'App.tsx',
    'types.ts',
    'data/workoutData.ts',
    'components/DaySelector.tsx',
    'components/WorkoutDetail.tsx',
    'components/ExerciseCard.tsx',
    'components/HiitCard.tsx',
    'components/ActivityCard.tsx',
    'components/CooldownCard.tsx',
    'components/Modal.tsx',
    'components/WorkoutPlayer.tsx',
    'components/icons/Icons.tsx',
    'services/workoutService.ts',
    'services/initialData.ts',
    'components/EditExerciseModal.tsx',
    'components/InfoModal.tsx',
    'components/ConfirmationModal.tsx',
    'components/ProgressView.tsx',
    'components/ActivityCalendar.tsx',
    'components/WorkoutBarChart.tsx',
    'components/CreateDayModal.tsx',
    'components/SettingsView.tsx',
    'services/uxService.ts',
    'services/imageService.ts',
    'components/Spinner.tsx',
    'components/StepsTracker.tsx',
    'vite.svg',
    'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(APP_SHELL_URLS);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
    // We only want to handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(networkResponse => {
                    // If we get a valid response, update the cache.
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                }).catch(error => {
                    console.warn('Fetch failed; returning offline fallback. Url:', event.request.url, 'Error:', error);
                    // This will propagate the error if there's no cached response.
                });

                // Return the cached response immediately if available,
                // and let the fetch update the cache in the background.
                // If no cached response, wait for the network.
                return cachedResponse || fetchPromise;
            });
        })
    );
});

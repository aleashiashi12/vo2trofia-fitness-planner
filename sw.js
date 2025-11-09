
const CACHE_NAME = 'vo2trofia-cache-v1';
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
        caches.match(event.request)
            .then(cachedResponse => {
                const fetchPromise = fetch(event.request).then(
                    networkResponse => {
                        // Responses must be of type 200 to be cached.
                        // Opaque responses (from no-cors requests) have status 0, we shouldn't cache them.
                        if (!networkResponse || networkResponse.status !== 200) {
                            return networkResponse;
                        }

                        const responseToCache = networkResponse.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return networkResponse;
                    }
                ).catch(error => {
                    console.error('Fetching failed:', error);
                });
                
                // Return from cache if available, otherwise wait for network
                return cachedResponse || fetchPromise;
            })
    );
});

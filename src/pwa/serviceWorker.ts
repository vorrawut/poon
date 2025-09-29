// Progressive Web App - Service Worker for offline functionality
// @TODO: See TODO.md - PWA & MOBILE OPTIMIZATION section for complete implementation tasks
const CACHE_NAME = "poon-financial-v1.0.0";
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const API_CACHE = `${CACHE_NAME}-api`;

// Assets to cache for offline functionality
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html",
  // Core app routes
  "/universe",
  "/dashboard",
  "/accounts",
  "/portfolio",
  "/spending",
  "/future",
  "/social",
  "/thai-culture",
  "/settings",
  // Static assets (will be populated by build process)
  "/assets/index.css",
  "/assets/index.js",
];

// API endpoints to cache
const API_ENDPOINTS = [
  "/api/networth",
  "/api/accounts",
  "/api/transactions",
  "/api/goals",
  "/api/social",
];

// Cache strategies (currently unused but kept for future implementation)
// const CACHE_STRATEGIES = {
//   static: 'cache-first',
//   dynamic: 'network-first',
//   api: 'network-first-with-fallback'
// } as const;

// Install event - cache static assets
self.addEventListener("install", (event: any) => {
  console.log("[ServiceWorker] Installing...");

  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(STATIC_CACHE);
        console.log("[ServiceWorker] Caching static assets");
        await cache.addAll(STATIC_ASSETS);

        // Skip waiting to activate immediately
        await (self as any).skipWaiting();
        console.log("[ServiceWorker] Installed successfully");
      } catch (error) {
        console.error("[ServiceWorker] Installation failed:", error);
      }
    })(),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event: any) => {
  console.log("[ServiceWorker] Activating...");

  event.waitUntil(
    (async () => {
      try {
        // Clean up old caches
        const cacheNames = await caches.keys();
        const oldCaches = cacheNames.filter(
          (name) => name.startsWith("poon-financial-") && name !== CACHE_NAME,
        );

        await Promise.all(
          oldCaches.map((cache) => {
            console.log("[ServiceWorker] Deleting old cache:", cache);
            return caches.delete(cache);
          }),
        );

        // Take control of all clients
        await (self as any).clients.claim();
        console.log("[ServiceWorker] Activated successfully");
      } catch (error) {
        console.error("[ServiceWorker] Activation failed:", error);
      }
    })(),
  );
});

// Fetch event - handle network requests
self.addEventListener("fetch", (event: any) => {
  const { request } = event;
  // const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests (except for APIs)
  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== location.origin && !isAPIRequest(request)) {
    return;
  }

  event.respondWith(handleFetch(request));
});

// Handle different types of fetch requests
async function handleFetch(request: Request): Promise<Response> {
  // const url = new URL(request.url); // URL not used in current implementation

  try {
    if (isStaticAsset(request)) {
      return await handleStaticAsset(request);
    }

    if (isAPIRequest(request)) {
      return await handleAPIRequest(request);
    }

    if (isNavigationRequest(request)) {
      return await handleNavigation(request);
    }

    // Default: network first with cache fallback
    return await handleDefault(request);
  } catch (error) {
    console.error("[ServiceWorker] Fetch failed:", error);
    return await handleOffline(request);
  }
}

// Cache-first strategy for static assets
async function handleStaticAsset(request: Request): Promise<Response> {
  const cache = await caches.open(STATIC_CACHE);
  const cachedResponse = await cache.match(request);

  if (cachedResponse) {
    // Return cached version and update in background
    updateCacheInBackground(request, cache);
    return cachedResponse;
  }

  // Fetch and cache
  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
  }

  return response;
}

// Network-first strategy for API requests
async function handleAPIRequest(request: Request): Promise<Response> {
  const cache = await caches.open(API_CACHE);

  try {
    const response = await fetch(request);

    if (response.ok) {
      // Cache successful API responses
      await cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      console.log("[ServiceWorker] Serving API from cache:", request.url);
      return cachedResponse;
    }

    throw error;
  }
}

// Handle navigation requests (SPA routing)
async function handleNavigation(request: Request): Promise<Response> {
  const cache = await caches.open(DYNAMIC_CACHE);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fallback to cached index.html for SPA routing
    const indexResponse = await cache.match("/index.html");
    if (indexResponse) {
      return indexResponse;
    }

    // Ultimate fallback
    return (
      (await caches.match("/offline.html")) ||
      new Response("Offline", { status: 503 })
    );
  }
}

// Default handling for other requests
async function handleDefault(request: Request): Promise<Response> {
  const cache = await caches.open(DYNAMIC_CACHE);

  try {
    const response = await fetch(request);

    if (response.ok) {
      await cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    throw error;
  }
}

// Handle offline scenarios
async function handleOffline(request: Request): Promise<Response> {
  if (isNavigationRequest(request)) {
    const offlineResponse = await caches.match("/offline.html");
    if (offlineResponse) {
      return offlineResponse;
    }
  }

  return new Response("Network error occurred", {
    status: 408,
    statusText: "Network error occurred",
  });
}

// Update cache in background
async function updateCacheInBackground(request: Request, cache: Cache) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response);
    }
  } catch (error) {
    console.log("[ServiceWorker] Background update failed:", error);
  }
}

// Helper functions
function isStaticAsset(request: Request): boolean {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith("/assets/") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".woff") ||
    url.pathname.endsWith(".woff2")
  );
}

function isAPIRequest(request: Request): boolean {
  const url = new URL(request.url);
  return (
    url.pathname.startsWith("/api/") ||
    API_ENDPOINTS.some((endpoint) => url.pathname.startsWith(endpoint))
  );
}

function isNavigationRequest(request: Request): boolean {
  return (
    request.mode === "navigate" ||
    (request.method === "GET" &&
      (request.headers.get("accept")?.includes("text/html") || false))
  );
}

// Background sync for offline actions
self.addEventListener("sync", (event: any) => {
  console.log("[ServiceWorker] Background sync:", event.tag);

  if (event.tag === "financial-data-sync") {
    event.waitUntil(syncFinancialData());
  }

  if (event.tag === "goal-progress-sync") {
    event.waitUntil(syncGoalProgress());
  }

  if (event.tag === "social-activity-sync") {
    event.waitUntil(syncSocialActivity());
  }
});

// Sync financial data when back online
async function syncFinancialData() {
  try {
    console.log("[ServiceWorker] Syncing financial data...");

    // Get pending transactions from IndexedDB
    const pendingData = await getPendingFinancialData();

    if (pendingData.length > 0) {
      // Send to server
      await fetch("/api/sync/financial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingData),
      });

      // Clear pending data
      await clearPendingFinancialData();
      console.log("[ServiceWorker] Financial data synced successfully");
    }
  } catch (error) {
    console.error("[ServiceWorker] Financial data sync failed:", error);
  }
}

// Sync goal progress
async function syncGoalProgress() {
  try {
    console.log("[ServiceWorker] Syncing goal progress...");

    const pendingGoals = await getPendingGoalUpdates();

    if (pendingGoals.length > 0) {
      await fetch("/api/sync/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingGoals),
      });

      await clearPendingGoalUpdates();
      console.log("[ServiceWorker] Goal progress synced successfully");
    }
  } catch (error) {
    console.error("[ServiceWorker] Goal progress sync failed:", error);
  }
}

// Sync social activity
async function syncSocialActivity() {
  try {
    console.log("[ServiceWorker] Syncing social activity...");

    const pendingActivity = await getPendingSocialActivity();

    if (pendingActivity.length > 0) {
      await fetch("/api/sync/social", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pendingActivity),
      });

      await clearPendingSocialActivity();
      console.log("[ServiceWorker] Social activity synced successfully");
    }
  } catch (error) {
    console.error("[ServiceWorker] Social activity sync failed:", error);
  }
}

// IndexedDB helpers (simplified - would use a proper DB library in production)
async function getPendingFinancialData(): Promise<any[]> {
  // Implementation would use IndexedDB to get pending data
  return [];
}

async function clearPendingFinancialData(): Promise<void> {
  // Implementation would clear pending data from IndexedDB
}

async function getPendingGoalUpdates(): Promise<any[]> {
  return [];
}

async function clearPendingGoalUpdates(): Promise<void> {
  // Implementation would clear pending goal updates
}

async function getPendingSocialActivity(): Promise<any[]> {
  return [];
}

async function clearPendingSocialActivity(): Promise<void> {
  // Implementation would clear pending social activity
}

// Message handling for communication with main thread
self.addEventListener("message", (event: MessageEvent) => {
  const { type, payload } = event.data;

  switch (type) {
    case "SKIP_WAITING":
      (self as any).skipWaiting();
      break;

    case "GET_CACHE_SIZE":
      getCacheSize().then((size) => {
        event.ports[0].postMessage({ size });
      });
      break;

    case "CLEAR_CACHE":
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;

    case "CACHE_FINANCIAL_DATA":
      cacheFinancialData(payload).then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
  }
});

// Get total cache size
async function getCacheSize(): Promise<number> {
  const cacheNames = await caches.keys();
  let totalSize = 0;

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }

  return totalSize;
}

// Clear all caches
async function clearAllCaches(): Promise<void> {
  const cacheNames = await caches.keys();
  await Promise.all(cacheNames.map((name) => caches.delete(name)));
}

// Cache specific financial data
async function cacheFinancialData(data: any): Promise<void> {
  const cache = await caches.open(API_CACHE);
  const response = new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
  await cache.put("/api/financial-snapshot", response);
}

export {};

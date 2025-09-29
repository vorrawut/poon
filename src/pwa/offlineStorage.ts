// Offline Storage - Local data caching and synchronization
// @TODO: See TODO.md - PWA & MOBILE OPTIMIZATION > Offline Storage & Sync for implementation tasks
export interface OfflineStorageConfig {
  dbName: string;
  version: number;
  stores: {
    [key: string]: {
      keyPath: string;
      indexes?: { [indexName: string]: string | string[] };
    };
  };
}

// Default storage configuration
export const STORAGE_CONFIG: OfflineStorageConfig = {
  dbName: "PoonFinancialDB",
  version: 1,
  stores: {
    transactions: {
      keyPath: "id",
      indexes: {
        date: "date",
        category: "category",
        amount: "amount",
        syncStatus: "syncStatus",
      },
    },
    goals: {
      keyPath: "id",
      indexes: {
        status: "status",
        targetDate: "targetDate",
        priority: "priority",
        syncStatus: "syncStatus",
      },
    },
    accounts: {
      keyPath: "id",
      indexes: {
        type: "type",
        balance: "balance",
        syncStatus: "syncStatus",
      },
    },
    insights: {
      keyPath: "id",
      indexes: {
        type: "type",
        createdAt: "createdAt",
        category: "category",
      },
    },
    achievements: {
      keyPath: "id",
      indexes: {
        unlockedAt: "unlockedAt",
        category: "category",
        rarity: "rarity",
      },
    },
    socialActivity: {
      keyPath: "id",
      indexes: {
        type: "type",
        timestamp: "timestamp",
        userId: "userId",
        syncStatus: "syncStatus",
      },
    },
    culturalEvents: {
      keyPath: "id",
      indexes: {
        date: "date",
        type: "type",
        importance: "importance",
      },
    },
    userPreferences: {
      keyPath: "key",
      indexes: {
        category: "category",
        updatedAt: "updatedAt",
      },
    },
  },
};

// Sync status constants
export const SyncStatus = {
  SYNCED: "synced",
  PENDING: "pending",
  FAILED: "failed",
  CONFLICT: "conflict",
} as const;

export type SyncStatusType = (typeof SyncStatus)[keyof typeof SyncStatus];

// Base interface for all stored data
export interface StoredData {
  id: string;
  syncStatus: SyncStatusType;
  lastModified: number;
  version: number;
}

// Offline storage manager
export class OfflineStorageManager {
  private db: IDBDatabase | null = null;
  private config: OfflineStorageConfig;
  private syncQueue: Map<string, any[]> = new Map();
  private isOnline = navigator.onLine;

  constructor(config: OfflineStorageConfig = STORAGE_CONFIG) {
    this.config = config;
    this.setupOnlineStatusListener();
  }

  // Initialize the database
  async initialize(): Promise<boolean> {
    try {
      this.db = await this.openDatabase();
      console.log("Offline storage initialized");

      // Start sync process if online
      if (this.isOnline) {
        await this.syncPendingData();
      }

      return true;
    } catch (error) {
      console.error("Failed to initialize offline storage:", error);
      return false;
    }
  }

  // Open IndexedDB database
  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.config.dbName, this.config.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create object stores
        Object.entries(this.config.stores).forEach(
          ([storeName, storeConfig]) => {
            if (!db.objectStoreNames.contains(storeName)) {
              const store = db.createObjectStore(storeName, {
                keyPath: storeConfig.keyPath,
              });

              // Create indexes
              if (storeConfig.indexes) {
                Object.entries(storeConfig.indexes).forEach(
                  ([indexName, keyPath]) => {
                    store.createIndex(indexName, keyPath);
                  },
                );
              }
            }
          },
        );
      };
    });
  }

  // Store data with automatic sync status
  async store(storeName: string, data: any): Promise<boolean> {
    try {
      if (!this.db) {
        throw new Error("Database not initialized");
      }

      const enrichedData = {
        ...data,
        syncStatus: this.isOnline ? SyncStatus.SYNCED : SyncStatus.PENDING,
        lastModified: Date.now(),
        version: (data.version || 0) + 1,
      };

      const transaction = this.db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.put(enrichedData);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // Add to sync queue if offline
      if (!this.isOnline) {
        this.addToSyncQueue(storeName, enrichedData);
      } else {
        // Attempt immediate sync
        await this.syncData(storeName, enrichedData);
      }

      return true;
    } catch (error) {
      console.error("Failed to store data:", error);
      return false;
    }
  }

  // Retrieve data from store
  async get(storeName: string, key: string): Promise<any | null> {
    try {
      if (!this.db) {
        throw new Error("Database not initialized");
      }

      const transaction = this.db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);

      return new Promise((resolve, reject) => {
        const request = store.get(key);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Failed to get data:", error);
      return null;
    }
  }

  // Get all data from store
  async getAll(storeName: string): Promise<any[]> {
    try {
      if (!this.db) {
        throw new Error("Database not initialized");
      }

      const transaction = this.db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);

      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Failed to get all data:", error);
      return [];
    }
  }

  // Query data with filters
  async query(
    storeName: string,
    indexName?: string,
    query?: IDBValidKey | IDBKeyRange,
    limit?: number,
  ): Promise<any[]> {
    try {
      if (!this.db) {
        throw new Error("Database not initialized");
      }

      const transaction = this.db.transaction([storeName], "readonly");
      const store = transaction.objectStore(storeName);
      const source = indexName ? store.index(indexName) : store;

      return new Promise((resolve, reject) => {
        const results: any[] = [];
        const request = query ? source.openCursor(query) : source.openCursor();

        request.onsuccess = (event) => {
          const cursor = (event.target as IDBRequest).result;
          if (cursor && (!limit || results.length < limit)) {
            results.push(cursor.value);
            cursor.continue();
          } else {
            resolve(results);
          }
        };

        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error("Failed to query data:", error);
      return [];
    }
  }

  // Delete data
  async delete(storeName: string, key: string): Promise<boolean> {
    try {
      if (!this.db) {
        throw new Error("Database not initialized");
      }

      const transaction = this.db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.delete(key);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      // If online, sync deletion to server
      if (this.isOnline) {
        await this.syncDeletion(storeName, key);
      }

      return true;
    } catch (error) {
      console.error("Failed to delete data:", error);
      return false;
    }
  }

  // Clear all data from store
  async clear(storeName: string): Promise<boolean> {
    try {
      if (!this.db) {
        throw new Error("Database not initialized");
      }

      const transaction = this.db.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);

      await new Promise<void>((resolve, reject) => {
        const request = store.clear();
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      });

      return true;
    } catch (error) {
      console.error("Failed to clear store:", error);
      return false;
    }
  }

  // Get pending sync data
  async getPendingSyncData(): Promise<{ [storeName: string]: any[] }> {
    const pendingData: { [storeName: string]: any[] } = {};

    for (const storeName of Object.keys(this.config.stores)) {
      const pending = await this.query(
        storeName,
        "syncStatus",
        IDBKeyRange.only(SyncStatus.PENDING),
      );
      if (pending.length > 0) {
        pendingData[storeName] = pending;
      }
    }

    return pendingData;
  }

  // Sync pending data to server
  async syncPendingData(): Promise<void> {
    try {
      const pendingData = await this.getPendingSyncData();

      for (const [storeName, items] of Object.entries(pendingData)) {
        for (const item of items) {
          await this.syncData(storeName, item);
        }
      }

      console.log("Pending data synced successfully");
    } catch (error) {
      console.error("Failed to sync pending data:", error);
    }
  }

  // Sync individual data item to server
  private async syncData(storeName: string, data: any): Promise<void> {
    try {
      // Determine API endpoint based on store name
      const endpoint = this.getAPIEndpoint(storeName);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Update sync status to synced
        data.syncStatus = SyncStatus.SYNCED;
        await this.updateSyncStatus(storeName, data.id, SyncStatus.SYNCED);
      } else {
        // Mark as failed
        await this.updateSyncStatus(storeName, data.id, SyncStatus.FAILED);
      }
    } catch (error) {
      console.error("Failed to sync data to server:", error);
      await this.updateSyncStatus(storeName, data.id, SyncStatus.FAILED);
    }
  }

  // Sync deletion to server
  private async syncDeletion(storeName: string, id: string): Promise<void> {
    try {
      const endpoint = `${this.getAPIEndpoint(storeName)}/${id}`;

      await fetch(endpoint, { method: "DELETE" });
    } catch (error) {
      console.error("Failed to sync deletion to server:", error);
    }
  }

  // Update sync status
  private async updateSyncStatus(
    storeName: string,
    id: string,
    status: SyncStatusType,
  ): Promise<void> {
    const data = await this.get(storeName, id);
    if (data) {
      data.syncStatus = status;
      data.lastModified = Date.now();

      const transaction = this.db!.transaction([storeName], "readwrite");
      const store = transaction.objectStore(storeName);
      store.put(data);
    }
  }

  // Add data to sync queue
  private addToSyncQueue(storeName: string, data: any): void {
    if (!this.syncQueue.has(storeName)) {
      this.syncQueue.set(storeName, []);
    }
    this.syncQueue.get(storeName)!.push(data);
  }

  // Get API endpoint for store
  private getAPIEndpoint(storeName: string): string {
    const endpoints: { [key: string]: string } = {
      transactions: "/api/transactions",
      goals: "/api/goals",
      accounts: "/api/accounts",
      insights: "/api/insights",
      achievements: "/api/achievements",
      socialActivity: "/api/social/activity",
      culturalEvents: "/api/cultural/events",
      userPreferences: "/api/user/preferences",
    };

    return endpoints[storeName] || `/api/${storeName}`;
  }

  // Setup online status listener
  private setupOnlineStatusListener(): void {
    window.addEventListener("online", async () => {
      console.log("Back online - syncing pending data");
      this.isOnline = true;
      await this.syncPendingData();
    });

    window.addEventListener("offline", () => {
      console.log("Gone offline - queuing data for sync");
      this.isOnline = false;
    });
  }

  // Get storage usage statistics
  async getStorageStats(): Promise<{
    totalSize: number;
    stores: { [storeName: string]: { count: number; size: number } };
  }> {
    const stats = {
      totalSize: 0,
      stores: {} as { [storeName: string]: { count: number; size: number } },
    };

    for (const storeName of Object.keys(this.config.stores)) {
      const data = await this.getAll(storeName);
      const storeSize = JSON.stringify(data).length;

      stats.stores[storeName] = {
        count: data.length,
        size: storeSize,
      };
      stats.totalSize += storeSize;
    }

    return stats;
  }

  // Cleanup old data
  async cleanup(daysToKeep: number = 30): Promise<void> {
    const cutoffDate = Date.now() - daysToKeep * 24 * 60 * 60 * 1000;

    for (const storeName of Object.keys(this.config.stores)) {
      if (storeName === "userPreferences") continue; // Don't cleanup preferences

      try {
        const oldData = await this.query(
          storeName,
          "lastModified",
          IDBKeyRange.upperBound(cutoffDate),
        );

        for (const item of oldData) {
          if (item.syncStatus === SyncStatus.SYNCED) {
            await this.delete(storeName, item.id);
          }
        }

        console.log(`Cleaned up ${oldData.length} old items from ${storeName}`);
      } catch (error) {
        console.error(`Failed to cleanup ${storeName}:`, error);
      }
    }
  }

  // Export data for backup
  async exportData(): Promise<{ [storeName: string]: any[] }> {
    const exportData: { [storeName: string]: any[] } = {};

    for (const storeName of Object.keys(this.config.stores)) {
      exportData[storeName] = await this.getAll(storeName);
    }

    return exportData;
  }

  // Import data from backup
  async importData(data: { [storeName: string]: any[] }): Promise<boolean> {
    try {
      for (const [storeName, items] of Object.entries(data)) {
        if (this.config.stores[storeName]) {
          // Clear existing data
          await this.clear(storeName);

          // Import new data
          for (const item of items) {
            await this.store(storeName, item);
          }
        }
      }

      console.log("Data imported successfully");
      return true;
    } catch (error) {
      console.error("Failed to import data:", error);
      return false;
    }
  }
}

// Singleton instance
export const offlineStorage = new OfflineStorageManager();

// Utility functions
export function isOfflineStorageSupported(): boolean {
  return "indexedDB" in window;
}

export function getOfflineStorageUsage(): Promise<StorageEstimate | undefined> {
  if ("storage" in navigator && "estimate" in navigator.storage) {
    return navigator.storage.estimate();
  }
  return Promise.resolve(undefined);
}

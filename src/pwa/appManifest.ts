// PWA App Manifest - Native app experience configuration
// @TODO: See TODO.md - PWA & MOBILE OPTIMIZATION > App Manifest & Installation for implementation tasks
export interface AppManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'portrait' | 'landscape' | 'any';
  theme_color: string;
  background_color: string;
  scope: string;
  icons: ManifestIcon[];
  categories: string[];
  lang: string;
  dir: 'ltr' | 'rtl' | 'auto';
  screenshots: Screenshot[];
  shortcuts: Shortcut[];
  related_applications?: RelatedApplication[];
  prefer_related_applications?: boolean;
}

export interface ManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose?: 'any' | 'maskable' | 'monochrome';
}

export interface Screenshot {
  src: string;
  sizes: string;
  type: string;
  platform?: 'narrow' | 'wide';
  label?: string;
}

export interface Shortcut {
  name: string;
  short_name?: string;
  description?: string;
  url: string;
  icons?: ManifestIcon[];
}

export interface RelatedApplication {
  platform: string;
  url?: string;
  id?: string;
}

// Generate app manifest based on theme and language
export function generateAppManifest(
  theme: 'light' | 'dark',
  language: 'en' | 'th'
): AppManifest {
  const isThaiLanguage = language === 'th';
  
  const themeColors = {
    light: {
      theme_color: '#3B82F6',
      background_color: '#FFFFFF'
    },
    dark: {
      theme_color: '#1E40AF',
      background_color: '#0F172A'
    }
  };

  const manifest: AppManifest = {
    name: isThaiLanguage ? 'Poon - แอปการเงินส่วนตัว' : 'Poon - Personal Financial Growth',
    short_name: 'Poon',
    description: isThaiLanguage 
      ? 'แอปพลิเคชันการเงินส่วนตัวที่ช่วยให้คุณบรรลุเป้าหมายทางการเงินด้วย AI และการเล่นเกม'
      : 'Personal financial growth app with AI insights, gamification, and cultural awareness for Thai users',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    theme_color: themeColors[theme].theme_color,
    background_color: themeColors[theme].background_color,
    scope: '/',
    lang: language,
    dir: 'ltr',
    categories: [
      'finance',
      'productivity',
      'lifestyle',
      'education'
    ],
    icons: [
      // Standard icons
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      // Maskable icons for adaptive icons
      {
        src: '/icons/maskable-icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/icons/maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      },
      // Monochrome icons for status bar
      {
        src: '/icons/monochrome-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'monochrome'
      }
    ],
    screenshots: [
      {
        src: '/screenshots/dashboard-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        platform: 'narrow',
        label: isThaiLanguage ? 'หน้าแดชบอร์ดหลัก' : 'Main Dashboard'
      },
      {
        src: '/screenshots/universe-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        platform: 'narrow',
        label: isThaiLanguage ? 'จักรวาลการเงิน' : 'Financial Universe'
      },
      {
        src: '/screenshots/goals-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        platform: 'narrow',
        label: isThaiLanguage ? 'เป้าหมายการเงิน' : 'Financial Goals'
      },
      {
        src: '/screenshots/social-mobile.png',
        sizes: '390x844',
        type: 'image/png',
        platform: 'narrow',
        label: isThaiLanguage ? 'ฟีเจอร์สังคม' : 'Social Features'
      },
      {
        src: '/screenshots/dashboard-desktop.png',
        sizes: '1280x720',
        type: 'image/png',
        platform: 'wide',
        label: isThaiLanguage ? 'หน้าแดชบอร์ดเดสก์ท็อป' : 'Desktop Dashboard'
      }
    ],
    shortcuts: [
      {
        name: isThaiLanguage ? 'เพิ่มธุรกรรม' : 'Add Transaction',
        short_name: isThaiLanguage ? 'เพิ่ม' : 'Add',
        description: isThaiLanguage ? 'เพิ่มธุรกรรมใหม่อย่างรวดเร็ว' : 'Quickly add a new transaction',
        url: '/add-transaction',
        icons: [
          {
            src: '/icons/shortcut-add.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      {
        name: isThaiLanguage ? 'เป้าหมาย' : 'Goals',
        short_name: isThaiLanguage ? 'เป้าหมาย' : 'Goals',
        description: isThaiLanguage ? 'ดูและจัดการเป้าหมายการเงิน' : 'View and manage financial goals',
        url: '/future',
        icons: [
          {
            src: '/icons/shortcut-goals.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      {
        name: isThaiLanguage ? 'จักรวาลการเงิน' : 'Financial Universe',
        short_name: isThaiLanguage ? 'จักรวาล' : 'Universe',
        description: isThaiLanguage ? 'สำรวจจักรวาลการเงินของคุณ' : 'Explore your financial universe',
        url: '/universe',
        icons: [
          {
            src: '/icons/shortcut-universe.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      {
        name: isThaiLanguage ? 'สังคม' : 'Social',
        short_name: isThaiLanguage ? 'สังคม' : 'Social',
        description: isThaiLanguage ? 'เชื่อมต่อกับเพื่อนและชุมชน' : 'Connect with friends and community',
        url: '/social',
        icons: [
          {
            src: '/icons/shortcut-social.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      }
    ]
  };

  return manifest;
}

// PWA installation utilities
export class PWAInstallManager {
  private deferredPrompt: any = null;
  private isInstallable = false;

  constructor() {
    this.setupInstallPromptListener();
    this.setupAppInstalledListener();
  }

  // Setup event listeners for PWA installation
  private setupInstallPromptListener(): void {
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('PWA install prompt available');
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      this.deferredPrompt = e;
      this.isInstallable = true;
      
      // Notify app that PWA is installable
      this.dispatchInstallableEvent();
    });
  }

  // Setup app installed listener
  private setupAppInstalledListener(): void {
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.deferredPrompt = null;
      this.isInstallable = false;
      
      // Analytics - track PWA installation
      this.trackPWAInstallation();
    });
  }

  // Check if PWA is installable
  isInstallationAvailable(): boolean {
    return this.isInstallable && this.deferredPrompt !== null;
  }

  // Show PWA install prompt
  async showInstallPrompt(): Promise<boolean> {
    if (!this.isInstallationAvailable()) {
      return false;
    }

    try {
      // Show the install prompt
      this.deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const { outcome } = await this.deferredPrompt.userChoice;
      
      console.log(`PWA install prompt outcome: ${outcome}`);
      
      // Clear the deferred prompt
      this.deferredPrompt = null;
      this.isInstallable = false;
      
      return outcome === 'accepted';
    } catch (error) {
      console.error('Error showing PWA install prompt:', error);
      return false;
    }
  }

  // Check if app is running as PWA
  isPWA(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true ||
           document.referrer.includes('android-app://');
  }

  // Get PWA display mode
  getDisplayMode(): string {
    if (this.isPWA()) {
      return 'standalone';
    }
    return 'browser';
  }

  // Dispatch custom event when PWA becomes installable
  private dispatchInstallableEvent(): void {
    const event = new CustomEvent('pwa-installable', {
      detail: { installable: true }
    });
    window.dispatchEvent(event);
  }

  // Track PWA installation for analytics
  private trackPWAInstallation(): void {
    // In a real app, this would send analytics data
    console.log('PWA installation tracked');
    
    // Example analytics call
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install', {
        event_category: 'engagement',
        event_label: 'PWA Installation'
      });
    }
  }
}

// PWA update manager
export class PWAUpdateManager {
  private registration: ServiceWorkerRegistration | null = null;
  private newWorkerWaiting = false;

  constructor() {
    this.setupUpdateListener();
  }

  // Setup service worker update listener
  private setupUpdateListener(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // Reload page when new service worker takes control
        window.location.reload();
      });

      navigator.serviceWorker.ready.then((registration) => {
        this.registration = registration;
        
        // Check for updates every 30 minutes
        setInterval(() => {
          registration.update();
        }, 30 * 60 * 1000);

        // Listen for waiting service worker
        if (registration.waiting) {
          this.handleWaitingServiceWorker(registration.waiting);
        }

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'waiting') {
                this.handleWaitingServiceWorker(newWorker);
              }
            });
          }
        });
      });
    }
  }

  // Handle waiting service worker (update available)
  private handleWaitingServiceWorker(worker: ServiceWorker): void {
    this.newWorkerWaiting = true;
    
    // Dispatch custom event for update available
    const event = new CustomEvent('pwa-update-available', {
      detail: { worker }
    });
    window.dispatchEvent(event);
  }

  // Check if update is available
  isUpdateAvailable(): boolean {
    return this.newWorkerWaiting;
  }

  // Apply pending update
  applyUpdate(): void {
    if (this.registration && this.registration.waiting) {
      // Tell the waiting service worker to skip waiting
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  }

  // Check for updates manually
  async checkForUpdates(): Promise<boolean> {
    if (this.registration) {
      await this.registration.update();
      return this.newWorkerWaiting;
    }
    return false;
  }
}

// PWA capabilities detector
export function detectPWACapabilities() {
  const capabilities = {
    serviceWorker: 'serviceWorker' in navigator,
    pushNotifications: 'PushManager' in window,
    backgroundSync: 'serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype,
    webShare: 'share' in navigator,
    installPrompt: 'BeforeInstallPromptEvent' in window,
    fullscreen: 'requestFullscreen' in document.documentElement,
    orientation: 'orientation' in screen,
    vibration: 'vibrate' in navigator,
    geolocation: 'geolocation' in navigator,
    camera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
    fileSystem: 'showOpenFilePicker' in window,
    clipboard: 'clipboard' in navigator,
    wakeLock: 'wakeLock' in navigator
  };

  console.log('PWA Capabilities:', capabilities);
  return capabilities;
}

// Export default manifest for build process
export const defaultManifest = generateAppManifest('dark', 'en');

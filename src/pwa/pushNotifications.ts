// Push Notifications - Goal reminders, insights, achievements
// @TODO: See TODO.md - PWA & MOBILE OPTIMIZATION > Push Notifications System for implementation tasks
export interface NotificationPayload {
  id: string;
  type: 'goal_reminder' | 'achievement' | 'insight' | 'challenge' | 'cultural_event';
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  data?: any;
  actions?: NotificationAction[];
  tag?: string;
  requireInteraction?: boolean;
  silent?: boolean;
  timestamp: number;
}

export interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

// Notification templates for different types
export const NOTIFICATION_TEMPLATES = {
  goal_reminder: {
    icon: '/icons/goal-reminder.png',
    badge: '/icons/badge.png',
    requireInteraction: false,
    actions: [
      { action: 'contribute', title: 'Add Money', icon: '/icons/add-money.png' },
      { action: 'view', title: 'View Goal', icon: '/icons/view.png' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  },
  achievement: {
    icon: '/icons/achievement.png',
    badge: '/icons/badge.png',
    requireInteraction: true,
    actions: [
      { action: 'share', title: 'Share', icon: '/icons/share.png' },
      { action: 'celebrate', title: 'Celebrate', icon: '/icons/celebrate.png' }
    ]
  },
  insight: {
    icon: '/icons/insight.png',
    badge: '/icons/badge.png',
    requireInteraction: false,
    actions: [
      { action: 'view', title: 'View Details', icon: '/icons/view.png' },
      { action: 'implement', title: 'Take Action', icon: '/icons/action.png' }
    ]
  },
  challenge: {
    icon: '/icons/challenge.png',
    badge: '/icons/badge.png',
    requireInteraction: false,
    actions: [
      { action: 'join', title: 'Join Challenge', icon: '/icons/join.png' },
      { action: 'view', title: 'View Details', icon: '/icons/view.png' }
    ]
  },
  cultural_event: {
    icon: '/icons/cultural.png',
    badge: '/icons/badge.png',
    requireInteraction: false,
    actions: [
      { action: 'plan', title: 'Plan Budget', icon: '/icons/plan.png' },
      { action: 'view', title: 'Learn More', icon: '/icons/learn.png' }
    ]
  }
} as const;

// Push notification service
export class PushNotificationService {
  private vapidPublicKey: string;
  private registration: ServiceWorkerRegistration | null = null;
  private subscription: PushSubscription | null = null;

  constructor(vapidPublicKey: string) {
    this.vapidPublicKey = vapidPublicKey;
  }

  // Initialize push notifications
  async initialize(): Promise<boolean> {
    try {
      // Check if service worker is supported
      if (!('serviceWorker' in navigator)) {
        console.warn('Service Worker not supported');
        return false;
      }

      // Check if push messaging is supported
      if (!('PushManager' in window)) {
        console.warn('Push messaging not supported');
        return false;
      }

      // Get service worker registration
      this.registration = await navigator.serviceWorker.ready;
      console.log('Push notifications initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize push notifications:', error);
      return false;
    }
  }

  // Request permission and subscribe
  async requestPermission(): Promise<boolean> {
    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        await this.subscribe();
        return true;
      } else if (permission === 'denied') {
        console.warn('Push notification permission denied');
        return false;
      } else {
        console.warn('Push notification permission not granted');
        return false;
      }
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }

  // Subscribe to push notifications
  async subscribe(): Promise<PushSubscription | null> {
    try {
      if (!this.registration) {
        throw new Error('Service worker not registered');
      }

      // Check if already subscribed
      this.subscription = await this.registration.pushManager.getSubscription();
      
      if (this.subscription) {
        console.log('Already subscribed to push notifications');
        return this.subscription;
      }

      // Subscribe to push notifications
      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
      });

      console.log('Subscribed to push notifications');
      
      // Send subscription to server
      await this.sendSubscriptionToServer(this.subscription);
      
      return this.subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  // Unsubscribe from push notifications
  async unsubscribe(): Promise<boolean> {
    try {
      if (this.subscription) {
        await this.subscription.unsubscribe();
        this.subscription = null;
        
        // Notify server about unsubscription
        await this.removeSubscriptionFromServer();
        
        console.log('Unsubscribed from push notifications');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
      return false;
    }
  }

  // Get current subscription status
  async getSubscription(): Promise<PushSubscription | null> {
    try {
      if (!this.registration) {
        return null;
      }
      
      this.subscription = await this.registration.pushManager.getSubscription();
      return this.subscription;
    } catch (error) {
      console.error('Failed to get push subscription:', error);
      return null;
    }
  }

  // Show local notification
  async showNotification(payload: NotificationPayload): Promise<void> {
    try {
      if (!this.registration) {
        throw new Error('Service worker not registered');
      }

      const template = NOTIFICATION_TEMPLATES[payload.type];
      const options: NotificationOptions = {
        body: payload.body,
        icon: payload.icon || template.icon,
        badge: payload.badge || template.badge,
        image: payload.image,
        data: {
          ...payload.data,
          id: payload.id,
          type: payload.type,
          timestamp: payload.timestamp
        },
        actions: payload.actions || template.actions,
        tag: payload.tag || payload.type,
        requireInteraction: payload.requireInteraction ?? template.requireInteraction,
        silent: payload.silent || false,
        timestamp: payload.timestamp
      };

      await this.registration.showNotification(payload.title, options);
      console.log('Local notification shown:', payload.title);
    } catch (error) {
      console.error('Failed to show notification:', error);
    }
  }

  // Schedule local notification
  scheduleNotification(payload: NotificationPayload, delay: number): void {
    setTimeout(() => {
      this.showNotification(payload);
    }, delay);
  }

  // Handle notification preferences
  async updatePreferences(preferences: NotificationPreferences): Promise<void> {
    try {
      await fetch('/api/notifications/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      });
      
      console.log('Notification preferences updated');
    } catch (error) {
      console.error('Failed to update notification preferences:', error);
    }
  }

  // Send subscription to server
  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
      });
    } catch (error) {
      console.error('Failed to send subscription to server:', error);
    }
  }

  // Remove subscription from server
  private async removeSubscriptionFromServer(): Promise<void> {
    try {
      await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (error) {
      console.error('Failed to remove subscription from server:', error);
    }
  }

  // Convert VAPID key to Uint8Array
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

// Notification preferences interface
export interface NotificationPreferences {
  goalReminders: boolean;
  achievements: boolean;
  insights: boolean;
  challenges: boolean;
  culturalEvents: boolean;
  quietHours: {
    enabled: boolean;
    start: string; // HH:MM format
    end: string;   // HH:MM format
  };
  frequency: 'immediate' | 'daily' | 'weekly';
  sound: boolean;
  vibration: boolean;
}

// Default notification preferences
export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  goalReminders: true,
  achievements: true,
  insights: true,
  challenges: false,
  culturalEvents: true,
  quietHours: {
    enabled: true,
    start: '22:00',
    end: '08:00'
  },
  frequency: 'daily',
  sound: true,
  vibration: true
};

// Notification scheduler for goal reminders
export class NotificationScheduler {
  private pushService: PushNotificationService;

  constructor(pushService: PushNotificationService) {
    this.pushService = pushService;
  }

  // Schedule goal reminder notifications
  scheduleGoalReminders(goals: any[]): void {
    goals.forEach(goal => {
      if (goal.reminderEnabled && goal.reminderFrequency) {
        this.scheduleGoalReminder(goal);
      }
    });
  }

  // Schedule individual goal reminder
  private scheduleGoalReminder(goal: any): void {
    const now = new Date();
    const reminderTime = new Date(goal.nextReminderTime);
    const delay = reminderTime.getTime() - now.getTime();

    if (delay > 0) {
      const notification: NotificationPayload = {
        id: `goal-reminder-${goal.id}`,
        type: 'goal_reminder',
        title: `Goal Reminder: ${goal.title}`,
        body: `You're ${goal.progressPercentage}% towards your ${goal.title} goal. Keep going!`,
        data: { goalId: goal.id },
        timestamp: Date.now()
      };

      this.pushService.scheduleNotification(notification, delay);
    }
  }

  // Schedule achievement notifications
  scheduleAchievementNotification(achievement: any): void {
    const notification: NotificationPayload = {
      id: `achievement-${achievement.id}`,
      type: 'achievement',
      title: '🎉 Achievement Unlocked!',
      body: `Congratulations! You've earned "${achievement.title}"`,
      data: { achievementId: achievement.id },
      timestamp: Date.now()
    };

    this.pushService.showNotification(notification);
  }

  // Schedule AI insight notifications
  scheduleInsightNotification(insight: any): void {
    const notification: NotificationPayload = {
      id: `insight-${insight.id}`,
      type: 'insight',
      title: '💡 Financial Insight',
      body: insight.summary,
      data: { insightId: insight.id },
      timestamp: Date.now()
    };

    this.pushService.showNotification(notification);
  }

  // Schedule cultural event notifications
  scheduleCulturalEventNotification(event: any): void {
    const notification: NotificationPayload = {
      id: `cultural-${event.id}`,
      type: 'cultural_event',
      title: `🇹🇭 ${event.name}`,
      body: `${event.name} is coming up. Plan your budget for traditional expenses.`,
      data: { eventId: event.id },
      timestamp: Date.now()
    };

    // Schedule 3 days before the event
    const eventDate = new Date(event.date);
    const reminderDate = new Date(eventDate.getTime() - (3 * 24 * 60 * 60 * 1000));
    const delay = reminderDate.getTime() - Date.now();

    if (delay > 0) {
      this.pushService.scheduleNotification(notification, delay);
    }
  }
}

// Export utility functions
export function isNotificationSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

export function getNotificationPermission(): NotificationPermission {
  return Notification.permission;
}

export function canShowNotifications(): boolean {
  return isNotificationSupported() && getNotificationPermission() === 'granted';
}

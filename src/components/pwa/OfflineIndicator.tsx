// Offline Indicator - Shows connection status to users
import { useState, useEffect } from 'react';
import { useTranslation } from '../../libs/i18n';
import { AccessibleText } from '../../core';
import { WifiIcon, SignalSlashIcon } from '@heroicons/react/24/outline';

export function OfflineIndicator() {
  const { t } = useTranslation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Show offline message if starting offline
    if (!navigator.onLine) {
      setShowOfflineMessage(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-hide offline message after reconnection
  useEffect(() => {
    if (isOnline && showOfflineMessage) {
      const timer = setTimeout(() => {
        setShowOfflineMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline, showOfflineMessage]);

  if (!showOfflineMessage) return null;

  return (
    <div className={`fixed top-16 left-4 right-4 z-[60] max-w-md mx-auto transition-all duration-300 ${
      showOfflineMessage ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className={`rounded-lg shadow-lg p-3 flex items-center gap-3 ${
        isOnline 
          ? 'bg-green-600 text-white' 
          : 'bg-orange-600 text-white'
      }`}>
        <div className="flex-shrink-0">
          {isOnline ? (
            <WifiIcon className="h-5 w-5" />
          ) : (
            <SignalSlashIcon className="h-5 w-5" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <AccessibleText className="font-medium text-white text-sm">
            {isOnline 
              ? t('pwa.connection.backOnline') 
              : t('pwa.connection.offline')
            }
          </AccessibleText>
          {!isOnline && (
            <AccessibleText className="text-orange-100 text-xs mt-1">
              {t('pwa.connection.offlineDescription')}
            </AccessibleText>
          )}
        </div>
      </div>
    </div>
  );
}

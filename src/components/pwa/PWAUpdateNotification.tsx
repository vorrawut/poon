// PWA Update Notification - Notifies users when app updates are available
import { useState, useEffect } from "react";
import { useTranslation } from "../../libs/i18n";
import { AccessibleButton, AccessibleText } from "../../core";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface PWAUpdateNotificationProps {
  onUpdate?: () => void;
  onDismiss?: () => void;
}

export function PWAUpdateNotification({
  onUpdate,
  onDismiss,
}: PWAUpdateNotificationProps) {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => {
      setIsVisible(true);
    };

    window.addEventListener("sw-update-available", handleUpdateAvailable);
    return () =>
      window.removeEventListener("sw-update-available", handleUpdateAvailable);
  }, []);

  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      // Tell the service worker to skip waiting and activate
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SKIP_WAITING",
        });

        // Wait for the new service worker to be active
        await new Promise((resolve) => {
          navigator.serviceWorker.addEventListener(
            "controllerchange",
            resolve,
            { once: true },
          );
        });

        // Reload the page to get the new version
        window.location.reload();
      }

      onUpdate?.();
    } catch (error) {
      console.error("Failed to update app:", error);
      setIsUpdating(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[70] max-w-md mx-auto">
      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4 flex items-center gap-3">
        <div className="flex-1">
          <AccessibleText className="font-medium text-white">
            {t("pwa.updateAvailable.title")}
          </AccessibleText>
          <AccessibleText className="text-blue-100 text-sm mt-1">
            {t("pwa.updateAvailable.description")}
          </AccessibleText>
        </div>

        <div className="flex items-center gap-2">
          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={handleUpdate}
            disabled={isUpdating}
            className="text-white hover:bg-blue-700 border-blue-400"
          >
            {isUpdating ? (
              <ArrowPathIcon className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowPathIcon className="h-4 w-4" />
            )}
            {t("pwa.updateAvailable.update")}
          </AccessibleButton>

          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-white hover:bg-blue-700 p-1"
            aria-label={t("common.actions.dismiss")}
          >
            <XMarkIcon className="h-4 w-4" />
          </AccessibleButton>
        </div>
      </div>
    </div>
  );
}

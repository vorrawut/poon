// PWA Install Prompt - Encourages users to install the app
import { useState, useEffect } from "react";
import { useTranslation } from "../../libs/i18n";
import { useUIStore } from "../../store/useUIStore";
import { AccessibleButton, AccessibleText, AccessibleCard } from "../../core";
import {
  DevicePhoneMobileIcon,
  XMarkIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const { t } = useTranslation();
  const { viewMode } = useUIStore();
  const isPlayMode = viewMode === "play";

  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();

      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);

      // Check if we should show the install prompt
      const installDismissed = localStorage.getItem("pwa-install-dismissed");
      const lastPromptTime = localStorage.getItem("pwa-last-prompt-time");
      const now = Date.now();
      const dayInMs = 24 * 60 * 60 * 1000;

      // Show prompt if never dismissed or if 7 days have passed since last dismissal
      if (
        !installDismissed ||
        (lastPromptTime && now - parseInt(lastPromptTime) > dayInMs * 7)
      ) {
        // Wait 30 seconds before showing to avoid interrupting user
        setTimeout(() => setShowPrompt(true), 30000);
      }
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setShowPrompt(false);
      localStorage.removeItem("pwa-install-dismissed");
      localStorage.removeItem("pwa-last-prompt-time");
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
        localStorage.setItem("pwa-install-dismissed", "true");
        localStorage.setItem("pwa-last-prompt-time", Date.now().toString());
      }

      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (error) {
      console.error("Error during app installation:", error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem("pwa-install-dismissed", "true");
    localStorage.setItem("pwa-last-prompt-time", Date.now().toString());
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-[60] max-w-sm mx-auto">
      <AccessibleCard
        variant="elevated"
        padding="lg"
        className={`relative ${
          isPlayMode
            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white border-purple-400"
            : "bg-white border-gray-200"
        } shadow-xl`}
      >
        <AccessibleButton
          variant="ghost"
          size="sm"
          onClick={handleDismiss}
          className={`absolute top-2 right-2 ${
            isPlayMode
              ? "text-white hover:bg-white/10"
              : "text-gray-400 hover:bg-gray-100"
          }`}
          aria-label={t("common.actions.dismiss")}
        >
          <XMarkIcon className="h-4 w-4" />
        </AccessibleButton>

        <div className="flex items-start gap-3">
          <div
            className={`p-2 rounded-lg ${
              isPlayMode ? "bg-white/20" : "bg-blue-100"
            }`}
          >
            {isPlayMode ? (
              <SparklesIcon className="h-6 w-6 text-white" />
            ) : (
              <DevicePhoneMobileIcon className="h-6 w-6 text-blue-600" />
            )}
          </div>

          <div className="flex-1">
            <AccessibleText
              className={`font-semibold ${isPlayMode ? "text-white" : "text-gray-900"}`}
            >
              {t("pwa.install.title")}
            </AccessibleText>
            <AccessibleText
              className={`text-sm mt-1 ${isPlayMode ? "text-blue-100" : "text-gray-600"}`}
            >
              {t("pwa.install.description")}
            </AccessibleText>

            <div className="flex gap-2 mt-4">
              <AccessibleButton
                variant={isPlayMode ? "ghost" : "primary"}
                size="sm"
                onClick={handleInstall}
                disabled={isInstalling}
                className={
                  isPlayMode
                    ? "bg-white/20 text-white hover:bg-white/30 border-white/30"
                    : ""
                }
              >
                {isInstalling
                  ? t("pwa.install.installing")
                  : t("pwa.install.install")}
              </AccessibleButton>

              <AccessibleButton
                variant="ghost"
                size="sm"
                onClick={handleDismiss}
                className={
                  isPlayMode
                    ? "text-blue-100 hover:bg-white/10"
                    : "text-gray-600 hover:bg-gray-100"
                }
              >
                {t("pwa.install.later")}
              </AccessibleButton>
            </div>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );
}

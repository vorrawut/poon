// Premium Badge - Shows premium/family status indicators
import { useTranslation } from "../../libs/i18n";
import { useUIStore } from "../../store/useUIStore";
import { useSubscription } from "../../features/subscription";
import { AccessibleText } from "../../core";
import { StarIcon, UserGroupIcon } from "@heroicons/react/24/solid";

interface PremiumBadgeProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function PremiumBadge({
  size = "md",
  showText = true,
  className = "",
}: PremiumBadgeProps) {
  const { t } = useTranslation();
  const { viewMode } = useUIStore();
  const isPlayMode = viewMode === "play";

  const { isPremium, isFamily, isSubscribed } = useSubscription();

  // Don't show for free users
  if (!isSubscribed) return null;

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const getBadgeStyle = () => {
    if (isFamily) {
      return isPlayMode
        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white";
    } else if (isPremium) {
      return isPlayMode
        ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
        : "bg-gradient-to-r from-yellow-500 to-orange-600 text-white";
    }
    return "bg-gray-500 text-white";
  };

  const getIcon = () => {
    if (isFamily) {
      return <UserGroupIcon className={iconSizes[size]} />;
    } else if (isPremium) {
      return <StarIcon className={iconSizes[size]} />;
    }
    return null;
  };

  const getText = () => {
    if (isFamily) return t("premium.plans.family");
    if (isPremium) return t("premium.plans.premium");
    return "";
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full font-medium shadow-sm ${getBadgeStyle()} ${sizeClasses[size]} ${className}`}
    >
      {getIcon()}
      {showText && (
        <AccessibleText className="font-medium">{getText()}</AccessibleText>
      )}
    </div>
  );
}

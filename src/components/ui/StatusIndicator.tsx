import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

interface StatusIndicatorProps {
  status: "success" | "warning" | "error" | "pending";
  label?: string;
  timestamp?: Date;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function StatusIndicator({
  status,
  label,
  timestamp,
  size = "md",
  showLabel = true,
  className = "",
}: StatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: CheckCircleIcon,
          color: "text-green-500",
          bgColor: "bg-green-100",
          text: label || "Synced",
          description: timestamp
            ? `Last updated ${formatTimestamp(timestamp)}`
            : "All data is up to date",
        };
      case "warning":
        return {
          icon: ClockIcon,
          color: "text-orange-500",
          bgColor: "bg-orange-100",
          text: label || "Stale",
          description: timestamp
            ? `Last updated ${formatTimestamp(timestamp)}`
            : "Data might be outdated",
        };
      case "error":
        return {
          icon: ExclamationTriangleIcon,
          color: "text-red-500",
          bgColor: "bg-red-100",
          text: label || "Error",
          description: "Failed to sync data",
        };
      case "pending":
        return {
          icon: ClockIcon,
          color: "text-blue-500",
          bgColor: "bg-blue-100",
          text: label || "Syncing...",
          description: "Updating data...",
        };
      default:
        return {
          icon: ClockIcon,
          color: "text-gray-500",
          bgColor: "bg-gray-100",
          text: "Unknown",
          description: "",
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className={`rounded-full p-1 ${config.bgColor} mr-2`}>
        <IconComponent className={`${sizeClasses[size]} ${config.color}`} />
      </div>
      {showLabel && (
        <div>
          <span className="text-sm font-medium text-gray-700">
            {config.text}
          </span>
          {config.description && (
            <p className="text-xs text-gray-500">{config.description}</p>
          )}
        </div>
      )}
    </div>
  );
}

function formatTimestamp(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return timestamp.toLocaleDateString();
}

interface SyncStatusProps {
  lastSyncAt?: Date;
  isStale?: boolean;
  className?: string;
}

export function SyncStatus({
  lastSyncAt,
  isStale = false,
  className = "",
}: SyncStatusProps) {
  const getStatus = (): "success" | "warning" => {
    if (!lastSyncAt) return "warning";

    const now = new Date();
    const hoursSinceSync =
      (now.getTime() - lastSyncAt.getTime()) / (1000 * 60 * 60);

    // Consider data stale if it's more than 1 hour old
    return hoursSinceSync > 1 || isStale ? "warning" : "success";
  };

  return (
    <StatusIndicator
      status={getStatus()}
      timestamp={lastSyncAt}
      className={className}
    />
  );
}

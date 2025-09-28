import { AnimatedList, FadeIn } from "../../../components/ui";
import { type QuickActionsConfig, type QuickAction } from "../types";
import { quickActionsService } from "../services/quickActionsService";
import { StarIcon } from "@heroicons/react/24/solid";
import { CommandLineIcon } from "@heroicons/react/24/outline";

interface QuickActionsWidgetProps {
  className?: string;
  config?: Partial<QuickActionsConfig>;
  category?: string;
  title?: string;
  description?: string;
}

const defaultConfig: QuickActionsConfig = {
  layout: "grid",
  showLabels: true,
  showDescriptions: false,
  showShortcuts: true,
  maxActions: 6,
};

export function QuickActionsWidget({
  className = "",
  config = {},
  category,
  title = "Quick Actions",
  description = "Common tasks and shortcuts",
}: QuickActionsWidgetProps) {
  const finalConfig = { ...defaultConfig, ...config };
  const actions = category
    ? quickActionsService.getActionsByCategory(category)
    : quickActionsService.getAllActions();
  const displayActions = finalConfig.maxActions
    ? actions.slice(0, finalConfig.maxActions)
    : actions;

  if (displayActions.length === 0) {
    return null;
  }

  const gridColumns =
    finalConfig.layout === "grid"
      ? displayActions.length >= 4
        ? "grid-cols-2 md:grid-cols-4"
        : `grid-cols-${Math.min(displayActions.length, 3)}`
      : "grid-cols-1";

  return (
    <FadeIn direction="up" delay={0.3} className={className}>
      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {finalConfig.showDescriptions && description && (
                <p className="text-gray-600 text-sm mt-1">{description}</p>
              )}
            </div>
            {finalConfig.showShortcuts && (
              <div className="flex items-center space-x-1 text-gray-400">
                <CommandLineIcon className="h-4 w-4" />
                <span className="text-xs">Shortcuts enabled</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="p-6">
          {finalConfig.layout === "list" ? (
            <AnimatedList
              animationType="slideUp"
              stagger={0.05}
              className="space-y-3"
            >
              {displayActions.map((action: QuickAction) => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors text-left group"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`h-10 w-10 rounded-lg ${action.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}
                    >
                      <action.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">
                          {action.label}
                        </span>
                        {action.isPremium && (
                          <StarIcon className="h-4 w-4 text-yellow-400" />
                        )}
                      </div>
                      {action.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {action.description}
                        </p>
                      )}
                    </div>
                  </div>
                  {finalConfig.showShortcuts && action.shortcut && (
                    <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-mono">
                      {action.shortcut}
                    </div>
                  )}
                </button>
              ))}
            </AnimatedList>
          ) : (
            <AnimatedList
              animationType="slideUp"
              stagger={0.1}
              className={`grid ${gridColumns} gap-4`}
            >
              {displayActions.map((action: QuickAction) => (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className="flex flex-col items-center p-6 rounded-xl hover:bg-gray-50 transition-all duration-200 text-center group relative"
                >
                  {action.isPremium && (
                    <div className="absolute top-2 right-2">
                      <StarIcon className="h-4 w-4 text-yellow-400" />
                    </div>
                  )}

                  <div
                    className={`h-14 w-14 rounded-xl ${action.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform mb-4`}
                  >
                    <action.icon className="h-7 w-7" />
                  </div>

                  {finalConfig.showLabels && (
                    <div>
                      <span className="font-medium text-gray-900 text-sm block mb-1">
                        {action.label}
                      </span>
                      {finalConfig.showDescriptions && action.description && (
                        <p className="text-xs text-gray-600 mb-2">
                          {action.description}
                        </p>
                      )}
                      {finalConfig.showShortcuts && action.shortcut && (
                        <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded font-mono">
                          {action.shortcut}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </AnimatedList>
          )}
        </div>

        {/* View All Link */}
        {finalConfig.maxActions && actions.length > finalConfig.maxActions && (
          <div className="px-6 pb-6">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all {actions.length} actions →
            </button>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

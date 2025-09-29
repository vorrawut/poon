// Usage Limit Indicator - Shows usage progress and limits for free tier
import { useTranslation } from '../../libs/i18n';
import { useUIStore } from '../../store/useUIStore';
import { useSubscription } from '../../features/subscription';
import { AccessibleText, AccessibleButton } from '../../core';
import { ExclamationTriangleIcon, StarIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface UsageLimitIndicatorProps {
  feature: string;
  current: number;
  limit: number;
  unit?: string;
  showUpgradeAt?: number; // Show upgrade prompt when usage reaches this percentage
  className?: string;
}

export function UsageLimitIndicator({
  feature,
  current,
  limit,
  unit = '',
  showUpgradeAt = 80,
  className = '',
}: UsageLimitIndicatorProps) {
  const { t } = useTranslation();
  const { viewMode } = useUIStore();
  const navigate = useNavigate();
  const isPlayMode = viewMode === 'play';
  
  const { isPremium, isFamily } = useSubscription();
  
  // Don't show for premium users
  if (isPremium || isFamily) return null;
  
  const usagePercentage = Math.min((current / limit) * 100, 100);
  const shouldShowUpgrade = usagePercentage >= showUpgradeAt;
  const isAtLimit = current >= limit;
  
  const getProgressColor = () => {
    if (isAtLimit) return isPlayMode ? 'bg-red-400' : 'bg-red-500';
    if (shouldShowUpgrade) return isPlayMode ? 'bg-yellow-400' : 'bg-yellow-500';
    return isPlayMode ? 'bg-blue-400' : 'bg-blue-500';
  };
  
  const getBackgroundColor = () => {
    if (isAtLimit) return isPlayMode ? 'bg-red-100' : 'bg-red-50';
    if (shouldShowUpgrade) return isPlayMode ? 'bg-yellow-100' : 'bg-yellow-50';
    return isPlayMode ? 'bg-blue-100' : 'bg-blue-50';
  };

  const handleUpgrade = () => {
    navigate('/subscription');
  };

  return (
    <div className={`${getBackgroundColor()} rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {isAtLimit && (
            <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
          )}
          <AccessibleText 
            className={`text-sm font-medium ${
              isAtLimit ? 'text-red-800' : 
              shouldShowUpgrade ? 'text-yellow-800' : 
              'text-blue-800'
            }`}
          >
            {t(`premium.usage.${feature}`)}: {current}/{limit} {unit}
          </AccessibleText>
        </div>
        
        {shouldShowUpgrade && (
          <AccessibleButton
            variant="ghost"
            size="sm"
            onClick={handleUpgrade}
            className={`text-xs ${
              isAtLimit ? 'text-red-700 hover:bg-red-200' : 'text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            <StarIcon className="h-3 w-3 mr-1" />
            {t('premium.upgrade')}
          </AccessibleButton>
        )}
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-white/50 rounded-full h-2 mb-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
          style={{ width: `${usagePercentage}%` }}
        />
      </div>
      
      {/* Status Message */}
      <AccessibleText 
        className={`text-xs ${
          isAtLimit ? 'text-red-700' : 
          shouldShowUpgrade ? 'text-yellow-700' : 
          'text-blue-700'
        }`}
      >
        {isAtLimit 
          ? t('premium.usage.limitReached', { feature: t(`premium.usage.${feature}`) })
          : shouldShowUpgrade 
            ? t('premium.usage.nearLimit', { 
                remaining: limit - current,
                unit,
                feature: t(`premium.usage.${feature}`)
              })
            : t('premium.usage.available', { 
                remaining: limit - current,
                unit,
                feature: t(`premium.usage.${feature}`)
              })
        }
      </AccessibleText>
    </div>
  );
}

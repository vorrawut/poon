// Premium Feature Gate - Controls access to premium features with upgrade prompts
import type { ReactNode } from 'react';
import { useTranslation } from '../../libs/i18n';
import { useUIStore } from '../../store/useUIStore';
import { useSubscription } from '../../features/subscription';
import { AccessibleButton, AccessibleCard, AccessibleHeading, AccessibleText } from '../../core';
import { StarIcon, LockClosedIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface PremiumFeatureGateProps {
  children: ReactNode;
  feature: string;
  title: string;
  description: string;
  requiredPlan?: 'premium' | 'family';
  showPreview?: boolean;
  previewChildren?: ReactNode;
  className?: string;
}

export function PremiumFeatureGate({
  children,
  feature,
  title,
  description,
  requiredPlan = 'premium',
  showPreview = false,
  previewChildren,
  className = '',
}: PremiumFeatureGateProps) {
  const { t } = useTranslation();
  const { viewMode } = useUIStore();
  const navigate = useNavigate();
  const isPlayMode = viewMode === 'play';
  
  const { hasFeatureAccess, isPremium, isFamily } = useSubscription();
  
  // Check if user has access to this feature
  const hasAccess = hasFeatureAccess(feature);
  
  // If user has access, render children normally
  if (hasAccess) {
    return <>{children}</>;
  }

  // Show upgrade prompt
  const handleUpgrade = () => {
    navigate('/subscription');
  };

  return (
    <div className={`relative ${className}`}>
      {/* Preview content with overlay */}
      {showPreview && previewChildren && (
        <div className="relative">
          <div className="pointer-events-none opacity-50 blur-sm">
            {previewChildren}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>
      )}
      
      {/* Upgrade prompt */}
      <AccessibleCard 
        variant="elevated" 
        padding="lg"
        className={`${showPreview ? 'absolute inset-0 flex items-center justify-center' : ''} ${
          isPlayMode 
            ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white border-purple-400' 
            : 'bg-white border-gray-200'
        } shadow-xl`}
      >
        <div className="text-center max-w-md mx-auto">
          {/* Icon */}
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isPlayMode ? 'bg-white/20' : 'bg-gradient-to-br from-purple-100 to-blue-100'
          }`}>
            {isPlayMode ? (
              <SparklesIcon className="h-8 w-8 text-white" />
            ) : (
              <StarIcon className="h-8 w-8 text-purple-600" />
            )}
          </div>
          
          {/* Content */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <LockClosedIcon className={`h-5 w-5 ${isPlayMode ? 'text-yellow-300' : 'text-amber-500'}`} />
              <AccessibleText 
                className={`text-sm font-medium ${
                  isPlayMode ? 'text-yellow-300' : 'text-amber-600'
                }`}
              >
                {requiredPlan === 'family' ? t('premium.familyFeature') : t('premium.premiumFeature')}
              </AccessibleText>
            </div>
            
            <AccessibleHeading 
              level="h3" 
              className={`mb-2 ${isPlayMode ? 'text-white' : 'text-gray-900'}`}
            >
              {title}
            </AccessibleHeading>
            
            <AccessibleText 
              className={isPlayMode ? 'text-blue-100' : 'text-gray-600'}
            >
              {description}
            </AccessibleText>
          </div>
          
          {/* Benefits */}
          <div className={`text-left mb-6 p-4 rounded-lg ${
            isPlayMode ? 'bg-white/10' : 'bg-gray-50'
          }`}>
            <AccessibleText 
              className={`font-medium mb-2 ${isPlayMode ? 'text-white' : 'text-gray-900'}`}
            >
              {t('premium.upgradeToUnlock')}:
            </AccessibleText>
            <ul className="space-y-1 text-sm">
              <li className={`flex items-center gap-2 ${isPlayMode ? 'text-blue-100' : 'text-gray-600'}`}>
                <span className={isPlayMode ? 'text-green-300' : 'text-green-500'}>✓</span>
                {t('premium.benefits.unlimitedGoals')}
              </li>
              <li className={`flex items-center gap-2 ${isPlayMode ? 'text-blue-100' : 'text-gray-600'}`}>
                <span className={isPlayMode ? 'text-green-300' : 'text-green-500'}>✓</span>
                {t('premium.benefits.advancedAI')}
              </li>
              <li className={`flex items-center gap-2 ${isPlayMode ? 'text-blue-100' : 'text-gray-600'}`}>
                <span className={isPlayMode ? 'text-green-300' : 'text-green-500'}>✓</span>
                {t('premium.benefits.prioritySupport')}
              </li>
              {requiredPlan === 'family' && (
                <li className={`flex items-center gap-2 ${isPlayMode ? 'text-blue-100' : 'text-gray-600'}`}>
                  <span className={isPlayMode ? 'text-green-300' : 'text-green-500'}>✓</span>
                  {t('premium.benefits.familySharing')}
                </li>
              )}
            </ul>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <AccessibleButton
              variant={isPlayMode ? "ghost" : "primary"}
              onClick={handleUpgrade}
              className={`flex items-center justify-center gap-2 ${
                isPlayMode 
                  ? 'bg-white text-purple-600 hover:bg-gray-100 border-white' 
                  : ''
              }`}
            >
              <StarIcon className="h-4 w-4" />
              {t('premium.upgradeNow')}
            </AccessibleButton>
            
            <AccessibleButton
              variant="ghost"
              onClick={() => navigate('/subscription')}
              className={isPlayMode ? 'text-blue-100 hover:bg-white/10 border-white/30' : 'text-gray-600'}
            >
              {t('premium.comparePlans')}
            </AccessibleButton>
          </div>
          
          {/* Current plan indicator */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <AccessibleText 
              className={`text-xs ${isPlayMode ? 'text-blue-200' : 'text-gray-500'}`}
            >
              {t('premium.currentPlan')}: {
                isFamily ? t('premium.plans.family') : 
                isPremium ? t('premium.plans.premium') : 
                t('premium.plans.free')
              }
            </AccessibleText>
          </div>
        </div>
      </AccessibleCard>
    </div>
  );
}

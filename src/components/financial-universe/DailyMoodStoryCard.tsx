import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FinancialStory {
  id: string;
  emoji: string;
  title: string;
  story: string;
  mood: 'excellent' | 'good' | 'neutral' | 'caution' | 'concern';
  tip?: string;
  celebration?: string;
}

interface DailyMoodStoryCardProps {
  netWorth: number;
  netWorthChange: number;
  monthlySpending: number;
  spendingChange: number;
  savingsRate: number;
  topSpendingCategory: string;
  className?: string;
}

export function DailyMoodStoryCard({
  netWorth,
  netWorthChange,
  monthlySpending,
  spendingChange,
  savingsRate,
  topSpendingCategory,
  className = ''
}: DailyMoodStoryCardProps) {
  const [currentStory, setCurrentStory] = useState<FinancialStory | null>(null);
  const [mascotAnimation, setMascotAnimation] = useState('idle');

  useEffect(() => {
    const story = generateDailyStory({
      netWorth,
      netWorthChange,
      monthlySpending,
      spendingChange,
      savingsRate,
      topSpendingCategory,
    });
    setCurrentStory(story);
    setMascotAnimation(story.mood === 'excellent' ? 'celebrate' : 'happy');
  }, [netWorth, netWorthChange, monthlySpending, spendingChange, savingsRate, topSpendingCategory]);

  const generateDailyStory = (data: {
    netWorth: number;
    netWorthChange: number;
    monthlySpending: number;
    spendingChange: number;
    savingsRate: number;
    topSpendingCategory: string;
  }): FinancialStory => {
    const stories: FinancialStory[] = [];

    // Excellent mood stories (significant positive changes)
    if (data.netWorthChange > 5000) {
      stories.push({
        id: 'wealth_boost',
        emoji: '🚀',
        title: 'Wealth Rocket Launch!',
        story: `Your net worth jumped by $${(data.netWorthChange / 1000).toFixed(1)}K! That's like finding a treasure chest in your backyard. 💰`,
        mood: 'excellent',
        celebration: 'You\'re building wealth faster than a superhero saves the day!',
      });
    }

    if (data.savingsRate > 30) {
      stories.push({
        id: 'savings_hero',
        emoji: '🦸‍♀️',
        title: 'Savings Superhero!',
        story: `You saved ${data.savingsRate.toFixed(1)}% of your income! That's like being a financial superhero with the power of delayed gratification. 🦸‍♂️`,
        mood: 'excellent',
        celebration: 'Keep up this amazing discipline!',
      });
    }

    // Good mood stories (positive trends)
    if (data.netWorthChange > 1000) {
      stories.push({
        id: 'steady_growth',
        emoji: '🌱',
        title: 'Growing Like a Champion!',
        story: `Your wealth grew by $${(data.netWorthChange / 1000).toFixed(1)}K this period. Like tending a garden, your consistent efforts are blooming! 🌻`,
        mood: 'good',
        tip: 'Small, consistent growth often beats big, risky moves.',
      });
    }

    if (data.spendingChange < -10) {
      stories.push({
        id: 'spending_wisdom',
        emoji: '🧠',
        title: 'Smart Spending Mode!',
        story: `You cut spending by ${Math.abs(data.spendingChange).toFixed(1)}%! That's like finding money you already earned twice. 🔍💵`,
        mood: 'good',
        tip: 'Every dollar you don\'t spend is a dollar that can grow.',
      });
    }

    // Neutral stories (stable situations)
    if (Math.abs(data.netWorthChange) < 1000) {
      const categoryStories = {
        'food': `You spent the most on food this month 🍜. Maybe you discovered a new favorite restaurant? Life's too short for bad meals!`,
        'transport': `Transportation took the biggest slice 🚗. Whether it's gas or rideshares, you're staying mobile and that's important!`,
        'entertainment': `Entertainment was your top category 🎬. You're investing in experiences and joy - that's wealth for the soul!`,
        'shopping': `Shopping led your spending 🛍️. Sometimes we need things, sometimes we want things - both are part of life!`,
        'groceries': `Groceries topped your spending 🛒. Feeding yourself well is literally investing in your future health!`,
      };

      stories.push({
        id: 'category_insight',
        emoji: '📊',
        title: 'Steady as She Goes!',
        story: categoryStories[data.topSpendingCategory as keyof typeof categoryStories] || 
               `Your money stayed pretty steady this month. Sometimes consistency is the most powerful strategy! 🎯`,
        mood: 'neutral',
        tip: 'Stability in finances often beats dramatic swings.',
      });
    }

    // Caution stories (gentle warnings)
    if (data.spendingChange > 15 && data.spendingChange < 30) {
      stories.push({
        id: 'spending_uptick',
        emoji: '👀',
        title: 'Spending on the Rise!',
        story: `Your spending increased by ${data.spendingChange.toFixed(1)}% this month. Like a plant growing faster in spring - sometimes natural cycles happen! 🌿`,
        mood: 'caution',
        tip: 'Keep an eye on it, but don\'t stress. You\'ve got this!',
      });
    }

    if (data.savingsRate < 10 && data.savingsRate > 0) {
      stories.push({
        id: 'savings_opportunity',
        emoji: '🎯',
        title: 'Savings Adventure Awaits!',
        story: `You saved ${data.savingsRate.toFixed(1)}% this month. Even small saves add up - like collecting coins in a video game! 🪙`,
        mood: 'caution',
        tip: 'Every percentage point counts toward your future self.',
      });
    }

    // Concern stories (need attention but stay positive)
    if (data.netWorthChange < -2000) {
      stories.push({
        id: 'temporary_dip',
        emoji: '🌊',
        title: 'Riding the Wave!',
        story: `Your net worth dipped by $${Math.abs(data.netWorthChange / 1000).toFixed(1)}K. Like ocean waves, financial ups and downs are natural cycles. 🌊`,
        mood: 'concern',
        tip: 'Focus on what you can control: spending and saving habits.',
      });
    }

    if (data.spendingChange > 30) {
      stories.push({
        id: 'spending_spike',
        emoji: '🎢',
        title: 'Spending Roller Coaster!',
        story: `Spending jumped ${data.spendingChange.toFixed(1)}% this month! Like a theme park ride, sometimes life has unexpected thrills. 🎢`,
        mood: 'concern',
        tip: 'Review your biggest expenses - some might be one-time events.',
      });
    }

    // Default story if no conditions are met
    if (stories.length === 0) {
      stories.push({
        id: 'default_positive',
        emoji: '⭐',
        title: 'Financial Journey Continues!',
        story: `Every day you manage your money is a win! Like a traveler on a long journey, you're making progress step by step. 🗺️`,
        mood: 'good',
        tip: 'The fact that you\'re tracking your finances puts you ahead of most people!',
      });
    }

    // Return a random story from the applicable ones
    return stories[Math.floor(Math.random() * stories.length)];
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'excellent': return 'from-green-400 to-emerald-500';
      case 'good': return 'from-blue-400 to-cyan-500';
      case 'neutral': return 'from-gray-400 to-slate-500';
      case 'caution': return 'from-yellow-400 to-amber-500';
      case 'concern': return 'from-orange-400 to-red-500';
      default: return 'from-blue-400 to-cyan-500';
    }
  };

  const getMascotEmoji = (mood: string, animation: string) => {
    if (animation === 'celebrate') return '🎉';
    switch (mood) {
      case 'excellent': return '😍';
      case 'good': return '😊';
      case 'neutral': return '🤔';
      case 'caution': return '🧐';
      case 'concern': return '🤗';
      default: return '😊';
    }
  };

  if (!currentStory) {
    return (
      <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStory.id}
        className={`bg-white rounded-2xl overflow-hidden shadow-xl ${className}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with mood gradient */}
        <div className={`bg-gradient-to-r ${getMoodColor(currentStory.mood)} p-6 text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <motion.div
                className="text-4xl mr-4"
                animate={mascotAnimation === 'celebrate' ? {
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                } : {
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: mascotAnimation === 'celebrate' ? 0.8 : 2,
                  repeat: Infinity,
                }}
              >
                {currentStory.emoji}
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold">{currentStory.title}</h3>
                <div className="flex items-center mt-1">
                  <span className="text-2xl mr-2">
                    {getMascotEmoji(currentStory.mood, mascotAnimation)}
                  </span>
                  <span className="text-white/90 capitalize">{currentStory.mood} mood</span>
                </div>
              </div>
            </div>
            
            {/* Today's date */}
            <div className="text-right text-white/80">
              <div className="text-sm">Today</div>
              <div className="font-bold">
                {new Date().toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Story content */}
        <div className="p-6">
          <motion.p
            className="text-lg text-gray-700 mb-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {currentStory.story}
          </motion.p>

          {/* Celebration message */}
          {currentStory.celebration && (
            <motion.div
              className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center">
                <span className="text-2xl mr-3">🎉</span>
                <p className="text-green-800 font-medium">{currentStory.celebration}</p>
              </div>
            </motion.div>
          )}

          {/* Tip */}
          {currentStory.tip && (
            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-lg p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start">
                <span className="text-xl mr-3 mt-0.5">💡</span>
                <p className="text-blue-800 text-sm">{currentStory.tip}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Action buttons */}
        <div className="px-6 pb-6">
          <div className="flex justify-between items-center">
            <motion.button
              className="text-gray-500 hover:text-gray-700 text-sm font-medium flex items-center"
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                // Generate a new story
                const newStory = generateDailyStory({
                  netWorth,
                  netWorthChange,
                  monthlySpending,
                  spendingChange,
                  savingsRate,
                  topSpendingCategory,
                });
                setCurrentStory(newStory);
              }}
            >
              <span className="mr-1">🔄</span>
              New Story
            </motion.button>
            
            <motion.button
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">❤️</span>
              Love it
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

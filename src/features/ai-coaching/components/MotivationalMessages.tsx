import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThemeAwareCard,
  ThemeAwareText,
  ThemeAwareButton,
  ThemeAwareHeading,
} from "../../../core";
import { cn } from "../../../libs/utils";
import {
  mockMessages,
  type MotivationalMessage,
} from "../../../../mockData/features/ai-coaching";

export interface MotivationalMessagesProps {
  messages?: MotivationalMessage[];
  onMessageDismiss?: (messageId: string) => void;
  className?: string;
}

// Re-export the type for other components
export type { MotivationalMessage } from "../../../../mockData/features/ai-coaching";

export function MotivationalMessages({
  messages = mockMessages,
  onMessageDismiss: _onMessageDismiss,
  className,
}: MotivationalMessagesProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "positive":
        return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20";
      case "inspiring":
        return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20";
      case "neutral":
        return "text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20";
      default:
        return "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "encouraging":
        return "💪";
      case "celebratory":
        return "🎉";
      case "motivational":
        return "🚀";
      case "educational":
        return "📚";
      default:
        return "💡";
    }
  };

  const nextMessage = () => {
    setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
  };

  const previousMessage = () => {
    setCurrentMessageIndex(
      (prev) => (prev - 1 + messages.length) % messages.length,
    );
  };

  if (messages.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        <ThemeAwareCard variant="outlined" padding="lg">
          <div className="text-center">
            <div className="text-4xl mb-2">💬</div>
            <ThemeAwareText color="secondary">
              No motivational messages available right now.
            </ThemeAwareText>
          </div>
        </ThemeAwareCard>
      </div>
    );
  }

  const currentMessage = messages[currentMessageIndex];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center">
        <ThemeAwareHeading level="h3" className="mb-2">
          Daily Motivation
        </ThemeAwareHeading>
        <ThemeAwareText color="secondary">
          AI-powered encouragement for your financial journey
        </ThemeAwareText>
      </div>

      {/* Message Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMessage.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ThemeAwareCard variant="elevated" padding="lg">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{getTypeIcon(currentMessage.type)}</div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-3">
                  <ThemeAwareHeading level="h4">
                    {currentMessage.title.en}
                  </ThemeAwareHeading>
                  <span
                    className={cn(
                      "text-xs font-medium px-2 py-1 rounded-full",
                      getMoodColor(currentMessage.mood),
                    )}
                  >
                    {currentMessage.mood}
                  </span>
                </div>

                <ThemeAwareText className="mb-4 text-lg leading-relaxed">
                  {currentMessage.message.en}
                </ThemeAwareText>

                <ThemeAwareText className="mb-4 text-sm italic opacity-80">
                  {currentMessage.message.th}
                </ThemeAwareText>

                {currentMessage.culturalWisdom && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 mb-4">
                    <ThemeAwareText className="font-medium mb-1">
                      💭 Cultural Wisdom
                    </ThemeAwareText>
                    <ThemeAwareText variant="caption">
                      {currentMessage.culturalWisdom.en}
                    </ThemeAwareText>
                    <ThemeAwareText
                      variant="caption"
                      className="block mt-1 italic"
                    >
                      {currentMessage.culturalWisdom.th}
                    </ThemeAwareText>
                  </div>
                )}

                {currentMessage.actionSuggestion && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                    <ThemeAwareText className="font-medium mb-1">
                      🎯 Action Suggestion
                    </ThemeAwareText>
                    <ThemeAwareText variant="caption">
                      {currentMessage.actionSuggestion.en}
                    </ThemeAwareText>
                    <ThemeAwareText
                      variant="caption"
                      className="block mt-1 italic"
                    >
                      {currentMessage.actionSuggestion.th}
                    </ThemeAwareText>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <ThemeAwareText variant="caption" color="secondary">
                    {new Date(currentMessage.timestamp).toLocaleDateString(
                      "th-TH",
                    )}
                  </ThemeAwareText>

                  <div className="flex items-center space-x-2">
                    <ThemeAwareText variant="caption" color="secondary">
                      {currentMessageIndex + 1} of {messages.length}
                    </ThemeAwareText>
                  </div>
                </div>
              </div>
            </div>
          </ThemeAwareCard>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {messages.length > 1 && (
        <div className="flex items-center justify-center space-x-4">
          <ThemeAwareButton
            variant="outline"
            size="sm"
            onClick={previousMessage}
            disabled={messages.length <= 1}
          >
            ← Previous
          </ThemeAwareButton>

          <div className="flex space-x-1">
            {messages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentMessageIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentMessageIndex
                    ? "bg-blue-600"
                    : "bg-gray-300 dark:bg-gray-600",
                )}
              />
            ))}
          </div>

          <ThemeAwareButton
            variant="outline"
            size="sm"
            onClick={nextMessage}
            disabled={messages.length <= 1}
          >
            Next →
          </ThemeAwareButton>
        </div>
      )}

      {/* Dismiss Button */}
      <div className="text-center">
        <ThemeAwareButton
          variant="ghost"
          size="sm"
          onClick={() => _onMessageDismiss?.(currentMessage.id)}
        >
          Dismiss Message
        </ThemeAwareButton>
      </div>
    </div>
  );
}

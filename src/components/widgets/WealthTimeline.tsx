import { motion } from "framer-motion";

interface TimelineEvent {
  year: number;
  event: string;
  icon: string;
  amount: number;
  projected?: boolean;
}

interface WealthTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function WealthTimeline({ 
  events, 
  title = "Your Wealth Journey",
  subtitle = "Scrollable animated timeline of your portfolio growth — like flipping through a storybook of your wealth journey.",
  className = "" 
}: WealthTimelineProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          <span className="mr-3">🕰</span>
          {title}
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        
        <div className="space-y-16">
          {events.map((event, index) => (
            <motion.div
              key={event.year}
              className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <motion.div
                  className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 ${event.projected ? 'border-yellow-400/40 bg-yellow-400/5' : ''}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{event.icon}</div>
                    <div>
                      <h3 className={`text-xl font-bold ${event.projected ? 'text-yellow-300' : 'text-white'}`}>
                        {event.year} {event.projected && '(Projected)'}
                      </h3>
                      <p className="text-white/70">{event.event}</p>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold ${event.projected ? 'text-yellow-400' : 'text-green-400'}`}>
                    {formatCurrency(event.amount)}
                  </div>
                </motion.div>
              </div>
              
              {/* Timeline Node */}
              <div className="relative z-10">
                <motion.div
                  className={`w-6 h-6 rounded-full border-4 ${
                    event.projected 
                      ? 'bg-yellow-400 border-yellow-300' 
                      : 'bg-white border-blue-400'
                  }`}
                  animate={event.projected ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(255, 215, 0, 0.4)",
                      "0 0 0 20px rgba(255, 215, 0, 0)",
                      "0 0 0 0 rgba(255, 215, 0, 0)"
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <div className="flex-1"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

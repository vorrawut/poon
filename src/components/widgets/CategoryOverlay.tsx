import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryDetailView } from "./CategoryDetailView";

interface CategoryOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  categories: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
    value: number;
    performance: number;
    allocation: number;
  }>;
  categoryData: Record<string, any>;
  viewMode?: "play" | "clarity";
}

export function CategoryOverlay({
  isOpen,
  onClose,
  initialCategory,
  categories,
  categoryData,
  viewMode = "play",
}: CategoryOverlayProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || categories[0]?.id,
  );

  const currentCategoryIndex = categories.findIndex(
    (cat) => cat.id === selectedCategory,
  );
  const currentCategory = categories[currentCategoryIndex];

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const navigateCategory = (direction: "prev" | "next") => {
    const currentIndex = categories.findIndex(
      (cat) => cat.id === selectedCategory,
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
    } else {
      newIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedCategory(categories[newIndex].id);
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Overlay Container */}
          <motion.div
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 flex flex-col"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with Category Tabs */}
            <div
              className={`rounded-t-2xl border-b ${
                viewMode === "play"
                  ? "bg-white/10 backdrop-blur-md border-white/20"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Top Bar with Close Button */}
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="text-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    🌌
                  </motion.div>
                  <div>
                    <h2
                      className={`text-xl font-bold ${
                        viewMode === "play" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Portfolio Explorer
                    </h2>
                    <p
                      className={`text-sm ${
                        viewMode === "play" ? "text-white/70" : "text-gray-600"
                      }`}
                    >
                      Navigate between your asset categories
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === "play"
                      ? "hover:bg-white/10 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Category Navigation Tabs */}
              <div className="flex items-center justify-between p-4">
                {/* Previous Button */}
                <button
                  onClick={() => navigateCategory("prev")}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === "play"
                      ? "hover:bg-white/10 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                  {categories.map((category) => {
                    const isActive = category.id === selectedCategory;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`relative flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                          isActive
                            ? viewMode === "play"
                              ? "bg-white/20 text-white border border-white/30"
                              : "bg-blue-50 text-blue-600 border border-blue-200"
                            : viewMode === "play"
                              ? "hover:bg-white/10 text-white/70"
                              : "hover:bg-gray-50 text-gray-600"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <div className="text-left">
                          <div className="text-sm font-semibold">
                            {category.name}
                          </div>
                          <div className="text-xs opacity-70">
                            {formatCurrency(category.value)}
                          </div>
                        </div>

                        {/* Performance Indicator */}
                        <div
                          className={`text-xs font-bold ${
                            category.performance >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {category.performance >= 0 ? "+" : ""}
                          {category.performance}%
                        </div>

                        {/* Active Indicator */}
                        {isActive && (
                          <motion.div
                            className="absolute -bottom-1 left-1/2 w-2 h-2 bg-blue-400 rounded-full"
                            layoutId="activeTab"
                            initial={false}
                            style={{ x: "-50%" }}
                          />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => navigateCategory("next")}
                  className={`p-2 rounded-full transition-colors ${
                    viewMode === "play"
                      ? "hover:bg-white/10 text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Current Category Summary */}
              {currentCategory && (
                <motion.div
                  className="px-6 pb-4"
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                        style={{
                          backgroundColor: `${currentCategory.color}20`,
                        }}
                      >
                        {currentCategory.icon}
                      </div>
                      <div>
                        <h3
                          className={`text-lg font-bold ${
                            viewMode === "play" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {currentCategory.name}
                        </h3>
                        <p
                          className={`text-sm ${
                            viewMode === "play"
                              ? "text-white/70"
                              : "text-gray-600"
                          }`}
                        >
                          {currentCategory.allocation}% of portfolio
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          viewMode === "play" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {formatCurrency(currentCategory.value)}
                      </div>
                      <div
                        className={`text-sm font-semibold ${
                          currentCategory.performance >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {currentCategory.performance >= 0 ? "+" : ""}
                        {currentCategory.performance}% today
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Content Area */}
            <div
              className={`flex-1 rounded-b-2xl overflow-hidden ${
                viewMode === "play"
                  ? "bg-white/10 backdrop-blur-md"
                  : "bg-white"
              }`}
            >
              <div className="h-full overflow-y-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <CategoryDetailView
                      category={selectedCategory as any}
                      data={categoryData[selectedCategory] || {}}
                      viewMode={viewMode}
                      className="p-6"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Navigation Footer */}
            <div
              className={`rounded-b-2xl border-t p-4 ${
                viewMode === "play"
                  ? "bg-white/5 backdrop-blur-md border-white/10"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex justify-center gap-2">
                {categories.map((category, index) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      category.id === selectedCategory
                        ? "bg-blue-400 w-6"
                        : viewMode === "play"
                          ? "bg-white/30 hover:bg-white/50"
                          : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

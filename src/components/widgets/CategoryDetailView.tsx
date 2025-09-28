import { motion } from "framer-motion";

interface CategoryDetailViewProps {
  category: "stocks" | "crypto" | "cash" | "real_estate" | "funds";
  data: any;
  viewMode?: "play" | "clarity";
  className?: string;
}

export function CategoryDetailView({
  category,
  data,
  viewMode = "play",
  className = "",
}: CategoryDetailViewProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const renderStocksView = () => (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-3xl mb-2">📈</div>
          <div
            className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            {formatCurrency(data.totalValue)}
          </div>
          <div
            className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
          >
            Total Stock Value
          </div>
        </motion.div>

        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-3xl mb-2">
            {data.todayChange >= 0 ? "📈" : "📉"}
          </div>
          <div
            className={`text-2xl font-bold ${data.todayChange >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {data.todayChange >= 0 ? "+" : ""}
            {formatCurrency(data.todayChange)}
          </div>
          <div
            className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
          >
            Today's Change
          </div>
        </motion.div>

        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-3xl mb-2">🎯</div>
          <div
            className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            {data.allocation}%
          </div>
          <div
            className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
          >
            Portfolio Allocation
          </div>
        </motion.div>

        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-3xl mb-2">🏢</div>
          <div
            className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            {data.holdings?.length || 0}
          </div>
          <div
            className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
          >
            Stock Holdings
          </div>
        </motion.div>
      </div>

      {/* Holdings List */}
      <div
        className={`rounded-xl border ${
          viewMode === "play"
            ? "bg-white/10 backdrop-blur-sm border-white/20"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h3
            className={`text-xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            📊 Your Stock Holdings
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {data.holdings?.map((stock: any, index: number) => (
            <motion.div
              key={stock.ticker}
              className={`flex items-center justify-between p-4 rounded-lg ${
                viewMode === "play" ? "bg-white/5" : "bg-gray-50"
              } cursor-pointer hover:scale-[1.02] transition-transform`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {stock.ticker.slice(0, 2)}
                </div>
                <div>
                  <div
                    className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                  >
                    {stock.name}
                  </div>
                  <div
                    className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                  >
                    {stock.ticker} • {stock.units} shares
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                >
                  {formatCurrency(stock.value)}
                </div>
                <div
                  className={`text-sm font-medium ${stock.change >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {stock.change >= 0 ? "+" : ""}
                  {stock.change.toFixed(2)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCryptoView = () => (
    <div className="space-y-8">
      {/* Crypto Header with Volatility Meter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-3xl mb-2">🪙</div>
          <div
            className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            {formatCurrency(data.totalValue)}
          </div>
          <div
            className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
          >
            Total Crypto Value
          </div>
        </motion.div>

        {/* Volatility Speedometer */}
        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div
              className={`text-lg font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
            >
              {data.volatility > 0.7
                ? "Wild"
                : data.volatility > 0.4
                  ? "Medium"
                  : "Calm"}
            </div>
            <div
              className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
            >
              Volatility Level
            </div>

            {/* Volatility bar */}
            <div
              className={`mt-3 w-full h-2 rounded-full ${viewMode === "play" ? "bg-white/10" : "bg-gray-200"}`}
            >
              <motion.div
                className={`h-2 rounded-full ${
                  data.volatility > 0.7
                    ? "bg-red-500"
                    : data.volatility > 0.4
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${data.volatility * 100}%` }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-3xl mb-2">🎲</div>
          <div
            className={`text-2xl font-bold ${data.todayChange >= 0 ? "text-green-400" : "text-red-400"}`}
          >
            {data.todayChange >= 0 ? "+" : ""}
            {data.todayChange.toFixed(1)}%
          </div>
          <div
            className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
          >
            24h Change
          </div>
        </motion.div>
      </div>

      {/* Crypto Holdings with 3D Coin Effect */}
      <div
        className={`rounded-xl border ${
          viewMode === "play"
            ? "bg-white/10 backdrop-blur-sm border-white/20"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h3
            className={`text-xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            🪙 Your Crypto Portfolio
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {data.holdings?.map((coin: any, index: number) => (
            <motion.div
              key={coin.symbol}
              className={`flex items-center justify-between p-4 rounded-lg ${
                viewMode === "play" ? "bg-white/5" : "bg-gray-50"
              } cursor-pointer`}
              initial={{ opacity: 0, rotateY: -90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
            >
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  {coin.symbol.slice(0, 1)}
                </motion.div>
                <div>
                  <div
                    className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                  >
                    {coin.name}
                  </div>
                  <div
                    className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                  >
                    {coin.symbol} • {coin.units.toFixed(4)} coins
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                >
                  {formatCurrency(coin.value)}
                </div>
                <div
                  className={`text-sm font-medium ${coin.change >= 0 ? "text-green-400" : "text-red-400"}`}
                >
                  {coin.change >= 0 ? "+" : ""}
                  {coin.change.toFixed(2)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCashView = () => (
    <div className="space-y-8">
      {/* Cash Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-3xl mb-2">💰</div>
          <div
            className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            {formatCurrency(data.totalCash)}
          </div>
          <div
            className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
          >
            Total Cash & Savings
          </div>
        </motion.div>

        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-3xl mb-2">🛡️</div>
          <div
            className={`text-2xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            {data.emergencyFundMonths}
          </div>
          <div
            className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
          >
            Months of Expenses
          </div>
        </motion.div>

        <motion.div
          className={`p-6 rounded-xl border ${
            viewMode === "play"
              ? "bg-white/10 backdrop-blur-sm border-white/20"
              : "bg-white border-gray-200"
          }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-3xl mb-2">📈</div>
          <div className={`text-2xl font-bold text-green-400`}>
            {data.interestRate}%
          </div>
          <div
            className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
          >
            Avg Interest Rate
          </div>
        </motion.div>
      </div>

      {/* Emergency Fund Progress */}
      <motion.div
        className={`p-6 rounded-xl border ${
          viewMode === "play"
            ? "bg-white/10 backdrop-blur-sm border-white/20"
            : "bg-white border-gray-200"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3
          className={`text-xl font-bold mb-4 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
        >
          🛡️ Emergency Fund Progress
        </h3>

        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div
              className={`flex justify-between mb-2 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
            >
              <span>Progress to 6-month goal</span>
              <span className="font-bold">
                {Math.min(100, (data.emergencyFundMonths / 6) * 100).toFixed(0)}
                %
              </span>
            </div>
            <div
              className={`w-full h-4 rounded-full ${viewMode === "play" ? "bg-white/10" : "bg-gray-200"}`}
            >
              <motion.div
                className="h-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(100, (data.emergencyFundMonths / 6) * 100)}%`,
                }}
                transition={{ duration: 2 }}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(34, 197, 94, 0.4))",
                }}
              />
            </div>
          </div>

          <motion.div
            className="text-4xl"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {data.emergencyFundMonths >= 6 ? "🎉" : "💪"}
          </motion.div>
        </div>
      </motion.div>

      {/* Bank Accounts */}
      <div
        className={`rounded-xl border ${
          viewMode === "play"
            ? "bg-white/10 backdrop-blur-sm border-white/20"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <h3
            className={`text-xl font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
          >
            🏦 Your Bank Accounts
          </h3>
        </div>
        <div className="p-6 space-y-4">
          {data.accounts?.map((account: any, index: number) => (
            <motion.div
              key={account.id}
              className={`flex items-center justify-between p-4 rounded-lg ${
                viewMode === "play" ? "bg-white/5" : "bg-gray-50"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                  🏦
                </div>
                <div>
                  <div
                    className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                  >
                    {account.name}
                  </div>
                  <div
                    className={`text-sm ${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
                  >
                    {account.type} • {account.interestRate}% APY
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-bold ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
                >
                  {formatCurrency(account.balance)}
                </div>
                <div className="text-sm text-green-400">
                  +{formatCurrency(account.monthlyInterest)} interest
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (category) {
      case "stocks":
        return renderStocksView();
      case "crypto":
        return renderCryptoView();
      case "cash":
        return renderCashView();
      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h3
              className={`text-xl font-bold mb-2 ${viewMode === "play" ? "text-white" : "text-gray-900"}`}
            >
              Coming Soon!
            </h3>
            <p
              className={`${viewMode === "play" ? "text-white/70" : "text-gray-600"}`}
            >
              This category view is under construction.
            </p>
          </div>
        );
    }
  };

  return <div className={`${className}`}>{renderContent()}</div>;
}

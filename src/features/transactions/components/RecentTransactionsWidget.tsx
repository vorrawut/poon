import { useState, useEffect } from "react";
import { AnimatedList, FadeIn } from "../../../components/ui";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { transactionsService } from "../services/transactionsService";
import { type Transaction } from "../types";

interface RecentTransactionsWidgetProps {
  className?: string;
  limit?: number;
  onTransactionClick?: (transaction: Transaction) => void;
  onViewAllClick?: () => void;
}

export function RecentTransactionsWidget({
  className = "",
  limit = 5,
  onTransactionClick,
  onViewAllClick,
}: RecentTransactionsWidgetProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await transactionsService.fetchTransactions(limit);
        setTransactions(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch transactions",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [limit]);

  if (loading) {
    return (
      <div
        className={`bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden ${className}`}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between animate-pulse"
            >
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-gray-200 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-xl p-6 ${className}`}
      >
        <div className="text-red-600 font-medium mb-2">
          Failed to load transactions
        </div>
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date || !(date instanceof Date)) {
      return "N/A";
    }

    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<
      string,
      React.ComponentType<{ className?: string }>
    > = {
      income: ArrowUpIcon,
      transfer: ArrowUpIcon,
      default: ArrowDownIcon,
    };
    const IconComponent = iconMap[category] || iconMap.default;
    return IconComponent;
  };

  const getCategoryColor = (type: "debit" | "credit", category: string) => {
    if (type === "credit" || category === "income" || category === "transfer") {
      return "bg-green-100 text-green-600";
    }
    return "bg-gray-100 text-gray-600";
  };

  return (
    <FadeIn direction="left" delay={0.6} className={className}>
      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h3>
            <button
              onClick={onViewAllClick}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ClockIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p>No recent transactions</p>
              <p className="text-sm mt-2">
                Transactions will appear here once you sync your accounts
              </p>
            </div>
          ) : (
            <AnimatedList
              animationType="slideUp"
              stagger={0.1}
              className="space-y-4"
            >
              {transactions.map((transaction) => {
                const IconComponent = getCategoryIcon(transaction.category);
                const colorClass = getCategoryColor(
                  transaction.type,
                  transaction.category,
                );

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onTransactionClick?.(transaction)}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-12 w-12 rounded-xl flex items-center justify-center ${colorClass}`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {transaction.merchant || transaction.description}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <span className="capitalize">
                            {transaction.category}
                          </span>
                          {transaction.location && (
                            <>
                              <span>•</span>
                              <span>{transaction.location}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-semibold text-sm ${
                          transaction.type === "credit"
                            ? "text-green-600"
                            : "text-gray-900"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(transaction.posted_at)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </AnimatedList>
          )}
        </div>
      </div>
    </FadeIn>
  );
}

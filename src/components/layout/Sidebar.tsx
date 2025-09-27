import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import { useUIStore } from "../../store/useUIStore";
import {
  HomeIcon,
  BanknotesIcon,
  ChartPieIcon,
  CreditCardIcon,
  DocumentArrowUpIcon,
  Cog6ToothIcon,
  XMarkIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Universe", href: "/", icon: GlobeAltIcon },
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Accounts", href: "/accounts", icon: BanknotesIcon },
  { name: "Portfolio", href: "/portfolio", icon: ChartPieIcon },
  { name: "Spending", href: "/spending", icon: CreditCardIcon },
  { name: "Import", href: "/imports", icon: DocumentArrowUpIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

export function Sidebar() {
  const {
    sidebarOpen,
    sidebarCollapsed,
    isMobile,
    setSidebarOpen,
    setSidebarCollapsed,
  } = useUIStore();

  const isVisible = isMobile ? sidebarOpen : true;
  const isCollapsed = !isMobile && sidebarCollapsed;

  return (
    <div
      className={clsx(
        "flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
        isVisible ? "translate-x-0" : "-translate-x-full",
        isMobile
          ? "fixed inset-y-0 left-0 z-50 w-64"
          : isCollapsed
            ? "w-16"
            : "w-64",
      )}
    >
      {/* Logo & Brand */}
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold text-gray-900">Poon</h1>
              <p className="text-xs text-gray-500">Personal Finance</p>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        )}

        {/* Desktop collapse button */}
        {!isMobile && (
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="ml-auto p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              clsx(
                "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary-50 text-primary-700 border-r-2 border-primary-600"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                isCollapsed && "justify-center",
              )
            }
            title={isCollapsed ? item.name : undefined}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && <span className="ml-3">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-200">
        <div
          className={clsx(
            "flex items-center",
            isCollapsed ? "justify-center" : "space-x-3",
          )}
        >
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-700">DU</span>
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-medium text-gray-900">Demo User</p>
              <p className="text-xs text-gray-500">demo@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

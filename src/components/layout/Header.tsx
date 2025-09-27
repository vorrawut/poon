import { useLocation } from 'react-router-dom';
import { useUIStore } from '../../store/useUIStore';
import { Button } from '../ui/Button';
import { 
  Bars3Icon,
  PlusIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

const pageTitle: Record<string, string> = {
  '/': 'Dashboard',
  '/accounts': 'Accounts',
  '/portfolio': 'Portfolio',
  '/spending': 'Spending',
  '/imports': 'Import Data',
  '/settings': 'Settings',
};

export function Header() {
  const location = useLocation();
  const { isMobile, toggleSidebar, openModal } = useUIStore();
  
  const title = pageTitle[location.pathname] || 'Dashboard';

  const handleQuickAction = () => {
    // Quick add transaction
    openModal('addTransaction');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          )}

          {/* Page title */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Quick add button */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleQuickAction}
            className="flex items-center space-x-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Add Transaction</span>
          </Button>

          {/* Notifications */}
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 relative">
            <BellIcon className="h-6 w-6" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Theme toggle */}
          <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

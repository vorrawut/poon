// Navigation Mock Data

import {
  HomeIcon,
  BanknotesIcon,
  ChartPieIcon,
  CreditCardIcon,
  DocumentArrowUpIcon,
  Cog6ToothIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  ClockIcon,
  RocketLaunchIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const navigationItems: NavigationItem[] = [
  { name: "Universe", href: "/", icon: GlobeAltIcon },
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Accounts", href: "/accounts", icon: BanknotesIcon },
  { name: "Portfolio", href: "/portfolio", icon: ChartPieIcon },
  { name: "Money Flow", href: "/money-flow", icon: CurrencyDollarIcon },
  { name: "Time Machine", href: "/time-machine", icon: ClockIcon },
  { name: "Future", href: "/future", icon: RocketLaunchIcon },
  { name: "Thai Culture", href: "/thai-culture", icon: HeartIcon },
  { name: "Spending", href: "/spending", icon: CreditCardIcon },
  { name: "Import", href: "/imports", icon: DocumentArrowUpIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

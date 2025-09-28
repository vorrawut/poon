import { BrowserRouter as Router } from "react-router-dom";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <Router>{children}</Router>;
}

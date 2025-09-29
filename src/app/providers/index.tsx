import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Router>
      <ThemeProvider>{children}</ThemeProvider>
    </Router>
  );
}

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./ThemeProvider";
import { I18nProvider } from "../../libs/i18n";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Router>
      <I18nProvider defaultLanguage="en">
        <ThemeProvider>{children}</ThemeProvider>
      </I18nProvider>
    </Router>
  );
}

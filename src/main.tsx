import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  // Temporarily disabling StrictMode to debug loading issues
  // <StrictMode>
    <App />
  // </StrictMode>,
);

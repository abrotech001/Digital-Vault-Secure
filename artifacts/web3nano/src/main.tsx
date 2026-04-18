import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { I18nProvider } from "@/lib/i18n"; // 1. Import the provider

createRoot(document.getElementById("root")!).render(
  // 2. Wrap your App component
  <I18nProvider>
    <App />
  </I18nProvider>
);

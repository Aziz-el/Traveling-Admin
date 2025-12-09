
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";
  import { BrowserRouter } from "react-router";
import { ErrorBoundary } from './../shared/components/ErrorBoundary';

  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary >
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ErrorBoundary>
  );
  
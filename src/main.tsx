import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css";
import App from "./App.tsx";
import { LoaderProvider } from "./context/LoaderContext.tsx";
import { ProfileProvider } from "./context/ProfileContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { LevelProvider } from "./context/LevelContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <LoaderProvider>
        <ProfileProvider>
          <LevelProvider>
            <App />
          </LevelProvider>
        </ProfileProvider>
      </LoaderProvider>
    </AuthProvider>
  </StrictMode>
);

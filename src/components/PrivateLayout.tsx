import { useEffect, type ReactNode } from "react";
import ActionButton from "./ActionButton";
import "../styles/AppLayout.css";
import { useProfile } from "../context/ProfileContext";
import AppNavbar from "./AppNavbar";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  const { loadProfile, hasLoaded } = useProfile();
  useEffect(() => {
    if (!hasLoaded) {
      loadProfile();
    }
  }, [hasLoaded, loadProfile]);

  return (
    <div className="app-layout">
      <AppNavbar />

      <main className="main-content container-fluid position-relative">
        {children}
      </main>
      <div className="action-section">
        <ActionButton />
      </div>
    </div>
  );
}

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Loader from "../components/Loader";

type LoaderContextType = {
  showLoader: () => void;
  hideLoader: () => void;
};

const LoaderContext = createContext<LoaderContextType | null>(null);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        showLoader: () => setLoading(true),
        hideLoader: () => setLoading(false),
      }}
    >
      {loading && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }
  return context;
}

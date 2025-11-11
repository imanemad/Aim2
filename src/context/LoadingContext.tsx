"use client";
import Logo from "@/components/icons/Logo";
import Loader from "@/components/ui/Loader";
import { useState, useContext, createContext } from "react";

const LoadingContext = createContext({
  isLoading: false,
  showLoader: () => {},
  hideLoader: () => {},
});

export const LoadingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = () => setIsLoading(true);
  const hideLoader = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
      {isLoading && (
        <Loader/>
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

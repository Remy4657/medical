"use client";
import { useEffect, type ReactNode } from "react";
import { themeChange } from "theme-change";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function Layout({ children }: { children: ReactNode }) {
  // themeChange();

  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default Layout;

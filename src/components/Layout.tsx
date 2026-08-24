"use client";
import { useEffect, type ReactNode } from "react";
import { themeChange } from "theme-change";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartProvider } from "./cart/CartProvider";

const queryClient = new QueryClient();

function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider />

      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default Layout;

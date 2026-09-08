"use client";
import { useEffect, type ReactNode } from "react";
import { themeChange } from "theme-change";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartProvider } from "./cart/CartProvider";
import { Toaster } from "sonner";
import ModalAddToCart from "./modal/ModalAddToCart";
import ModalLogin from "./modal/ModalLogin";
import ScrollToTop from "./ScrollToTop";
import ModalLogout from "./modal/ModalLogout";

const queryClient = new QueryClient();

function Layout({ children }: { children: ReactNode }) {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider />

      {children}
      <ScrollToTop />
      <ModalLogin />
      <ModalLogout />
      <ModalAddToCart />
      <Toaster
        position="top-right"
        theme="light"
        toastOptions={{
          classNames: {
            description: "!text-red-900",
            success: "!text-green-600",
            info: "!text-yellow-600",
            error: "!text-red-600",
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default Layout;

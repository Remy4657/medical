"use client";
import { useEffect, type ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { themeChange } from "theme-change";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Layout({ children }: { children: ReactNode }) {
  // themeChange();

  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-svh flex-col text-base-content">
        <Navbar />

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-10">
          {children}
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  );
}
export default Layout;

"use client";

import type { ReactNode } from "react";
import { CartProvider } from "@/context/CartProvider";
import { ToastProvider } from "@/context/ToastProvider";
import { UIProvider } from "@/context/UIProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        <UIProvider>{children}</UIProvider>
      </CartProvider>
    </ToastProvider>
  );
}
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import CartDrawer from "@/components/CartDrawer";
import CartFloatingBar from "@/components/CartFloatingBar";
import SearchOverlay from "@/components/SearchOverlay";
import MobileBottomNav from "@/components/MobileBottomNav";

type UIContextValue = {
  openCart: () => void;
  openSearch: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const openCart = useCallback(() => setCartOpen(true), []);
  const openSearch = useCallback(() => setSearchOpen(true), []);

  const value: UIContextValue = { openCart, openSearch };

  return (
    <UIContext.Provider value={value}>
      {children}
      <CartFloatingBar onOpen={openCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileBottomNav onOpenCart={openCart} onOpenSearch={openSearch} />
    </UIContext.Provider>
  );
}

export function useUI(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI deve ser usado dentro de <UIProvider>");
  return ctx;
}
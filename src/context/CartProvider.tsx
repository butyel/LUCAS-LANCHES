"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  cartReducer,
  CART_STORAGE_KEY,
  type CartInput,
  type CartState,
} from "@/lib/cart";

type CartContextValue = {
  state: CartState;
  hydrated: boolean;
  add: (input: CartInput) => void;
  remove: (key: string) => void;
  setQty: (key: string, quantity: number) => void;
  clear: () => void;
};

const initialState: CartState = { items: [], subtotal: 0, count: 0 };

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (Array.isArray(parsed.items)) {
          loaded.current = true;
          const entries = parsed.items.filter((l) => l && l.productId);
          for (const line of entries) {
            dispatch({
              type: "ADD",
              input: {
                productId: line.productId,
                name: line.name,
                unitPrice: line.unitPrice,
                variation: line.variation,
                addons: line.addons ?? [],
                notes: line.notes,
                quantity: line.quantity,
              },
            });
          }
        }
      }
    } catch {
      /* localStorage indisponível -> ignora */
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* sem persistência */
    }
  }, [state, hydrated]);

  const value: CartContextValue = {
    state,
    hydrated,
    add: (input) => dispatch({ type: "ADD", input }),
    remove: (key) => dispatch({ type: "REMOVE", key }),
    setQty: (key, quantity) => dispatch({ type: "SET_QTY", key, quantity }),
    clear: () => dispatch({ type: "CLEAR" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart deve ser usado dentro de <CartProvider>");
  }
  return ctx;
}
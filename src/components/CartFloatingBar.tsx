"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartProvider";
import { formatPrice } from "@/lib/site";
import { cn } from "@/lib/utils";
import { IconBag } from "./icons";

type CartFloatingBarProps = {
  onOpen: () => void;
};

export default function CartFloatingBar({ onOpen }: CartFloatingBarProps) {
  const { state, hydrated } = useCart();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    setShown(true);
  }, [hydrated]);

  const visible = shown && state.count > 0;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-20 z-[60] px-4 transition-all duration-300 md:hidden",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <button
        type="button"
        onClick={onOpen}
        className="pointer-events-auto flex w-full items-center justify-between gap-3 rounded-full bg-brand-red px-5 py-3.5 text-white shadow-cta transition-transform active:scale-[0.98]"
        aria-label={`Ver pedido: ${state.count} itens, ${formatPrice(state.subtotal)}`}
      >
        <span className="flex items-center gap-2.5">
          <span className="relative">
            <IconBag className="h-6 w-6" />
            <span className="absolute -right-2 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-ink px-1 text-[11px] font-bold">
              {state.count}
            </span>
          </span>
          <span className="text-sm font-bold">
            {state.count} {state.count === 1 ? "item" : "itens"}
          </span>
        </span>
        <span className="text-sm font-bold">
          {formatPrice(state.subtotal)} · Ver pedido
        </span>
      </button>
    </div>
  );
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "@/context/CartProvider";
import { useToast } from "@/context/ToastProvider";
import { lineTotal, type CartLine } from "@/lib/cart";
import { formatPrice, buildWhatsAppOrder } from "@/lib/site";
import Image from "next/image";
import { cn } from "@/lib/utils";
import QuantitySelector from "./QuantitySelector";
import { cardapio } from "@/lib/menu";
import { track } from "@/lib/analytics";
import {
  IconClose,
  IconMinus,
  IconWhatsApp,
  IconTruck,
  IconBag,
  IconArrowRight,
} from "./icons";
import Link from "next/link";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

function itemImage(item: CartLine): string {
  return (
    cardapio.find((i) => i.id === item.productId)?.imagem ??
    "/images/menu-placeholder.svg"
  );
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { state, add, remove, setQty, clear } = useCart();
  const { toast } = useToast();
  const [pickup, setPickup] = useState(false);
  const roomRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open, onClose]);

  const checkoutUrl = useMemo(() => {
    const items = state.items.map((l) => ({
      name: l.name,
      qty: l.quantity,
      price: l.unitPrice,
      variation: l.variation,
      notes: l.notes,
      addons: l.addons.map((a) => ({ name: a.nome, price: a.preco })),
    }));
    return buildWhatsAppOrder(items, { pickup });
  }, [state.items, pickup]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[80]",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <aside
        ref={roomRef}
        role="dialog"
        aria-modal="true"
        aria-label="Seu pedido"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 sm:border-l sm:border-brand-line",
          "bottom-0 top-auto h-[92dvh] sm:top-0 sm:h-full",
          open
            ? "translate-y-0 sm:translate-x-0"
            : "translate-y-full sm:translate-y-0 sm:translate-x-full"
        )}
      >
        <header className="flex items-center justify-between border-b border-brand-line px-5 py-4">
          <div className="flex items-center gap-2">
            <IconBag className="h-5 w-5 text-brand-red" />
            <h2 className="font-block text-xl font-bold uppercase tracking-tight text-brand-ink">
              Seu pedido
            </h2>
            {state.count > 0 && (
              <span className="rounded-full bg-brand-sand px-2 py-0.5 text-xs font-bold text-brand-ink/70">
                {state.count}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="flex h-11 w-11 items-center justify-center rounded-full text-brand-ink transition-colors hover:bg-brand-sand"
          >
            <IconClose className="h-5 w-5" />
          </button>
        </header>

        {state.items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-sand text-4xl">
              🍔
            </span>
            <p className="font-block text-2xl font-bold uppercase text-brand-ink">
              Sua fome ainda não chegou aqui
            </p>
            <p className="max-w-xs text-sm text-brand-ink/60">
              Escolha um lanche do cardápio e monte seu pedido.
            </p>
            <Link
              href="/cardapio"
              onClick={onClose}
              className="btn-red px-6 py-3 text-sm"
            >
              Ver cardápio
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
              {state.items.map((line) => (
                <article
                  key={line.key}
                  className="flex gap-3 rounded-xl border border-brand-line bg-white p-2.5"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-brand-sand">
                    <Image
                      src={itemImage(line)}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-bold leading-tight text-brand-ink">
                        {line.name} {line.variation && <span className="text-brand-ink/50">· {line.variation}</span>}
                      </h3>
                      <button
                        type="button"
                        onClick={() => {
                          remove(line.key);
                          toast(`${line.name} removido`);
                        }}
                        aria-label={`Remover ${line.name}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-ink/40 transition-colors hover:bg-brand-sand hover:text-brand-red"
                      >
                        <IconClose className="h-4 w-4" />
                      </button>
                    </div>
                    {line.addons.length > 0 && (
                      <p className="mt-0.5 text-xs text-brand-ink/60">
                        {line.addons.map((a) => a.nome).join(", ")}
                      </p>
                    )}
                    {line.notes && (
                      <p className="mt-0.5 text-xs italic text-brand-ink/50">
                        Obs: {line.notes}
                      </p>
                    )}
                    <div className="mt-auto flex items-end justify-between gap-2 pt-2">
                      <QuantitySelector
                        value={line.quantity}
                        onChange={(n) => setQty(line.key, n)}
                        size="sm"
                      />
                      <span className="font-bold text-brand-red">
                        {formatPrice(lineTotal(line))}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="shrink-0 space-y-3 border-t border-brand-line bg-brand-cream px-4 py-4 sm:px-5">
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setPickup(false)}
                  aria-pressed={!pickup}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-bold transition-colors",
                    !pickup
                      ? "border-brand-red bg-brand-red text-white"
                      : "border-brand-line bg-white text-brand-ink"
                  )}
                >
                  <IconTruck className="h-4 w-4" /> Entrega
                </button>
                <button
                  type="button"
                  onClick={() => setPickup(true)}
                  aria-pressed={pickup}
                  className={cn(
                    "flex flex-1 items-center justify-center gap-2 rounded-full border-2 py-3 text-sm font-bold transition-colors",
                    pickup
                      ? "border-brand-red bg-brand-red text-white"
                      : "border-brand-line bg-white text-brand-ink"
                  )}
                >
                  <IconBag className="h-4 w-4" /> Retirada
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-ink/60">Subtotal</span>
                <span className="font-bold text-brand-ink">
                  {formatPrice(state.subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-brand-ink/60">Taxa de entrega</span>
                <span className="font-bold text-brand-ink/70">
                  {pickup ? "Retirada grátis" : "A consultar"}
                </span>
              </div>

              <a
                href={checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("begin_checkout", { currency: "BRL", value: state.subtotal });
                  track("click_whatsapp", { value: state.subtotal });
                }}
                className="btn-red w-full py-3.5 text-base"
                aria-label="Finalizar pedido pelo WhatsApp"
              >
                <IconWhatsApp className="h-5 w-5" />
                Finalizar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
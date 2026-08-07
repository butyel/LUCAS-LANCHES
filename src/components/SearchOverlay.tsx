"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { cardapio, categories, supportsAcrescimos } from "@/lib/menu";
import { basePrice, maxPrice } from "@/lib/menu";
import type { MenuItem } from "@/lib/menu";
import { formatPrice } from "@/lib/site";
import { useCart } from "@/context/CartProvider";
import { useToast } from "@/context/ToastProvider";
import { buildCartInput } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { IconClose, IconSearch, IconArrowRight, IconPlus } from "./icons";
import Link from "next/link";
import ProductSheet from "./ProductSheet";

type SearchOverlayProps = {
  open: boolean;
  onClose: () => void;
};

function quickAddable(item: MenuItem) {
  return !item.options && !supportsAcrescimos(item);
}

export default function SearchOverlay({
  open,
  onClose,
}: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [focusItem, setFocusItem] = useState<MenuItem | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { add } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setQuery("");
      const t = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
    setFocusItem(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return cardapio.slice(0, 8);
    return cardapio.filter(
      (i) =>
        i.nome.toLowerCase().includes(needle) ||
        i.descricao.toLowerCase().includes(needle) ||
        i.categoriaNome.toLowerCase().includes(needle)
    );
  }, [query]);

  const quickAdd = (item: MenuItem) => {
    add(buildCartInput(item, { quantity: 1 }));
    toast(`1x ${item.nome} adicionado`);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[85] bg-brand-cream",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "flex h-full w-full flex-col transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
      >
        <header className="sticky top-0 z-10 border-b border-brand-line bg-white px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              aria-label="Voltar"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-ink transition-colors hover:bg-brand-sand"
            >
              <IconArrowRight className="hidden" aria-hidden="true" />
              <span className="text-2xl leading-none">←</span>
            </button>
            <div className="relative flex-1">
              <span className="sr-only">Buscar no cardápio</span>
              <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-ink/45" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="O que você está com vontade de comer?"
                className="w-full rounded-full border-2 border-brand-line bg-brand-cream py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand-red"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5">
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-brand-ink/50" aria-live="polite">
            {query.trim()
              ? `${results.length} resultado${results.length === 1 ? "" : "s"}`
              : "Sugestões"}
          </p>

          {results.length === 0 ? (
            <div className="mt-14 flex flex-col items-center gap-3 text-center">
              <p className="font-block text-2xl font-bold uppercase text-brand-ink">
                Nenhum lanche encontrado
              </p>
              <p className="text-sm text-brand-ink/60">
                Tente buscar por bacon, frango, calabresa ou ovo.
              </p>
              <Link onClick={onClose} href="/cardapio#lanches" className="btn-red px-6 py-3 text-sm">
                Ver todos os lanches
              </Link>
            </div>
          ) : (
            <ul className="space-y-3">
              {results.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center gap-3 rounded-2xl border border-brand-line bg-white p-2.5">
                    <button
                      type="button"
                      onClick={() => setFocusItem(item)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                      aria-label={`Ver ${item.nome}`}
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-brand-sand">
                        <Image
                          src={item.imagem}
                          alt=""
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-bold text-brand-ink">{item.nome}</p>
                        <p className="line-clamp-1 text-xs text-brand-ink/60">
                          {item.descricao}
                        </p>
                        <p className="mt-0.5 font-bold text-brand-red">
                          {formatPrice(item.options ? basePrice(item) : item.preco ?? 0)}
                          {item.options && maxPrice(item) > basePrice(item)
                            ? ` - ${formatPrice(maxPrice(item))}`
                            : ""}
                        </p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        quickAddable(item) ? quickAdd(item) : setFocusItem(item)
                      }
                      aria-label={`Adicionar ${item.nome}`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-red text-white transition-transform active:scale-90"
                    >
                      <IconPlus className="h-5 w-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ProductSheet item={focusItem} onClose={() => setFocusItem(null)} />
    </div>
  );
}
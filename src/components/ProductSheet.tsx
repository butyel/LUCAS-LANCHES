"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { MenuItem } from "@/lib/menu";
import { supportsAcrescimos } from "@/lib/menu";
import { acrescimos } from "@/lib/menu";
import { formatPrice } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartProvider";
import { useToast } from "@/context/ToastProvider";
import { buildCartInput } from "@/lib/cart";
import { track } from "@/lib/analytics";
import QuantitySelector from "./QuantitySelector";
import {
  IconClose,
  IconCheck,
  IconWhatsApp,
  IconBag,
} from "./icons";

type ProductSheetProps = {
  item: MenuItem | null;
  onClose: () => void;
};

export default function ProductSheet({ item, onClose }: ProductSheetProps) {
  const session = Date.now();
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);
  const [addons, setAddons] = useState<Set<string>>(new Set());
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const { add } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    if (!item) return;
    setQty(1);
    setNotes("");
    setOptionIndex(0);
    setAddons(new Set());
    const t = window.setTimeout(() => closeBtnRef.current?.focus(), 40);
    return () => window.clearTimeout(t);
  }, [item, session]);

  useEffect(() => {
    if (!item) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [item, onClose]);

  const variation =
    item && item.options && item.options.length
      ? item.options[optionIndex]
      : undefined;
  const price = variation ? variation.preco : item?.preco ?? 0;

  const selectedAddons = useMemo(
    () =>
      Array.from(addons)
        .map((id) => acrescimos.find((a) => a.id === id))
        .filter((a) => a !== undefined),
    [addons]
  );
  const addonsTotal = selectedAddons.reduce((s, a) => s + (a!.preco ?? 0), 0);
  const unitTotal = price + addonsTotal;
  const total = unitTotal * qty;
  const acceptsAddons = item ? supportsAcrescimos(item) : false;

  if (!item) return null;

  const toggleAddon = (id: string) => {
    setAddons((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAdd = () => {
    const input = buildCartInput(item, {
      optionIndex,
      notes,
      quantity: qty,
    });
    input.addons = (input.addons ?? []).map((a) => a);
    add({
      ...input,
      addons: selectedAddons.map((a) => ({ id: a!.id, nome: a!.nome, preco: a!.preco })),
    });
    toast(`${qty}x ${item.nome} adicionado`);
    track("add_to_cart", { item_id: item.id, currency: "BRL", value: total, quantity: qty });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.nome}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className="relative z-10 flex max-h-[92dvh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl animate-sheet-in"
      >
        {/* Imagem de destaque */}
        <div className="relative shrink-0 overflow-hidden bg-brand-sand">
          <Image
            src={item.imagem}
            alt={item.nome}
            width={640}
            height={420}
            className="mx-auto aspect-[4/3] w-full object-cover"
            sizes="(max-width: 768px) 100vw, 448px"
          />
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow hover:bg-white"
          >
            <IconClose className="h-5 w-5" />
          </button>
          <span className="absolute left-3 top-3 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
            {item.categoriaNome}
          </span>
        </div>

        {/* Conteúdo rolável */}
        <div className="flex flex-1 flex-col overflow-y-auto overscroll-contain p-5 sm:p-6">
          <h2 className="text-2xl font-block font-bold uppercase leading-tight tracking-tight text-brand-ink">
            {item.nome}
          </h2>
          <div className="mt-1 flex items-baseline justify-between gap-3">
            <span className="price-lg">{formatPrice(unitTotal)}</span>
            <span className="text-sm text-brand-ink/60">
              {qty === 1 ? "por unidade" : `total: ${formatPrice(total)}`}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">
            {item.descricao}
          </p>

          {item.options && item.options.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-ink/60">
                Escolha a opção
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {item.options.map((opt, i) => (
                  <button
                    key={opt.nome}
                    type="button"
                    onClick={() => setOptionIndex(i)}
                    aria-pressed={optionIndex === i}
                    className={cn(
                      "flex items-center justify-between gap-1 rounded-xl border-2 px-3 py-2.5 text-left text-[13px] font-semibold transition-colors",
                      optionIndex === i
                        ? "border-brand-red bg-brand-red text-white"
                        : "border-brand-line bg-white text-brand-ink hover:border-brand-green"
                    )}
                  >
                    <span>{opt.nome}</span>
                    <span className="shrink-0 font-bold">
                      {formatPrice(opt.preco)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {acceptsAddons && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-ink/60">
                Acréscimos
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {acrescimos.map((a) => {
                  const active = addons.has(a.id);
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAddon(a.id)}
                      aria-pressed={active}
                      className={cn(
                        "flex items-center justify-between gap-1 rounded-xl border-2 px-3 py-2.5 text-left text-[13px] font-semibold transition-colors",
                        active
                          ? "border-brand-green bg-brand-green text-white"
                          : "border-brand-line bg-white text-brand-ink hover:border-brand-green"
                      )}
                    >
                      <span className="flex items-center gap-2">
                        <IconCheck
                          className={cn(
                            "h-3.5 w-3.5",
                            active ? "text-white" : "text-transparent"
                          )}
                        />
                        {a.nome}
                      </span>
                      <span className="shrink-0 text-[12px] font-bold opacity-80">
                        +{formatPrice(a.preco)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-6">
            <label
              htmlFor={`product-notes-${item.id}`}
              className="block text-xs font-bold uppercase tracking-wide text-brand-ink/60"
            >
              Alguma observação?
            </label>
            <input
              id={`product-notes-${item.id}`}
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex.: sem milho"
              maxLength={120}
              className="mt-1.5 w-full rounded-lg border border-brand-line bg-brand-cream px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand-red"
            />
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-ink/60">
              Quantidade
            </span>
            <QuantitySelector value={qty} onChange={setQty} />
          </div>
        </div>

        {/* Rodapé fixo */}
        <div className="shrink-0 border-t border-brand-line bg-brand-cream px-4 py-4 sm:px-5">
          <div className="mb-3 flex items-center justify-between">
            <span
              className="text-sm font-bold uppercase tracking-wide text-brand-ink/70"
              aria-live="polite"
            >
              Total
            </span>
            <span className="price-lg" aria-live="polite">
              {formatPrice(total)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="btn-red w-full py-3.5 text-base"
            aria-label={`Adicionar ${qty}x ${item.nome} ao pedido`}
          >
            <IconBag className="h-5 w-5" />
            Adicionar ao pedido · {formatPrice(total)}
          </button>
          <p className="mt-2 flex items-center justify-center gap-1 text-center text-xs text-brand-ink/50">
            <IconWhatsApp className="h-3.5 w-3.5" />
            Você revisa tudo no carrinho antes de finalizar.
          </p>
        </div>
      </div>
    </div>
  );
}
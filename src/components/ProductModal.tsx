"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { MenuItem } from "@/lib/menu";
import { getBadges } from "@/lib/menu";
import { formatPrice, buildWhatsAppOrder } from "@/lib/site";
import { cn } from "@/lib/utils";
import { IconClose, IconMinus, IconPlus, IconWhatsApp } from "./icons";

type ProductModalProps = {
  item: MenuItem | null;
  onClose: () => void;
};

export default function ProductModal({ item, onClose }: ProductModalProps) {
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");
  const [pickup, setPickup] = useState(false);

  useEffect(() => {
    if (item) {
      setQty(1);
      setNotes("");
      setPickup(false);
    }
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  const price = item ? item.precoPromo ?? item.preco : 0;
  const total = price * qty;
  const badges = item ? getBadges(item) : [];

  const orderLink = useMemo(() => {
    if (!item) return "#";
    return buildWhatsAppOrder(
      [{ name: item.nome, qty, price, notes: notes.trim() || undefined }],
      { pickup }
    );
  }, [item, qty, notes, pickup]);

  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.nome}
      className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl animate-fade-up">
        <div className="relative overflow-hidden bg-brand-sand">
          <Image
            src={item.imagem}
            alt={item.nome}
            width={640}
            height={400}
            className="mx-auto aspect-[16/10] w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow hover:bg-white"
          >
            <IconClose className="h-5 w-5" />
          </button>
          {badges[0] && (
            <span className="absolute left-3 top-3 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold uppercase text-white">
              {badges[0]}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-2xl font-bold uppercase leading-tight tracking-tight text-brand-ink">
              {item.nome}
            </h2>
            <span className="shrink-0 rounded-full bg-brand-sand px-2.5 py-1 text-[11px] font-bold uppercase text-brand-green">
              {item.categoriaNome}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">
            {item.descricao}
          </p>

          <label className="mt-5 block">
            <span className="text-xs font-bold uppercase tracking-wide text-brand-ink/60">
              Observações
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: ponto da carne, sem cebola..."
              rows={2}
              className="mt-1.5 w-full resize-none rounded-lg border border-brand-line bg-brand-cream px-3 py-2.5 text-sm outline-none focus:border-brand-red"
            />
          </label>

          <fieldset className="mt-5">
            <legend className="text-xs font-bold uppercase tracking-wide text-brand-ink/60">
              Como prefere receber
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPickup(false)}
                aria-pressed={!pickup}
                className={cn(
                  "rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition-colors",
                  !pickup
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-brand-line bg-white text-brand-ink"
                )}
              >
                Entrega
              </button>
              <button
                type="button"
                onClick={() => setPickup(true)}
                aria-pressed={pickup}
                className={cn(
                  "rounded-xl border-2 px-3 py-2.5 text-sm font-bold transition-colors",
                  pickup
                    ? "border-brand-red bg-brand-red text-white"
                    : "border-brand-line bg-white text-brand-ink"
                )}
              >
                Retirada
              </button>
            </div>
          </fieldset>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-ink/60">
              Quantidade
            </span>
            <div className="flex items-center gap-3 rounded-full border border-brand-line p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-sand text-brand-ink transition-colors hover:bg-brand-green hover:text-white"
              >
                <IconMinus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center font-bold" aria-live="polite">
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Aumentar quantidade"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-white transition-colors hover:bg-brand-redDark"
              >
                <IconPlus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-line bg-brand-cream p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wide text-brand-ink/70">
              Total
            </span>
            <span className="price-lg">{formatPrice(total)}</span>
          </div>
          <a
            href={orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp w-full py-3.5 text-base"
            onClick={onClose}
            aria-label={`Pedir ${qty}x ${item.nome} pelo WhatsApp`}
          >
            <IconWhatsApp className="h-5 w-5" />
            Adicionar ao pedido
          </a>
          <p className="mt-2 text-center text-xs text-brand-ink/50">
            Você será direcionado ao WhatsApp com o pedido montado.
          </p>
        </div>
      </div>
    </div>
  );
}
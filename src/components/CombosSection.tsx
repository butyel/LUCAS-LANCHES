"use client";

import { useState } from "react";
import Image from "next/image";
import { combos } from "@/lib/menu";
import type { MenuItem } from "@/lib/menu";
import { formatPrice } from "@/lib/site";
import ProductModal from "./ProductModal";
import { IconArrowRight } from "./icons";

export default function CombosSection() {
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <section
      aria-labelledby="combos-title"
      className="bg-brand-cream py-16 sm:py-20"
    >
      <div className="container-site">
        <div className="mb-10">
          <p className="section-kicker">Mais por menos</p>
          <h2 id="combos-title" className="section-title mt-1">
            Combos e ofertas
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {combos.map((combo) => (
            <article
              key={combo.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-line transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover sm:flex-row"
            >
              <div className="relative h-44 shrink-0 sm:h-auto sm:w-2/5">
                <Image
                  src={combo.imagem}
                  alt={combo.nome}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-flex w-fit rounded-full bg-brand-green px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Combos
                </span>
                <h3 className="mt-3 text-2xl font-bold uppercase leading-tight tracking-tight text-brand-ink">
                  {combo.nome}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-ink/70">
                  {combo.descricao}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="price-lg">{formatPrice(combo.preco ?? 0)}</span>
                  <button
                    type="button"
                    onClick={() => setSelected(combo)}
                    className="btn-dark px-5 py-2.5 text-sm"
                    aria-label={`Quero o ${combo.nome}`}
                  >
                    Quero esse
                    <IconArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
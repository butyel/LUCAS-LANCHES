"use client";

import { useState } from "react";
import Image from "next/image";
import { combos } from "@/lib/menu";
import type { MenuItem } from "@/lib/menu";
import { formatPrice } from "@/lib/site";
import ProductSheet from "./ProductSheet";
import { IconPlus } from "./icons";

export default function CombosSection() {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [featured, ...rest] = combos;

  return (
    <section
      id="combos"
      aria-labelledby="combos-title"
      className="bg-brand-cream py-14 sm:py-20"
    >
      <div className="container-site">
        <div className="mb-8">
          <p className="section-kicker">Mais por menos</p>
          <h2 id="combos-title" className="section-title mt-1">
            Combos e ofertas
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Destaque editorial */}
          <article className="group relative min-h-72 overflow-hidden rounded-2xl bg-brand-green text-white shadow-cardHover">
            <button
              type="button"
              onClick={() => setSelected(featured)}
              aria-label={`Ver combo ${featured.nome}`}
              className="relative block h-full w-full"
            >
              <Image
                src={featured.imagem}
                alt={featured.nome}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                <span className="text-left">
                  <span className="block rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
                    Combo destaque
                  </span>
                  <span className="mt-3 block font-block text-3xl font-bold uppercase tracking-tight">
                    {featured.nome}
                  </span>
                  <span className="mt-1 block text-sm text-white/80">
                    {featured.descricao}
                  </span>
                </span>
                <span className="flex flex-col items-end gap-2">
                  <span className="price-lg text-white">
                    {formatPrice(featured.preco ?? 0)}
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red text-white">
                    <IconPlus className="h-5 w-5" />
                  </span>
                </span>
              </span>
            </button>
          </article>

          <div className="flex flex-col gap-5">
            {rest.map((combo) => (
              <article
                key={combo.id}
                className="group flex flex-1 items-center gap-4 overflow-hidden rounded-2xl bg-white p-3 shadow-card ring-1 ring-brand-line transition-all duration-300 hover:shadow-cardHover"
              >
                <button
                  type="button"
                  onClick={() => setSelected(combo)}
                  aria-label={`Ver ${combo.nome}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-brand-sand"
                >
                  <Image
                    src={combo.imagem}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
                <div className="flex min-w-0 flex-1 flex-col py-1">
                  <h3 className="text-lg font-bold uppercase leading-tight tracking-tight text-brand-ink">
                    {combo.nome}
                  </h3>
                  <p className="mt-0.5 line-clamp-2 text-sm text-brand-ink/60">
                    {combo.descricao}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <span className="price">{formatPrice(combo.preco ?? 0)}</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red text-white transition-transform group-hover:scale-105 active:scale-90">
                      <IconPlus className="h-5 w-5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <ProductSheet item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
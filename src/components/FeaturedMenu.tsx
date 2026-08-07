"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { topSeven } from "@/lib/menu";
import type { MenuItem } from "@/lib/menu";
import { formatPrice } from "@/lib/site";
import ProductCard from "./ProductCard";
import ProductSheet from "./ProductSheet";
import Reveal from "./Reveal";
import { IconArrowRight, IconPlus } from "./icons";

export default function FeaturedMenu() {
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [featured, ...rest] = topSeven;

  return (
    <section
      id="top-seven"
      aria-labelledby="more-title"
      className="bg-white py-14 sm:py-20"
    >
      <div className="container-site">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Os favoritos da casa</p>
            <h2 id="more-title" className="section-title mt-1">
              Top Seven
            </h2>
            <p className="mt-2 max-w-xl text-brand-ink/70">
              Os lanches preferidos do Lucas Lanches em Presidente Epitácio.
            </p>
          </div>
          <Link
            href="/cardapio"
            className="btn-outline px-6 py-2.5 text-sm"
            aria-label="Ver cardápio completo"
          >
            Ver cardápio completo
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Desktop: editorial grid */}
        <div className="hidden gap-5 lg:grid lg:grid-cols-2">
          <Reveal>
            <article className="group relative h-full overflow-hidden rounded-2xl bg-brand-sand shadow-card ring-1 ring-brand-line">
              <button
                type="button"
                onClick={() => setSelected(featured)}
                aria-label={`Ver ${featured.nome}`}
                className="relative block h-full min-h-[26rem] w-full overflow-hidden"
              >
                <span className="absolute left-4 top-4 z-10 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                  Top Seven
                </span>
                <Image
                  src={featured.imagem}
                  alt={featured.nome}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-6 pt-16 text-left">
                  <span className="block font-block text-3xl font-bold uppercase tracking-tight text-white">
                    {featured.nome}
                  </span>
                  <span className="mt-1 block text-sm text-white/85">
                    {featured.descricao}
                  </span>
                  <span className="mt-3 flex items-center gap-2">
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
          </Reveal>

          <div className="grid grid-cols-2 gap-5">
            {rest.map((item, i) => (
              <Reveal key={item.id} delay={i * 60}>
                <ProductCard item={item} onSelect={setSelected} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: horizontal scroll com snap */}
        <div
          className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory no-scrollbar lg:hidden"
          aria-label="Top Seven"
        >
          {topSeven.map((item) => (
            <div key={item.id} className="w-[82%] shrink-0 snap-start sm:w-[55%]">
              <ProductCard item={item} onSelect={setSelected} />
            </div>
          ))}
        </div>
      </div>

      <ProductSheet item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
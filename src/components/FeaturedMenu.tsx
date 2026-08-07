"use client";

import { useState } from "react";
import Link from "next/link";
import { topSeven } from "@/lib/menu";
import type { MenuItem } from "@/lib/menu";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { IconArrowRight } from "./icons";

export default function FeaturedMenu() {
  const [selected, setSelected] = useState<MenuItem | null>(null);

  return (
    <section
      id="mais-pedidos"
      aria-labelledby="more-title"
      className="bg-white py-16 sm:py-20"
    >
      <div className="container-site">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Os favoritos da casa</p>
            <h2 id="mais-pedidos-title" className="section-title mt-1">
              Top Seven do Lucas Lanches
            </h2>
            <p className="mt-2 max-w-xl text-brand-ink/70">
              Os sete lanches mais pedidos pelos nossos clientes em{" "}
              Presidente Epitácio.
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topSeven.map((item, i) => (
            <ProductCard
              key={item.id}
              item={item}
              onSelect={setSelected}
              eager={i === 0}
            />
          ))}
        </div>
      </div>

      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
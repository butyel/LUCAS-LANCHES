"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { cardapio, categories } from "@/lib/menu";
import type { MenuItem } from "@/lib/menu";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { cn } from "@/lib/utils";
import { IconSearch } from "./icons";

type Categoria = MenuItem["categoriaNome"];

export default function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "Todos">("Todos");
  const [selected, setSelected] = useState<MenuItem | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const match = cardapio.find(
      (i) => i.categoriaNome.toLowerCase() === hash.toLowerCase()
    );
    if (match) setCategoria(match.categoriaNome as Categoria);
  }, []);

  const tabs: Array<Categoria | "Todos"> = ["Todos", ...categories];

  const itens = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cardapio.filter((item) => {
      const inCat = categoria === "Todos" || item.categoriaNome === categoria;
      const inQuery =
        !needle ||
        item.nome.toLowerCase().includes(needle) ||
        item.descricao.toLowerCase().includes(needle);
      return inCat && inQuery;
    });
  }, [query, categoria]);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div
          role="tablist"
          aria-label="Categorias do cardápio"
          className="flex gap-2 overflow-x-auto pb-1 no-scrollbar"
        >
          {tabs.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              id={`cat-${cat}`}
              aria-selected={categoria === cat}
              onClick={() => setCategoria(cat)}
              className={cn(
                "chip",
                categoria === cat
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-brand-line bg-white text-brand-ink hover:border-brand-green hover:text-brand-green"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <label className="relative block md:w-72">
          <span className="sr-only">Buscar no cardápio</span>
          <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-ink/45" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar lanche, batata, milkshake..."
            className="w-full rounded-full border-2 border-brand-line bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand-red"
          />
        </label>
      </div>

      <p className="mt-4 text-sm text-brand-ink/50" aria-live="polite">
        {itens.length} {itens.length === 1 ? "item" : "itens"}{" "}
        {categoria !== "Todos" && `em ${categoria}`}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {itens.map((item) => (
          <ProductCard key={item.id} item={item} onSelect={setSelected} />
        ))}
      </div>

      {itens.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-brand-line bg-white p-10 text-center">
          <p className="text-lg font-bold text-brand-ink">
            Nada encontrado para “{query}”
          </p>
          <p className="mt-1 text-sm text-brand-ink/60">
            Tente buscar por outro lanche ou categoria.
          </p>
        </div>
      )}

      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
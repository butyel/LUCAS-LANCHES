"use client";

import { useMemo, useState, useEffect } from "react";
import { cardapio, categories } from "@/lib/menu";
import type { MenuItem, CategoryId } from "@/lib/menu";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { cn } from "@/lib/utils";
import { IconSearch } from "./icons";

type Filter = CategoryId | "Todos";

export default function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState<Filter>("Todos");
  const [selected, setSelected] = useState<MenuItem | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const match = categories.find((c) => c.id === hash);
    if (match) setCategoria(match.id);
  }, []);

  const tabs: Filter[] = ["Todos", ...categories.map((c) => c.id)];

  const itens = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return cardapio.filter((item) => {
      const inCat = categoria === "Todos" || item.categoria === categoria;
      const inQuery =
        !needle ||
        item.nome.toLowerCase().includes(needle) ||
        item.descricao.toLowerCase().includes(needle) ||
        item.categoriaNome.toLowerCase().includes(needle);
      return inCat && inQuery;
    });
  }, [query, categoria]);

  const label = (id: Filter) =>
    id === "Todos" ? "Todos" : categories.find((c) => c.id === id)!.nome;

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
              aria-selected={categoria === cat}
              onClick={() => setCategoria(cat)}
              className={
                categoria === cat
                  ? "chip border-brand-red bg-brand-red text-white"
                  : "chip border-brand-line bg-white text-brand-ink hover:border-brand-green hover:text-brand-green"
              }
            >
              {label(cat)}
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
            placeholder="Buscar bacon, frango, calabresa..."
            className="w-full rounded-full border-2 border-brand-line bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand-red"
          />
        </label>
      </div>

      <p className="mt-4 text-sm text-brand-ink/50" aria-live="polite">
        {itens.length} {itens.length === 1 ? "item" : "itens"}{" "}
        {categoria !== "Todos" && `em ${label(categoria)}`}
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
            Tente buscar por outro lanche, ingrediente ou categoria.
          </p>
        </div>
      )}

      <ProductModal item={selected} onClose={() => setSelected(null)} />
    </>
  );
}
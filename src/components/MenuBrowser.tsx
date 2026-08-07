"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cardapio, categories, categoryName } from "@/lib/menu";
import type { MenuItem, CategoryId } from "@/lib/menu";
import ProductCard from "./ProductCard";
import ProductSheet from "./ProductSheet";
import { cn } from "@/lib/utils";

const order: CategoryId[] = [
  "top-seven",
  "lanches",
  "especiais",
  "combos",
  "batatas",
  "refrigerantes",
];

export default function MenuBrowser() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MenuItem | null>(null);
  const [active, setActive] = useState<CategoryId>("top-seven");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && order.includes(hash as CategoryId)) {
      window.setTimeout(() => {
        sectionRefs.current[hash]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
    }
  }, []);

  const needle = query.trim().toLowerCase();

  const grouped = useMemo(
    () =>
      order.map((catId) => ({
        catId,
        items: cardapio.filter(
          (i) =>
            i.categoria === catId &&
            (!needle ||
              i.nome.toLowerCase().includes(needle) ||
              i.descricao.toLowerCase().includes(needle) ||
              i.categoriaNome.toLowerCase().includes(needle))
        ),
      })),
    [needle]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const sections = order
      .map((id) => sectionRefs.current[id])
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          setActive(visible[0].target.id as CategoryId);
        }
      },
      { rootMargin: "-140px 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [grouped]);

  const scrollTo = (id: CategoryId) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goToSection = (id: CategoryId) => {
    history.pushState(null, "", `#${id}`);
    scrollTo(id);
  };

  return (
    <div>
      {/* Nav sticky de categorias */}
      <div className="sticky top-[84px] z-30 -mx-4 border-b border-brand-line bg-brand-cream/95 backdrop-blur">
        <div className="container-site">
          <div
            role="tablist"
            aria-label="Categorias do cardápio"
            className="flex gap-2 overflow-x-auto py-3 no-scrollbar"
          >
            {order.map((catId) => {
              const cat = categories.find((c) => c.id === catId)!;
              return (
                <button
                  key={catId}
                  type="button"
                  role="tab"
                  aria-selected={active === catId}
                  onClick={() => goToSection(catId)}
                  className={cn(
                    "chip",
                    active === catId
                      ? "border-brand-red bg-brand-red text-white"
                      : "border-brand-line bg-white text-brand-ink hover:border-brand-green hover:text-brand-green"
                  )}
                >
                  {cat.nome}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="relative block">
          <span className="sr-only">Buscar no cardápio</span>
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-ink/45" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar bacon, frango, calabresa..."
            className="w-full rounded-full border-2 border-brand-line bg-white py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-brand-red"
          />
        </label>
      </div>

      {needle && (
        <p className="mt-6 text-sm text-brand-ink/50" aria-live="polite">
          {grouped.reduce((s, g) => s + g.items.length, 0)} resultado
          {grouped.reduce((s, g) => s + g.items.length, 0) === 1 ? "" : "s"} para
          “{query}”
        </p>
      )}

      {grouped.every((g) => g.items.length === 0) ? (
        <div className="mt-10 rounded-2xl border border-dashed border-brand-line bg-white p-10 text-center">
          <p className="text-lg font-bold text-brand-ink">
            Nada encontrado para “{query}”
          </p>
          <p className="mt-1 text-sm text-brand-ink/60">
            Tente buscar por outro lanche, ingrediente ou categoria.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="btn-outline mt-5 px-6 py-2.5 text-sm"
          >
            Limpar busca
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-14">
          {grouped.map(
            (group) =>
              group.items.length > 0 && (
                <section
                  key={group.catId}
                  id={group.catId}
                  ref={(el) => {
                    sectionRefs.current[group.catId] = el;
                  }}
                  className="scroll-mt-36"
                  aria-labelledby={`titulo-${group.catId}`}
                >
                  <div className="mb-5 flex items-baseline justify-between gap-4">
                    <h2
                      id={`titulo-${group.catId}`}
                      className="section-title text-3xl"
                    >
                      {categoryName(group.catId)}
                    </h2>
                    <span className="hidden text-sm text-brand-ink/40 sm:block">
                      {group.items.length}{" "}
                      {group.items.length === 1 ? "item" : "itens"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {group.items.map((item) => (
                      <ProductCard key={item.id} item={item} onSelect={setSelected} />
                    ))}
                  </div>
                </section>
              )
          )}
        </div>
      )}

      <ProductSheet item={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function Icon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
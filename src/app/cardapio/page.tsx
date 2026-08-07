"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import cardapio from "@/data/cardapio.json";
import { formatPrice, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Item = (typeof cardapio)[number];
type Categoria = Item["categoriaNome"];

const categorias: Categoria[] = [
  "Burgers",
  "Combos",
  "Porções",
  "Bebidas",
  "Sobremesas",
];

export default function CardapioPage() {
  const [ativa, setAtiva] = useState<Categoria | "Todos">("Todos");

  const itens = useMemo(
    () =>
      ativa === "Todos"
        ? cardapio
        : cardapio.filter((item) => item.categoriaNome === ativa),
    [ativa]
  );

  const tabs: Array<Categoria | "Todos"> = ["Todos", ...categorias];

  return (
    <div className="bg-brand-gray">
      <div className="bg-brand-green py-14 text-center text-white">
        <div className="container-site">
          <h1 className="font-block text-4xl uppercase tracking-tight sm:text-5xl">
            Nosso Cardapio
          </h1>
          <p className="mt-2 text-white/75">
            Todos os itens feitos na hora. Selecione uma categoria para filtrar.
          </p>
        </div>
      </div>

      <div className="container-site py-12">
        <div
          role="tablist"
          aria-label="Categorias do cardapio"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {tabs.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={ativa === cat}
              onClick={() => setAtiva(cat)}
              className={cn(
                "rounded-full border-2 px-5 py-2 font-block text-base uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-brand-red",
                ativa === cat
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-brand-green bg-white text-brand-green hover:bg-brand-green hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {itens.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-cardHover"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-gray">
                {item.precoPromo && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold uppercase text-white">
                    Oferta
                  </span>
                )}
                <Image
                  src={item.imagem}
                  alt={item.nome}
                  width={640}
                  height={400}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-block text-xl uppercase text-brand-ink">
                    {item.nome}
                  </h2>
                  <span className="rounded-full bg-brand-gray px-2.5 py-1 text-[11px] font-semibold uppercase text-brand-green">
                    {item.categoriaNome}
                  </span>
                </div>
                <p className="mt-2 flex-1 text-sm text-brand-ink/70">
                  {item.descricao}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    {item.precoPromo && (
                      <span className="text-sm text-brand-ink/50 line-through">
                        {formatPrice(item.preco)}
                      </span>
                    )}
                    <span className="font-block text-2xl text-brand-green">
                      {formatPrice(item.precoPromo ?? item.preco)}
                    </span>
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-red px-5 py-2.5 text-sm"
                    aria-label={`Pedir ${item.nome} pelo WhatsApp`}
                  >
                    Adicionar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
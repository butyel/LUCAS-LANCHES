"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

export default function Cardapio() {
  const [ativa, setAtiva] = useState<Categoria>("Burgers");

  const itens = useMemo(
    () => cardapio.filter((item) => item.categoriaNome === ativa),
    [ativa]
  );

  return (
    <section id="cardapio" className="bg-brand-gray py-16 sm:py-20">
      <div className="container-site">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="section-title mb-0">Cardapio</h2>
          <Link
            href="/cardapio"
            className="hidden font-block text-lg uppercase text-brand-red hover:underline sm:inline"
          >
            Ver cardapio completo
          </Link>
        </div>

        <div
          role="tablist"
          aria-label="Categorias do cardapio"
          className="mb-8 flex gap-2 overflow-x-auto pb-1 no-scrollbar"
        >
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={ativa === cat}
              onClick={() => setAtiva(cat)}
              className={cn(
                "shrink-0 rounded-full border-2 px-5 py-2 font-block text-base uppercase tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-brand-red",
                ativa === cat
                  ? "border-brand-red bg-brand-red text-white"
                  : "border-brand-green bg-white text-brand-green hover:bg-brand-green hover:text-white"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {itens.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-cardHover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray">
                {item.precoPromo && (
                  <span className="absolute left-3 top-3 z-10 rounded-full bg-brand-orange px-3 py-1 text-xs font-bold uppercase text-white">
                    Oferta
                  </span>
                )}
                <Image
                  src={item.imagem}
                  alt={item.nome}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-block text-xl uppercase text-brand-ink">
                  {item.nome}
                </h3>
                <p className="mt-1 flex-1 text-sm text-brand-ink/70">
                  {item.descricao}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    {item.precoPromo && (
                      <span className="mr-2 text-sm text-brand-ink/50 line-through">
                        {formatPrice(item.preco)}
                      </span>
                    )}
                    <span className="font-bold text-brand-green">
                      {formatPrice(item.precoPromo ?? item.preco)}
                    </span>
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-red px-4 py-2 text-xs"
                    aria-label={`Pedir ${item.nome} pelo WhatsApp`}
                  >
                    Adicionar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center lg:hidden">
          <Link href="/cardapio" className="btn-green-outline px-6 py-3">
            Ver cardapio completo
          </Link>
        </div>
      </div>
    </section>
  );
}
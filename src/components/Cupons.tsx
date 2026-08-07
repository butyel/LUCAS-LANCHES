"use client";

import { useState } from "react";
import Link from "next/link";
import cupons from "@/data/cupons.json";

export default function Cupons() {
  const [copiado, setCopiado] = useState<string | null>(null);

  const copiar = async (codigo: string) => {
    try {
      await navigator.clipboard.writeText(codigo);
    } catch {
      const area = document.createElement("textarea");
      area.value = codigo;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopiado(codigo);
    window.setTimeout(() => setCopiado(null), 2000);
  };

  return (
    <section id="cupons" className="bg-white py-16 sm:py-20">
      <div className="container-site">
        <h2 className="section-title">Cupons de desconto</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cupons.map((cupom) => (
            <article
              key={cupom.id}
              className="relative flex flex-col overflow-hidden rounded-2xl bg-brand-gray shadow-card"
            >
              <div className="flex items-center justify-between bg-brand-green px-5 py-3">
                <h3 className="font-block text-lg uppercase text-white">
                  {cupom.titulo}
                </h3>
                <span className="text-xs font-semibold uppercase text-white/80">
                  {cupom.validade}
                </span>
              </div>

              <div className="px-5 py-6">
                <p className="text-sm text-brand-ink/80">{cupom.descricao}</p>
                <div className="mt-4 rounded-xl border-2 border-dashed border-brand-green bg-white px-4 py-3 text-center">
                  <p className="text-xs uppercase tracking-wide text-brand-ink/60">
                    Codigo
                  </p>
                  <p className="font-block text-2xl tracking-widest text-brand-red">
                    {cupom.codigo}
                  </p>
                </div>
                <p className="mt-3 text-xs text-brand-green">
                  {cupom.condicao}
                </p>

                <button
                  type="button"
                  onClick={() => copiar(cupom.codigo)}
                  className="btn-red mt-4 w-full py-2.5 text-sm"
                  aria-label={`Copiar codigo ${cupom.codigo}`}
                >
                  {copiado === cupom.codigo ? "Copiado!" : "Copiar codigo"}
                </button>
              </div>

              <div className="flex">
                <div className="scissor-dash h-3 flex-1" aria-hidden="true" />
                <div className="w-3" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-brand-ink/60">
          Valorizou?{" "}
          <Link href="/cardapio" className="text-brand-red underline">
            Monte seu pedido agora
          </Link>{" "}
          e use o codigo.
        </p>
      </div>
    </section>
  );
}
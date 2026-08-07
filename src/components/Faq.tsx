"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { IconPlus } from "./icons";

const faqs = [
  {
    q: "Como peço no Lucas Lanches?",
    a: "Escolha seu lanche no cardápio, monte o pedido e finalize pelo WhatsApp. Você será direcionado com o pedido já montado — é só confirmar a troca com a gente.",
  },
  {
    q: "O Lucas Lanches faz delivery?",
    a: `Sim. Entregamos em ${siteConfig.region} com entrega grátis a partir das condições de cada oferta. Na confirmação do pedido pelo WhatsApp, combinamos o endereço e o tempo de entrega.`,
  },
  {
    q: "Posso retirar meu pedido?",
    a: `Claro. Você pode pedir por delivery ou retirar diretamente no local: ${siteConfig.address.street}, ${siteConfig.address.district}, ${siteConfig.address.city}.`,
  },
  {
    q: "Qual o horário de funcionamento?",
    a: `${siteConfig.hours}. Os pedidos são atendidos dentro desse período.`,
  },
  {
    q: "Como faço para entrar em contato?",
    a: `O jeito mais rápido é pelo WhatsApp: ${siteConfig.whatsappDisplay}. Por lá você já recebe o atendimento na hora.`,
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-title"
      className="bg-brand-cream py-16 sm:py-20"
    >
      <div className="container-site mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p className="section-kicker">Perguntas frequentes</p>
          <h2 id="faq-title" className="section-title mt-1">
            Dúvidas comuns
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-white transition-colors",
                  isOpen ? "border-brand-red" : "border-brand-line"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-bold text-brand-ink">{faq.q}</span>
                  <IconPlus
                    className={cn(
                      "h-5 w-5 shrink-0 text-brand-red transition-transform duration-200",
                      isOpen && "rotate-45"
                    )}
                  />
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${i}`}
                    className="border-t border-brand-line px-5 py-4 text-brand-ink/75"
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-brand-ink/60">
          Ainda tem dúvida?{" "}
          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-brand-red underline hover:no-underline"
          >
            Chame no WhatsApp
          </Link>{" "}
          que a gente responde rápido.
        </p>
      </div>
    </section>
  );
}
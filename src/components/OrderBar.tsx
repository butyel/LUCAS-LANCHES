"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { IconWhatsApp, IconBurger, IconSearch } from "./icons";

export default function OrderBar() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  return (
    <>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Pedir pelo WhatsApp - abre conversa em nova aba"
        className={cn(
          "fixed bottom-24 right-4 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#1fa855] md:flex",
          reduced && "md:hidden"
        )}
      >
        <span
          className="absolute inset-0 rounded-full bg-[#1fa855] animate-pulse-ring"
          aria-hidden="true"
        />
        <IconWhatsApp className="relative h-7 w-7" />
      </a>

      <div
        className="sticky bottom-0 z-40 border-t border-brand-line bg-white/95 pt-2 backdrop-blur md:hidden"
        style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
      >
        <div className="container-site flex gap-2.5 pb-1">
          <Link
            href="/cardapio"
            className="btn-outline flex-1 py-3 text-sm"
            aria-label="Ver cardápio"
          >
            <IconSearch className="h-4 w-4" />
            Cardápio
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp flex-[1.4] py-3 text-sm"
            aria-label="Pedir agora pelo WhatsApp"
          >
            <IconBurger className="h-4 w-4" />
            Pedir agora
          </a>
        </div>
      </div>
    </>
  );
}
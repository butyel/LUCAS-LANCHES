"use client";

import { useState, useEffect } from "react";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { IconWhatsApp } from "./icons";

export default function OrderBar() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Lucas Lanches pelo WhatsApp - abre conversa em nova aba"
      className={cn(
        "fixed right-4 top-24 z-[55] hidden h-14 w-14 items-center justify-center rounded-full bg-[#1fa855] text-white shadow-lg transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#1fa855] md:flex",
        reduced && "md:hidden"
      )}
    >
      <span
        className="absolute inset-0 rounded-full bg-[#1fa855] animate-pulse-ring"
        aria-hidden="true"
      />
      <IconWhatsApp className="relative h-7 w-7" />
    </a>
  );
}
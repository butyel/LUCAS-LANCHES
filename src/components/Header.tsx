"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { whatsappLink } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/cardapio", label: "Cardapio" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-nos", label: "Sobre Nos" },
];

const tickerItems = [
  "Entrega gratis em pedidos acima de R$ 79,00",
  "Funcionamento: Ter a Dom, das 18h as 23h",
  "Pedidos pelo WhatsApp em ate 45 minutos",
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative h-9 overflow-hidden bg-brand-green text-center text-xs font-semibold text-white sm:text-sm">
        {tickerItems.map((item) => (
          <span
            key={item}
            className="ticker-item absolute inset-0 flex items-center justify-center px-4"
            aria-hidden="true"
          >
            {item}
          </span>
        ))}
        <span className="sr-only">{tickerItems.join(". ")}</span>
      </div>

      <div className="bg-white/95 shadow-sm backdrop-blur">
        <div className="container-site flex h-16 items-center justify-between gap-4 sm:h-20">
          <Logo />

          <nav aria-label="Menu principal" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative font-block text-lg uppercase tracking-wide text-brand-ink transition-colors hover:text-brand-red focus-visible:outline-2 focus-visible:outline-brand-red",
                        active &&
                          "font-bold text-brand-red after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-brand-red"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red hidden px-5 py-2.5 text-sm sm:inline-flex"
              aria-label="Fazer pedido pelo WhatsApp em nova aba"
            >
              Delivery
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-brand-gray text-brand-green lg:hidden"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegacao"
          className={cn(
            "absolute right-0 top-0 flex h-full w-72 flex-col bg-white shadow-2xl transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-brand-gray px-5 py-4">
            <Logo className="scale-90 origin-left" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="flex h-10 w-10 items-center justify-center rounded-md text-brand-green"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>
          </div>
          <ul className="flex-1 overflow-y-auto px-5 py-6">
            {navLinks.map((link) => (
              <li key={link.href} className="mb-1">
                <Link
                  href={link.href}
                  aria-current={
                    link.href === "/" && pathname === "/" ? "page" : undefined
                  }
                  className={cn(
                    "block rounded-lg px-3 py-3 font-block text-xl uppercase tracking-wide text-brand-ink transition-colors hover:bg-brand-gray hover:text-brand-red",
                    (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) &&
                      "text-brand-red font-bold"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-brand-gray p-5">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red w-full py-3"
              aria-label="Fazer pedido pelo WhatsApp em nova aba"
            >
              Delivery no WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { siteConfig } from "@/lib/site";
import { useCart } from "@/context/CartProvider";
import { useUI } from "@/context/UIProvider";
import {
  IconClose,
  IconMenu,
  IconWhatsApp,
  IconTruck,
  IconSearch,
  IconBag,
} from "./icons";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/cupons", label: "Ofertas" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-nos", label: "Sobre" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useCart();
  const { openCart, openSearch } = useUI();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleOrderCta = () => {
    if (state.count > 0) openCart();
    else router.push("/cardapio#top-seven");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="relative overflow-hidden bg-brand-ink text-center text-white">
        <div className="marquee-track py-2 text-[11px] font-semibold uppercase tracking-[0.18em] sm:text-xs">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
              <span className="mx-4 inline-flex items-center gap-2">
                <IconTruck className="h-4 w-4 text-brand-orange" />
                Taxa de entrega: consulte no pedido
              </span>
              <span className="mx-4">·</span>
              <span className="mx-4">Ter a Dom, das 18h às 23h</span>
              <span className="mx-4">·</span>
              <span className="mx-4">Pedido pelo WhatsApp</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "transition-all duration-300",
          scrolled ? "bg-white/95 shadow-header backdrop-blur" : "bg-brand-cream/90 backdrop-blur"
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between gap-3 transition-all duration-300",
            scrolled ? "h-14" : "h-16 sm:h-20"
          )}
        >
          <Logo scrolled={scrolled} compact={scrolled} />

          <nav aria-label="Menu principal" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => {
                const active =
                  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative text-[15px] font-bold tracking-wide text-brand-ink/80 transition-colors hover:text-brand-red",
                        active &&
                          "text-brand-red after:absolute after:-bottom-1.5 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-brand-red"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Buscar no cardápio"
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink transition-colors hover:bg-brand-sand sm:flex"
            >
              <IconSearch className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Abrir pedido (${state.count} itens)`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink transition-colors hover:bg-brand-sand"
            >
              <IconBag className="h-5 w-5" />
              {state.count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-bold text-white">
                  {state.count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={handleOrderCta}
              className="btn-red px-4 py-2.5 text-sm sm:px-5"
              aria-label={state.count > 0 ? "Ver pedido" : "Fazer pedido"}
            >
              <IconWhatsApp className="h-5 w-5" />
              <span className="sm:inline">{state.count > 0 ? "Ver pedido" : "Pedir"}</span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink transition-colors hover:bg-brand-sand lg:hidden"
            >
              {menuOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu móvel */}
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
          aria-label="Menu de navegação"
          className={cn(
            "absolute right-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl transition-transform duration-300",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-brand-line px-5 py-4">
            <Logo />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-brand-ink hover:bg-brand-sand"
            >
              <IconClose className="h-5 w-5" />
            </button>
          </div>
          <nav aria-label="Menu móvel" className="flex-1 overflow-y-auto px-5 py-5">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href} className="mb-1">
                  <Link
                    href={link.href}
                    aria-current={
                      link.href === "/" && pathname === "/" ? "page" : undefined
                    }
                    className={cn(
                      "block rounded-xl px-4 py-3 text-xl font-bold uppercase tracking-wide text-brand-ink transition-colors hover:bg-brand-sand hover:text-brand-red",
                      (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) &&
                        "text-brand-red"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-2 border-t border-brand-line p-5">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                openCart();
              }}
              className="btn-red w-full py-3 text-base"
            >
              <IconWhatsApp className="h-5 w-5" /> Ver pedido
            </button>
            <a href={`tel:+${siteConfig.whatsapp}`} className="btn-outline w-full py-3 text-base">
              Ligar: {siteConfig.whatsappDisplay}
            </a>
          </div>
        </aside>
      </div>
    </header>
  );
}
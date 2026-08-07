"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUI } from "@/context/UIProvider";
import { useCart } from "@/context/CartProvider";
import { cn } from "@/lib/utils";
import { IconBurger, IconSearch, IconBag } from "./icons";

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h5v-6h4v6h5V9.5" />
    </svg>
  );
}

type MobileBottomNavProps = {
  onOpenCart: () => void;
  onOpenSearch: () => void;
};

export default function MobileBottomNav({
  onOpenCart,
  onOpenSearch,
}: MobileBottomNavProps) {
  const pathname = usePathname();
  const { state } = useCart();

  const items = [
    {
      label: "Início",
      active: pathname === "/",
      onClick: () => null,
      icon: <HomeIcon className="h-6 w-6" />,
      href: "/",
    },
    {
      label: "Cardápio",
      active: pathname === "/cardapio",
      onClick: () => null,
      icon: <IconBurger className="h-6 w-6" />,
      href: "/cardapio",
    },
    {
      label: "Buscar",
      active: false,
      onClick: onOpenSearch,
      icon: <IconSearch className="h-6 w-6" />,
      href: undefined,
    },
    {
      label: "Pedido",
      active: false,
      onClick: onOpenCart,
      icon: <IconBag className="h-6 w-6" />,
      href: undefined,
      badge: state.count,
    },
  ];

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-[65] border-t border-brand-line bg-white/95 backdrop-blur md:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {items.map((item) => {
          const content = (
            <>
              <span className="relative flex items-center justify-center">
                {item.icon}
                {item.badge ? (
                  <span className="absolute -right-3 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[11px] font-bold text-white">
                    {item.badge}
                  </span>
                ) : null}
              </span>
              <span className="text-[11px] font-bold">{item.label}</span>
            </>
          );
          const cls = cn(
            "flex min-h-[56px] flex-col items-center justify-center gap-0.5 transition-colors active:scale-95",
            item.active ? "text-brand-red" : "text-brand-ink/55"
          );
          return (
            <li key={item.label}>
              {item.href ? (
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={cls}
                >
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={item.onClick}
                  aria-label={item.label}
                  className={cls}
                >
                  {content}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
import Link from "next/link";
import Logo from "./Logo";
import { siteConfig, whatsappLink } from "@/lib/site";
import { IconWhatsApp, IconPhone, IconPin, IconClock } from "./icons";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/cupons", label: "Ofertas" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-nos", label: "Sobre Nós" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-white">
      <div className="container-site grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="text-white [&>span:last-child]:text-white" />
          <p className="mt-4 max-w-xs text-sm text-white/60">
            {siteConfig.tagline} Pedido na chapa, delivery na cidade e sabor de
            verdade.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Lucas Lanches"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da Lucas Lanches"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red"
            >
              <IconWhatsApp className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Lucas Lanches"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red"
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 8h2.5V5H14a4 4 0 0 0-4 4v2H7.5v3H10v7h3v-7h2.5l.5-3H13V9a1 1 0 0 1 1-1z" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="Rodapé">
          <h3 className="font-block text-lg uppercase tracking-[0.2em] text-brand-orange">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-block text-lg uppercase tracking-[0.2em] text-brand-orange">
            Pedidos
          </h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition-colors hover:text-white"
              >
                Pedir agora no WhatsApp
              </a>
            </li>
            <li>
              <Link href="/cardapio" className="text-white/70 transition-colors hover:text-white">
                Cardápio completo
              </Link>
            </li>
            <li>
              <Link href="/cupons" className="text-white/70 transition-colors hover:text-white">
                Cupons de desconto
              </Link>
            </li>
            <li>
              <a
                href={`tel:+${siteConfig.whatsapp}`}
                className="text-white/70 transition-colors hover:text-white"
              >
                Ligar: {siteConfig.whatsappDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-block text-lg uppercase tracking-[0.2em] text-brand-orange">
            Informações
          </h3>
          <address className="mt-4 space-y-3 not-italic text-white/70">
            <p className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
              <span>
                {siteConfig.address.street}, {siteConfig.address.district}.{" "}
                {siteConfig.address.city} - {siteConfig.address.state},{" "}
                {siteConfig.address.cep}
              </span>
            </p>
            <p className="flex items-center gap-2.5">
              <IconClock className="h-4 w-4 shrink-0 text-brand-orange" />
              <span>{siteConfig.hours}</span>
            </p>
            <p className="flex items-center gap-2.5">
              <IconPhone className="h-4 w-4 shrink-0 text-brand-orange" />
              <span>{siteConfig.whatsappDisplay}</span>
            </p>
          </address>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green mt-5 w-full px-5 py-2.5 text-sm"
            aria-label="Fazer pedido pelo WhatsApp em nova aba"
          >
            Fazer pedido
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/45 sm:flex-row">
          <p>© {year} {siteConfig.name}. Todos os direitos reservados.</p>
          <p>
            Hambúrguer artesanal em {siteConfig.address.city} - {siteConfig.address.state}.
          </p>
        </div>
      </div>
    </footer>
  );
}
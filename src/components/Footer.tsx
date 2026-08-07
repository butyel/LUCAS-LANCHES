import Link from "next/link";
import Logo from "./Logo";
import { siteConfig, whatsappLink } from "@/lib/site";

const menuLinks = [
  { href: "/", label: "Inicio" },
  { href: "/cardapio", label: "Cardapio" },
  { href: "/cupons", label: "Cupons" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre-nos", label: "Sobre Nos" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-green text-white">
      <div className="container-site grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="text-white [&>span:last-child]:text-brand-red [&>span:first-child]:text-white" />
          <p className="mt-4 max-w-xs text-sm text-white/70">
            {siteConfig.tagline} Entrega rapida e sabor de verdade.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Lucas Lanches"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm5.2 14.2c-.2.7-1.3 1.3-1.8 1.4-.5.1-1 .2-3.4-.7-2.8-1.1-4.6-3.8-4.8-4-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.4.7-.4h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .6l-.4.6-.4.5c-.2.2-.3.4-.1.7.2.3.9 1.5 2 2.4 1.4 1.2 2.5 1.6 2.9 1.7.3.2.6.1.8-.1l1.1-1.3c.2-.3.5-.2.8-.1l2 .9c.3.2.5.3.6.4.1.2.1.8-.2 1.2z" />
              </svg>
            </a>
            <a
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Lucas Lanches"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-red"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M14 8h2.5V5H14a4 4 0 0 0-4 4v2H7.5v3H10v7h3v-7h2.5l.5-3H13V9a1 1 0 0 1 1-1z" />
              </svg>
            </a>
          </div>
        </div>

        <nav aria-label="Rodape">
          <h3 className="font-block text-lg uppercase tracking-wide text-white/80">
            Navegacao
          </h3>
          <ul className="mt-4 space-y-2">
            {menuLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/70 transition-colors hover:text-brand-red"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-block text-lg uppercase tracking-wide text-white/80">
            Contato
          </h3>
          <address className="mt-4 space-y-2 not-italic text-white/70">
            <p>{siteConfig.phoneDisplay}</p>
            <p>{siteConfig.email}</p>
            <p>
              {siteConfig.address.street}
              <br />
              {siteConfig.address.district}
              <br />
              {siteConfig.address.city} - {siteConfig.address.state},{" "}
              {siteConfig.address.cep}
            </p>
          </address>
        </div>

        <div>
          <h3 className="font-block text-lg uppercase tracking-wide text-white/80">
            Horario
          </h3>
          <p className="mt-4 text-white/70">{siteConfig.hours}</p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white mt-4 px-5 py-2.5 text-sm"
            aria-label="Pedir pelo WhatsApp em nova aba"
          >
            Fazer pedido
          </a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/50 sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p>Feito com sabor em Presidente Epitacio - SP.</p>
        </div>
      </div>
    </footer>
  );
}
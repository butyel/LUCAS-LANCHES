import type { Metadata } from "next";
import MenuBrowser from "@/components/MenuBrowser";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cardápio Lucas Lanches | Lanches em Presidente Epitácio",
  description:
    "Cardápio da Lucas Lanches: burgers artesanais, combos, porções, bebidas e sobremesas em Presidente Epitácio - SP. Feito na hora, com delivery e retirada pelo WhatsApp.",
  alternates: {
    canonical: "/cardapio",
  },
};

export default function CardapioPage() {
  return (
    <div>
      <div className="relative overflow-hidden bg-brand-green py-14 text-white sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "url('/images/icons/pattern.svg')",
            backgroundSize: "200px",
          }}
          aria-hidden="true"
        />
        <div className="container-site relative">
          <p className="section-kicker text-brand-orange">Cardápio</p>
          <h1 className="mt-2 text-4xl font-bold uppercase tracking-tight sm:text-5xl lg:text-6xl">
            Cardápio {siteConfig.name}
          </h1>
          <p className="mt-3 max-w-xl text-white/75">
            Burgers artesanais, combos e porções feitos na hora em{" "}
            {siteConfig.address.city}. Escolha seu lanche, monte o pedido e
            finalize pelo WhatsApp.
          </p>
        </div>
      </div>

      <div className="bg-brand-cream py-10 sm:py-14">
        <div className="container-site">
          <MenuBrowser />
        </div>
      </div>
    </div>
  );
}
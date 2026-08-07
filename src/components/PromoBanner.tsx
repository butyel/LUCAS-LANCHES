import Image from "next/image";
import Link from "next/link";
import { combos } from "@/lib/menu";
import { formatPrice, whatsappLink } from "@/lib/site";

export default function PromoBanner() {
  const topCombo = combos.find((c) => c.precoPromo) ?? combos[0];

  if (!topCombo) return null;

  return (
    <section aria-labelledby="promo-title" className="bg-brand-cream">
      <div className="container-site py-10 sm:py-14">
        <div className="grid overflow-hidden rounded-2xl bg-brand-green text-white shadow-cardHover lg:grid-cols-[1.2fr_1fr]">
          <div className="relative order-2 flex flex-col justify-center p-7 sm:p-10 lg:order-1">
            <p className="section-kicker text-brand-orange">Combos e ofertas</p>
            <h2
              id="promo-title"
              className="mt-2 text-3xl font-bold uppercase leading-tight tracking-tight sm:text-4xl"
            >
              {topCombo.nome}
            </h2>
            <p className="mt-3 max-w-md text-white/75">{topCombo.descricao}</p>

            <div className="mt-5 flex items-baseline gap-3">
              {topCombo.precoPromo && (
                <span className="text-lg text-white/50 line-through">
                  {formatPrice(topCombo.preco)}
                </span>
              )}
              <span className="text-4xl font-bold text-brand-orange">
                {formatPrice(topCombo.precoPromo ?? topCombo.preco)}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red px-7 py-3.5 text-base"
                aria-label={`Quero o ${topCombo.nome} pelo WhatsApp`}
              >
                Quero esse combo
              </a>
              <Link
                href="/cupons"
                className="btn-outline-light px-7 py-3.5 text-base"
              >
                Ver todas as ofertas
              </Link>
            </div>
          </div>

          <div className="relative order-1 min-h-56 lg:order-2">
            <Image
              src={topCombo.imagem}
              alt={topCombo.nome}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
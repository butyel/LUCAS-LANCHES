import Image from "next/image";
import cardapio from "@/data/cardapio.json";
import { formatPrice, whatsappLink } from "@/lib/site";

const promo = cardapio.filter((item) => item.precoPromo).slice(0, 6);

export default function Promocoes() {
  return (
    <section id="promocoes" className="bg-brand-green py-16 sm:py-20">
      <div className="container-site">
        <h2 className="section-title mb-8 text-white">Promoções em destaque</h2>

        <div className="grid grid-flow-col auto-cols-[82%] gap-5 overflow-x-auto pb-4 no-scrollbar sm:auto-cols-[46%] lg:auto-cols-[32%]">
          {promo.map((item) => (
            <article
              key={item.id}
              className="relative overflow-hidden rounded-2xl bg-white shadow-card"
            >
              <div className="aspect-[16/10] overflow-hidden bg-brand-gray">
                <Image
                  src={item.imagem}
                  alt={item.nome}
                  width={560}
                  height={350}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <span className="mb-2 inline-block rounded-full bg-brand-orange px-3 py-1 text-xs font-bold uppercase text-white">
                  Leve por menos
                </span>
                <h3 className="font-block text-xl uppercase text-brand-ink">
                  {item.nome}
                </h3>
                <div className="mt-2 flex items-end justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-brand-ink/50 line-through">
                      {formatPrice(item.preco)}
                    </span>
                    <span className="font-block text-2xl text-brand-green">
                      {formatPrice(item.precoPromo!)}
                    </span>
                  </div>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-red px-4 py-2 text-xs"
                    aria-label={`Pedir promoção ${item.nome} pelo WhatsApp`}
                  >
                    Pedir
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
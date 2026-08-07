import Image from "next/image";
import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site";
import { IconArrowRight } from "./icons";

export default function AboutSection() {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="bg-brand-cream py-16 sm:py-20"
    >
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <Image
              src="/images/store.svg"
              alt={`Estabelecimento ${siteConfig.name} em ${siteConfig.address.city}`}
              width={640}
              height={480}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full rounded-2xl shadow-cardHover"
            />
          </div>

          <div>
            <p className="section-kicker">Nossa história</p>
            <h2 id="about-title" className="section-title mt-1">
              {siteConfig.name} em {siteConfig.address.city}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-brand-ink/75">
              Começamos com uma chapa na garagem e a vontade de servir um
              hambúrguer honesto: carne fresca, pão artesanal e molhos feitos
              na casa. Esse mesmo cuidado segue em cada embalagem que sai da
              nossa cozinha hoje.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-brand-ink/75">
              Atendemos com delivery e retirada em {siteConfig.region}, com
              pedidos fáceis pelo WhatsApp. Se você procura{" "}
              <strong>lanche em {siteConfig.address.city}</strong> com sabor de
              verdade, você acabou de achar o lugar.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/sobre-nos" className="btn-outline px-6 py-3 text-base">
                Conhecer a história
                <IconArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red px-6 py-3 text-base"
                aria-label="Fazer pedido pelo WhatsApp em nova aba"
              >
                Pedir agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
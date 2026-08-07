import Image from "next/image";
import Link from "next/link";
import { whatsappLink, siteConfig } from "@/lib/site";
import { IconWhatsApp, IconTruck, IconClock, IconFlame } from "./icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-ink text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage: "url('/images/icons/pattern.svg')",
          backgroundSize: "220px",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand-red/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-orange/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[42%_58%] lg:gap-8 lg:py-24">
        <div className="order-2 lg:order-1">
          <p className="eyebrow text-brand-orange">
            <IconFlame className="h-4 w-4" />
            Lanches em {siteConfig.address.city}
          </p>
          <h1 className="mt-3 text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
            O lanche que
            <br />
            mata sua{" "}
            <span className="text-brand-orange">fome de verdade.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-white/75">
            Burger artesanal feito na chapa, na hora do seu pedido. Entrega
            rápida em {siteConfig.region} e aquele sabor de casa que você
            reconhece no primeiro mordida.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red px-8 py-4 text-lg"
              aria-label="Pedir no WhatsApp em nova aba"
            >
              <IconWhatsApp className="h-5 w-5" />
              Pedir agora
            </a>
            <Link
              href="/cardapio"
              className="btn-outline-light px-8 py-4 text-lg"
            >
              Ver cardápio
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
            <li className="inline-flex items-center gap-2">
              <IconTruck className="h-4 w-4 text-brand-orange" />
              Delivery
            </li>
            <li className="inline-flex items-center gap-2">
              <IconFlame className="h-4 w-4 text-brand-orange" />
              Preparo na hora
            </li>
            <li className="inline-flex items-center gap-2">
              <IconClock className="h-4 w-4 text-brand-orange" />
              {siteConfig.hours}
            </li>
          </ul>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <Image
            src="/images/home.png"
            alt={`Hambúrguer artesanal da ${siteConfig.name}`}
            width={1000}
            height={700}
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="h-auto w-full max-w-sm rounded-2xl object-cover shadow-[0_30px_40px_rgba(0,0,0,0.5)] sm:max-w-md lg:max-w-2xl"
          />
        </div>
      </div>
    </section>
  );
}
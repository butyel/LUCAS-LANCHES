import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { IconTruck, IconClock, IconFlame, IconBurger } from "./icons";

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
          <p className="eyebrow animate-fade-up text-brand-orange">
            <IconFlame className="h-4 w-4" />
            Lanches em {siteConfig.address.city}
          </p>
          <h1
            className="mt-3 animate-fade-up text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "60ms" }}
          >
            Bateu a fome?
            <br />
            A gente{" "}
            <span className="text-brand-orange">resolve.</span>
          </h1>
          <p
            className="mt-5 max-w-xl animate-fade-up text-lg text-white/75"
            style={{ animationDelay: "120ms" }}
          >
            Burger artesanal feito na chapa, na hora do seu pedido. Entrega
            rápida em {siteConfig.region} e aquele sabor de casa que você
            reconhece no primeiro mordida.
          </p>

          <div
            className="mt-8 flex animate-fade-up flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/cardapio#top-seven"
              className="btn-red px-8 py-4 text-lg"
              aria-label="Pedir agora, montar o pedido no cardápio"
            >
              <IconBurger className="h-5 w-5" />
              Pedir agora
            </Link>
            <Link href="/cardapio" className="btn-outline-light px-8 py-4 text-lg">
              Ver cardápio
            </Link>
          </div>

          <ul
            className="mt-8 flex animate-fade-up flex-wrap gap-x-6 gap-y-2 text-sm text-white/70"
            style={{ animationDelay: "240ms" }}
          >
            <li className="inline-flex items-center gap-2">
              <IconTruck className="h-4 w-4 text-brand-orange" />
              Delivery e retirada
            </li>
            <li className="inline-flex items-center gap-2">
              <IconFlame className="h-4 w-4 text-brand-orange" />
              Preparo na hora
            </li>
            <li className="inline-flex items-center gap-2">
              <IconClock className="h-4 w-4 text-brand-orange" />
              Ter a dom, 18h às 23h
            </li>
          </ul>
        </div>

        <div
          className="order-1 flex animate-sheet-in justify-center lg:order-2"
          style={{ animationDelay: "80ms" }}
        >
          <Image
            src="/images/home.jpg"
            alt={`Hambúrguer artesanal da ${siteConfig.name}`}
            width={1000}
            height={1000}
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="h-auto w-full max-w-sm rounded-2xl object-cover shadow-[0_30px_40px_rgba(0,0,0,0.5)] sm:max-w-md lg:max-w-2xl"
          />
        </div>
      </div>
    </section>
  );
}
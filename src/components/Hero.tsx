import Image from "next/image";
import Link from "next/link";
import { whatsappLink } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/images/icons/pattern.svg')",
          backgroundSize: "220px",
        }}
        aria-hidden="true"
      />
      <div className="container-site relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:py-20">
        <div className="max-w-xl">
          <p className="font-signature text-2xl text-brand-green">
            Feito na chapa, na hora
          </p>
          <h1 className="mt-2 font-block text-5xl uppercase leading-[0.95] tracking-tight text-brand-ink sm:text-6xl lg:text-7xl">
            Peca agora e{" "}
            <span className="text-brand-red">receba em casa</span>
          </h1>
          <p className="mt-5 text-lg text-brand-ink/70">
            Hamburqueres artesanais com ingredientes frescos e aquele sabor de
            casa. Entrega rapida em toda Presidente Epitacio e regioes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-red px-8 py-4 text-lg"
              aria-label="Pedir no WhatsApp em nova aba"
            >
              Pedir no WhatsApp
            </a>
            <Link href="/cardapio" className="btn-green-outline px-8 py-4 text-lg">
              Ver cardapio
            </Link>
          </div>
        </div>

        <div className="relative flex justify-center">
          <Image
            src="/images/hero-burger.svg"
            alt="Hamburguer artesanal Lucas Lanches"
            width={560}
            height={420}
            priority
            className="h-auto w-full max-w-md drop-shadow-2xl sm:max-w-lg lg:max-w-xl"
          />
        </div>
      </div>
    </section>
  );
}
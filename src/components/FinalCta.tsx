import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import { IconWhatsApp } from "./icons";

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-brand-red py-16 text-white sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('/images/icons/pattern.svg')",
          backgroundSize: "200px",
        }}
        aria-hidden="true"
      />
      <div className="container-site relative text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/80">
          Bateu a fome?
        </p>
        <h2 className="mx-auto mt-2 max-w-2xl text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
          Escolha seu lanche favorito e peça agora
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/85">
          Burger na chapa, ingredientes frescos e entrega rápida até você. Seu
          lanche está a um toque de distância.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/cardapio"
            className="btn-outline-light px-8 py-4 text-lg"
            aria-label="Ver cardápio completo"
          >
            Ver cardápio
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-green px-8 py-4 text-lg"
            aria-label="Pedir agora pelo WhatsApp em nova aba"
          >
            <IconWhatsApp className="h-5 w-5" />
            Pedir agora
          </a>
        </div>
      </div>
    </section>
  );
}
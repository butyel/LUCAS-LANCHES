import Link from "next/link";
import { IconArrowRight, IconBurger } from "./icons";

export default function MidCta() {
  return (
    <section className="bg-white">
      <div className="container-site py-10 sm:py-14">
        <div className="flex flex-col items-center justify-between gap-5 rounded-2xl bg-brand-ink px-6 py-8 text-center text-white sm:flex-row sm:px-10 sm:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-brand-orange">
              Monte seu pedido
            </p>
            <h2 className="mt-1 font-block text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Escolha seus lanches e adicione seus acréscimos
            </h2>
          </div>
          <Link
            href="/cardapio"
            className="btn-red shrink-0 px-7 py-3.5 text-base"
            aria-label="Ir para o cardápio e montar o pedido"
          >
            <IconBurger className="h-5 w-5" />
            Ir para o cardápio
            <IconArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
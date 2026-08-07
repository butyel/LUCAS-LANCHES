import type { Metadata } from "next";
import Image from "next/image";
import Institucional from "@/components/Institucional";
import Avaliacoes from "@/components/Avaliacoes";
import { siteConfig, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o Lucas Lanches | Hamburgueria em Presidente Epitácio",
  description:
    "Conheça a história da Lucas Lanches: hamburgueria artesanal em Presidente Epitácio - SP. Local, horário de funcionamento, delivery e retirada pelo WhatsApp.",
};

export default function SobreNosPage() {
  return (
    <div>
      <div className="bg-brand-green py-14 text-center text-white">
        <div className="container-site">
          <h1 className="font-block text-4xl uppercase tracking-tight sm:text-5xl">
            Sobre a {siteConfig.name}
          </h1>
          <p className="mt-2 text-white/75">
            Sabor de casa, feito na chapa e entregue com carinho.
          </p>
        </div>
      </div>

      <div className="container-site grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 className="section-title">Como tudo comecou</h2>
          <div className="space-y-4 text-lg text-brand-ink/75">
            <p>
              A {siteConfig.name} comecou como um projeto de familia, com uma
              chapa simples e a vontade de servir um hamburguer de verdade.
              Nada de industrializados: carne fresca, pao artesanal e molhos
              feitos na casa.
            </p>
            <p>
              O nome vem do fundador, que assinava cada hamburguer com o mesmo
              capricho de quem assina um pedido especial. Esse cuidado segue
              em cada embalagem que sai da nossa cozinha.
            </p>
            <p>
              Hoje entregamos para Presidente Epitacio e regia, com rapidez e
              a mesma receita que continua prendendo o cliente por aqui.
            </p>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red mt-8 px-8 py-4 text-lg"
            aria-label="Fazer pedido pelo WhatsApp em nova aba"
          >
            Quero experimentar
          </a>
        </div>
        <Image
          src="/images/store.svg"
          alt={`Estabelecimento ${siteConfig.name}`}
          width={640}
          height={480}
          className="h-auto w-full rounded-2xl shadow-card"
        />
      </div>

      <Institucional />
      <Avaliacoes />
    </div>
  );
}
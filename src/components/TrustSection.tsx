import { IconWhatsApp, IconFlame, IconTruck, IconClock, IconCheck } from "./icons";

const items = [
  {
    icon: IconFlame,
    title: "Feito na hora",
    text: "Burger na chapa assim que você pede.",
  },
  {
    icon: IconWhatsApp,
    title: "Pedido pelo WhatsApp",
    text: "Monte tudo e finalize em poucos toques.",
  },
  {
    icon: IconTruck,
    title: "Entrega e retirada",
    text: "Receba em casa ou retire no balcão.",
  },
  {
    icon: IconClock,
    title: "Ter a dom, 18h às 23h",
    text: "Sempre que bater a fome à noite.",
  },
];

export default function TrustSection() {
  return (
    <section
      aria-labelledby="trust-title"
      className="border-y border-brand-line bg-brand-sand/60 py-12 sm:py-16"
    >
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Por que a Lucas Lanches?</p>
          <h2 id="trust-title" className="section-title mt-1">
            Sabor de hamburgueria de verdade
          </h2>
          <p className="mt-3 text-brand-ink/70">
            Ingredientes frescos, preparo caprichado e o seu pedido a poucos
            toques de distância.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <li
                key={it.title}
                className="flex items-start gap-3 rounded-2xl border border-brand-line bg-white p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-bold uppercase tracking-tight text-brand-ink">
                    {it.title}
                  </span>
                  <span className="mt-0.5 block text-sm text-brand-ink/65">
                    {it.text}
                  </span>
                </span>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-brand-ink/60">
          <IconCheck className="h-4 w-4 text-brand-green" />
          Atendimento direto e sem enrolação com a equipe da casa.
        </p>
      </div>
    </section>
  );
}
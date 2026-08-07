import { IconTruck, IconFlame, IconClock, IconWhatsApp } from "./icons";

const benefits = [
  {
    icon: IconFlame,
    title: "Feito na hora",
    text: "Burger preparado na chapa assim que você pede. Nada de coisa requentada.",
  },
  {
    icon: IconTruck,
    title: "Entrega rápida",
    text: "Leva o seu lanche quente pela cidade. Taxa de entrega confirmada na hora do pedido.",
  },
  {
    icon: IconWhatsApp,
    title: "Pedido fácil",
    text: "Monte seu lanche e peça pelo WhatsApp em poucos toques, sem burocracia.",
  },
  {
    icon: IconClock,
    title: "Até tarde em Epitácio",
    text: "Atendemos de terça a domingo, das 18h às 23h. Sua noite merece um lanche a altura.",
  },
];

export default function Benefits() {
  return (
    <section
      aria-labelledby="benefits-title"
      className="bg-white py-16 sm:py-20"
    >
      <div className="container-site">
        <div className="mb-10 text-center">
          <p className="section-kicker">Por que a Lucas Lanches?</p>
          <h2
            id="benefits-title"
            className="section-title mt-1 sm:mx-auto sm:max-w-2xl"
          >
            Por que pedir no Lucas Lanches?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-ink/70 sm:mx-auto">
            Sabor de hamburgueria de verdade, do jeito que você merece, sem sair
            de casa.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="rounded-2xl border border-brand-line bg-brand-cream p-6 text-center transition-colors hover:border-brand-red"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-4 text-lg font-bold uppercase tracking-tight text-brand-ink">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">
                  {b.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
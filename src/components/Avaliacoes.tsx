import avaliacoes from "@/data/avaliacoes.json";
import { siteConfig } from "@/lib/site";
import { IconStar } from "./icons";

function Estrelas({ nota }: { nota: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Avaliação ${nota} de 5 estrelas`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <IconStar
          key={n}
          className="h-4 w-4"
          filled={n <= nota}
        />
      ))}
    </div>
  );
}

export default function Avaliacoes() {
  return (
    <section
      id="avaliacoes"
      aria-labelledby="reviews-title"
      className="bg-white py-16 sm:py-20"
    >
      <div className="container-site">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="section-kicker">Avaliações</p>
            <h2 id="reviews-title" className="section-title mt-1">
              Quem provou, recomendou
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-brand-line bg-brand-cream px-5 py-3">
            <span className="text-4xl font-bold text-brand-orange">
              {avaliacoes.notaMedia}
            </span>
            <div>
              <Estrelas nota={Math.round(avaliacoes.notaMedia)} />
              <p className="mt-1 text-xs text-brand-ink/60">
                {avaliacoes.total} avaliações no {siteConfig.address.city}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {avaliacoes.avaliacoes.map((av) => (
            <figure
              key={av.id}
              className="flex flex-col rounded-2xl bg-brand-cream p-5 ring-1 ring-brand-line"
            >
              <Estrelas nota={av.nota} />
              <blockquote className="mt-3 flex-1 leading-relaxed text-brand-ink/80">
                “{av.comentario}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green font-block text-lg uppercase text-white">
                  {av.nome.charAt(0)}
                </span>
                <span className="font-bold text-brand-ink">{av.nome}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
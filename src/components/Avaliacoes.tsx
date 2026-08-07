import avaliacoes from "@/data/avaliacoes.json";

function Estrelas({ nota }: { nota: number }) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`Avaliação ${nota} de 5 estrelas`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill={n <= nota ? "#F2551C" : "#D8D8D8"}
        >
          <path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 16.9 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z" />
        </svg>
      ))}
    </div>
  );
}

export default function Avaliacoes() {
  return (
    <section id="avaliacoes" className="bg-brand-gray py-16 sm:py-20">
      <div className="container-site">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <h2 className="section-title mb-0">
            Quem provou, recomendou
          </h2>
          <p className="font-block text-2xl uppercase text-brand-red">
            {avaliacoes.notaMedia} / 5 · {avaliacoes.total} avaliacoes
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {avaliacoes.avaliacoes.map((av) => (
            <figure
              key={av.id}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-card"
            >
              <Estrelas nota={av.nota} />
              <blockquote className="mt-3 flex-1 text-brand-ink/80">
                “{av.comentario}”
              </blockquote>
              <figcaption className="mt-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green font-block text-lg uppercase text-white">
                  {av.nome.charAt(0)}
                </span>
                <span className="font-semibold text-brand-ink">
                  {av.nome}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
import Link from "next/link";
import { categories, categoryIcon } from "@/lib/menu";

export default function CardapioPreview() {
  return (
    <section className="bg-brand-cream">
      <div className="container-site border-b border-brand-line py-8">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/cardapio#${cat.toLowerCase()}`}
              className="group flex shrink-0 items-center gap-2.5 rounded-full border-2 border-brand-line bg-white px-5 py-3 font-block text-lg uppercase tracking-wide text-brand-ink transition-all hover:-translate-y-0.5 hover:border-brand-red hover:text-brand-red"
            >
              <span aria-hidden="true" className="text-xl">
                {categoryIcon[cat]}
              </span>
              {cat}
            </Link>
          ))}
          <Link
            href="/cardapio"
            className="shrink-0 rounded-full bg-brand-red px-5 py-3 font-block text-lg uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5"
          >
            Ver todos
          </Link>
        </div>
      </div>
    </section>
  );
}
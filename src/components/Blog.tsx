import Image from "next/image";
import Link from "next/link";
import posts from "@/data/blog.json";

export function formatarData(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function Blog() {
  const ultimos = posts.slice(0, 3);
  return (
    <section id="blog" className="bg-white py-16 sm:py-20">
      <div className="container-site">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="section-title mb-0">Do nosso blog</h2>
          <Link
            href="/blog"
            className="font-block text-lg uppercase text-brand-red hover:underline"
          >
            Ver todos
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ultimos.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-cardHover"
            >
              <div className="aspect-[16/10] overflow-hidden bg-brand-gray">
                <Image
                  src={post.imagem}
                  alt={post.titulo}
                  width={560}
                  height={350}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <time className="text-xs uppercase tracking-wide text-brand-ink/50">
                  {formatarData(post.data)}
                </time>
                <h3 className="mt-2 font-block text-xl uppercase text-brand-green group-hover:text-brand-red">
                  {post.titulo}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-brand-ink/70">
                  {post.conteudo[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
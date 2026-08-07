import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import posts from "@/data/blog.json";
import { formatarData } from "@/components/Blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Dicas, receitas e a historia da Lucas Lanches.",
};

export default function BlogPage() {
  return (
    <div className="bg-brand-gray">
      <div className="bg-brand-green py-14 text-center text-white">
        <div className="container-site">
          <h1 className="font-block text-4xl uppercase tracking-tight sm:text-5xl">
            Blog {siteConfig.name}
          </h1>
          <p className="mt-2 text-white/75">
            Receitas, curiosidades e novidades da casa.
          </p>
        </div>
      </div>

      <div className="container-site py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-cardHover"
            >
              <div className="aspect-[16/9] overflow-hidden bg-brand-gray">
                <Image
                  src={post.imagem}
                  alt={post.titulo}
                  width={640}
                  height={360}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <time className="text-xs uppercase tracking-wide text-brand-ink/50">
                  {formatarData(post.data)}
                </time>
                <h2 className="mt-2 font-block text-xl uppercase text-brand-green group-hover:text-brand-red">
                  {post.titulo}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-brand-ink/70">
                  {post.conteudo[0]}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
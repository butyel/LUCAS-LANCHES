import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import posts from "@/data/blog.json";
import { formatarData } from "@/components/Blog";
import { siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.titulo,
    description: post.conteudo[0],
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <article className="bg-white">
      <div className="bg-brand-green py-12 text-center text-white">
        <div className="container-site">
          <time className="text-xs uppercase tracking-wide text-white/70">
            {formatarData(post.data)}
          </time>
          <h1 className="mx-auto mt-2 max-w-3xl font-block text-3xl uppercase leading-tight tracking-tight sm:text-4xl">
            {post.titulo}
          </h1>
        </div>
      </div>

      <div className="container-site max-w-3xl py-12">
        <div className="mb-8 overflow-hidden rounded-2xl">
          <Image
            src={post.imagem}
            alt={post.titulo}
            width={960}
            height={540}
            className="h-auto w-full"
          />
        </div>

        <div className="space-y-5 text-lg leading-relaxed text-brand-ink/80">
          {post.conteudo.map((paragrafo, index) => (
            <p key={index}>{paragrafo}</p>
          ))}
        </div>

        <div className="mt-10 rounded-2xl bg-brand-gray p-6 text-center">
          <p className="font-block text-2xl uppercase text-brand-green">
            Achei bom demais?
          </p>
          <p className="mt-1 text-brand-ink/70">
            Pedido na hora com quem entende de sabor.
          </p>
          <Link href="/cardapio" className="btn-red mt-4 px-6 py-3">
            Ver o cardapio
          </Link>
        </div>
      </div>
    </article>
  );
}
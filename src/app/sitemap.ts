import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import posts from "@/data/blog.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const rotas = [
    "",
    "/cardapio",
    "/cupons",
    "/blog",
    "/sobre-nos",
  ];

  const paginas: MetadataRoute.Sitemap = rotas.map((rota) => ({
    url: `${base}${rota}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: rota === "" ? 1 : 0.7,
  }));

  const blog: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(`${post.data}T00:00:00`),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...paginas, ...blog];
}
import cardapioRaw from "@/data/cardapio.json";
import acrescimos from "@/data/acrescimos.json";

export type CategoryId =
  | "lanches"
  | "especiais"
  | "top-seven"
  | "combos"
  | "batatas"
  | "refrigerantes";

export type Option = {
  nome: string;
  preco: number;
};

export type MenuItem = {
  id: string;
  categoria: CategoryId;
  categoriaNome: string;
  nome: string;
  descricao: string;
  preco?: number;
  imagem: string;
  destaque?: boolean;
  options?: Option[];
};

export type Acrescimo = {
  id: string;
  nome: string;
  preco: number;
};

export const categories: { id: CategoryId; nome: string; icon: string }[] = [
  { id: "lanches", nome: "Lanches", icon: "🍔" },
  { id: "especiais", nome: "Hot Dogs e Especiais", icon: "🌭" },
  { id: "top-seven", nome: "Top Seven", icon: "⭐" },
  { id: "combos", nome: "Combos", icon: "🔥" },
  { id: "batatas", nome: "Batatas", icon: "🍟" },
  { id: "refrigerantes", nome: "Refrigerantes", icon: "🥤" },
];

export function categoryName(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.nome ?? id;
}

/** Preço base de um item (considera opções quando existem). */
export function basePrice(item: MenuItem): number {
  if (item.options?.length) return item.options[0].preco;
  return item.preco ?? 0;
}

/** Preço máximo (para exibir faixa em itens com opções). */
export function maxPrice(item: MenuItem): number {
  if (item.options?.length) {
    return item.options[item.options.length - 1].preco;
  }
  return item.preco ?? 0;
}

/** True quando o item aceita acréscimos (lanches, hot dogs/especiais, top seven). */
export function supportsAcrescimos(item: MenuItem): boolean {
  return (
    item.categoria === "lanches" ||
    item.categoria === "especiais" ||
    item.categoria === "top-seven"
  );
}

export const cardapio = cardapioRaw as MenuItem[];

export const combos = cardapio.filter((item) => item.categoria === "combos");
export const topSeven = cardapio.filter((item) => item.destaque === true);
export const batatas = cardapio.filter((item) => item.categoria === "batatas");

export { acrescimos };

/** Valida a consistência dos dados (console warn em dev). */
export function validateMenu(): string[] {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();

  for (const item of cardapio) {
    if (!item.id) errors.push("Item sem id");
    if (seenIds.has(item.id)) errors.push(`ID duplicado: ${item.id}`);
    seenIds.add(item.id);

    if (!item.nome || !item.nome.trim()) errors.push("Item com nome vazio");
    if (!item.categoria) errors.push(`Item sem categoria: ${item.nome}`);
    if (item.preco === undefined && !item.options)
      errors.push(`Item sem preço: ${item.nome}`);

    if (item.preco !== undefined && (!Number.isFinite(item.preco) || item.preco <= 0))
      errors.push(`Preço inválido: ${item.nome} (${item.preco})`);

    if (item.options) {
      for (const opt of item.options) {
        if (opt.preco === undefined || !Number.isFinite(opt.preco) || opt.preco < 0)
          errors.push(`Opção sem preço válido: ${item.nome} - ${opt.nome}`);
      }
    }

    const slug = slugify(item.nome);
    if (seenSlugs.has(slug)) errors.push(`Slug duplicado (gerado): ${slug}`);
    seenSlugs.add(slug);
  }

  return errors;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

if (process.env.NODE_ENV === "development") {
  const errors = validateMenu();
  if (errors.length) {
    console.warn("[cardapio] Inconsistências encontradas:", errors);
  }
}
import cardapio from "@/data/cardapio.json";

export type MenuItem = (typeof cardapio)[number];

export const categories: MenuItem["categoriaNome"][] = [
  "Burgers",
  "Combos",
  "Porções",
  "Bebidas",
  "Sobremesas",
];

export const categoryIcon: Record<MenuItem["categoriaNome"], string> = {
  Burgers: "🍔",
  Combos: "🔥",
  Porções: "🍟",
  Bebidas: "🥤",
  Sobremesas: "🍨",
};

export type Badge = "MAIS PEDIDO" | "OFERTA" | "COMBO";

export function getBadges(item: MenuItem): Badge[] {
  const badges: Badge[] = [];
  if (item.precoPromo) badges.push("OFERTA");
  if (item.categoria === "combos") badges.push("COMBO");
  if (item.destaque && item.categoria === "burgers") badges.push("MAIS PEDIDO");
  return badges;
}

export const featured = cardapio.filter((item) => item.destaque);
export const combos = cardapio.filter((item) => item.categoria === "combos");
export const promos = cardapio.filter((item) => item.precoPromo);

export { cardapio };
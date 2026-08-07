export const siteConfig = {
  name: "Lucas Lanches",
  brandFull: "Lucas Lanches",
  tagline: "Hambúrgueres artesanais que trazem aquele sabor de casa.",
  url: "https://lucas-lanches-hamburgueria.vercel.app",
  whatsapp: "18997861957",
  whatsappDisplay: "(18) 99786-1957",
  phoneDisplay: "(18) 99786-1957",
  email: "contato@lucaslanches.com.br",
  city: "Presidente Epitácio",
  state: "SP",
  region: "Presidente Epitácio e região",
  address: {
    street: "Rua José Dirceu da Silva, 3-128",
    district: "Granjas Agrícolas Helvécio",
    city: "Presidente Epitácio",
    state: "SP",
    cep: "19475-336",
  },
  hours: "Ter a Dom, das 18h às 23h",
  opens: "18:00",
  closes: "23:00",
  currency: "R$",
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },
  rating: 4.8,
  ratingCount: "1200",
} as const;

const defaultText = encodeURIComponent(
  `Olá! Vim pelo site da ${siteConfig.name} e quero fazer um pedido.`
);

export const whatsappLink = `https://wa.me/${siteConfig.whatsapp}?text=${defaultText}`;

export const mapDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.city} - ${siteConfig.address.state}`
)}`;

export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.district}, ${siteConfig.address.city} - ${siteConfig.address.state}`
)}&z=16&output=embed`;

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export type OrderItem = {
  name: string;
  qty: number;
  price: number;
  variation?: string;
  notes?: string;
  addons?: { name: string; price: number }[];
};

/**
 * Monta um pedido contextual para o WhatsApp.
 * Preserva o fluxo de pedido 100% via WhatsApp já usado pelo site.
 */
export function buildWhatsAppOrder(
  items: OrderItem[],
  options: { pickup?: boolean; address?: string; notes?: string } = {}
): string {
  const lines: string[] = [];
  let total = 0;

  for (const item of items) {
    const addonsTotal = (item.addons ?? []).reduce((s, a) => s + a.price, 0);
    const unitTotal = item.price + addonsTotal;
    const lineTotal = unitTotal * item.qty;
    total += lineTotal;

    const variation = item.variation ? ` (${item.variation})` : "";
    lines.push(`${item.qty}x ${item.name}${variation} — ${formatPrice(lineTotal)}`);

    if (item.addons?.length) {
      for (const a of item.addons) {
        lines.push(`  + ${a.name} (+${formatPrice(a.price)})`);
      }
    }
  }

  lines.push("");
  lines.push(`*Total: ${formatPrice(total)}*`);

  const allNotes = items
    .map((i) => i.notes)
    .filter((n) => n && n.trim());
  if (allNotes.length) {
    lines.push("");
    lines.push("Observações:");
    allNotes.forEach((n) => lines.push(`- ${n}`));
  }
  if (options.notes && options.notes.trim()) {
    lines.push("");
    lines.push(`Observação do pedido:\n${options.notes.trim()}`);
  }

  const forma = options.pickup ? "Retirada" : "Entrega";
  lines.push("");
  lines.push(`Forma: ${forma}`);
  if (!options.pickup) {
    lines.push(`Taxa de entrega: a confirmar na conversa.`);
  }

  const mensagem = `Olá! Vim pelo site da ${
    siteConfig.name
  } e gostaria de fazer este pedido:\n\n${lines.join("\n")}`;

  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}
export const siteConfig = {
  name: "Lucas Lanches",
  brandFull: "Lucas Lanches",
  tagline: "Hambúrgueres artesanais que trazem aquele sabor de casa.",
  url: "https://lucas-lanches-hamburgueria.vercel.app",
  whatsapp: "5518997861957",
  whatsappDisplay: "(18) 99786-1957",
  phoneDisplay: "(18) 99786-1957",
  email: "contato@lucaslanches.com.br",
  address: {
    street: "Rua José Dirceu da Silva, 3-128",
    district: "Granjas Agrícolas Helvécio",
    city: "Presidente Epitácio",
    state: "SP",
    cep: "19475-336",
  },
  hours: "Ter a Dom, das 18h às 23h",
  deliveryFreeAbove: 79,
  currency: "R$",
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    whatsapp: `https://wa.me/5511999999999`,
  },
};

export const whatsappLink = `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Lucas Lanches e quero fazer um pedido."
)}`;

export const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.district}, ${siteConfig.address.city} - ${siteConfig.address.state}`
)}&z=16&output=embed`;

export function formatPrice(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function buildWhatsAppOrder(itemsLabel: string, total: number): string {
  const text = encodeURIComponent(
    `Olá! Vim pelo site da Lucas Lanches.\nPedido: ${itemsLabel}\nTotal: ${formatPrice(total)}`
  );
  return `https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}?text=${text}`;
}
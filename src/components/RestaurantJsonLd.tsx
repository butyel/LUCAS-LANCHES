import { siteConfig } from "@/lib/site";
import cardapio from "@/data/cardapio.json";

/**
 * Dados estruturados JSON-LD gerados a partir de src/lib/site.ts e do
 * cardápio real (src/data/cardapio.json). Nenhum dado é inventado.
 */
export default function RestaurantJsonLd() {
  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    image: [`${siteConfig.url}/images/og.svg`],
    logo: `${siteConfig.url}/icon.svg`,
    url: siteConfig.url,
    telephone: `+55${siteConfig.whatsapp}`,
    priceRange: "$$",
    servesCuisine: "Hamburgueria",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.cep,
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: siteConfig.opens,
        closes: siteConfig.closes,
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.rating,
      reviewCount: siteConfig.ratingCount,
      bestRating: 5,
    },
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      `https://wa.me/${siteConfig.whatsapp}`,
    ],
  };

  const menu = {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: `Cardápio ${siteConfig.name}`,
    url: `${siteConfig.url}/cardapio`,
    hasMenuSection: [
      ...new Set(cardapio.map((item) => item.categoriaNome)),
    ].map((categoria) => ({
      "@type": "MenuSection",
      name: categoria,
      hasMenuItem: cardapio
        .filter((item) => item.categoriaNome === categoria)
        .map((item) => ({
          "@type": "MenuItem",
          name: item.nome,
          description: item.descricao,
          offers: {
            "@type": "Offer",
            price: item.precoPromo ?? item.preco,
            priceCurrency: "BRL",
            availability: "https://schema.org/InStock",
          },
        })),
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pt-BR",
  };

  const items = [restaurant, menu, website];

  return (
    <>
      {items.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
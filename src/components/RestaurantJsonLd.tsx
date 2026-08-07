import { siteConfig } from "@/lib/site";

/**
 * Dados estruturados JSON-LD do tipo Restaurant, gerados automaticamente
 * a partir de src/lib/site.ts.
 */
export default function RestaurantJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    image: `${siteConfig.url}/images/og.svg`,
    url: siteConfig.url,
    telephone: siteConfig.phoneDisplay,
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
        opens: "18:00",
        closes: "23:00",
      },
    ],
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
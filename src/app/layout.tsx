import type { Metadata, Viewport } from "next";
import { Kaushan_Script, Bebas_Neue, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderBar from "@/components/OrderBar";
import AppProviders from "@/components/AppProviders";
import RestaurantJsonLd from "@/components/RestaurantJsonLd";
import "./globals.css";

const signature = Kaushan_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
});

const block = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-block",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#E8291B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Lucas Lanches em Presidente Epitácio | Lanches e Delivery",
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Lucas Lanches: hambúrguer artesanal, lanches e delivery em Presidente Epitácio - SP. Pedido fácil pelo WhatsApp, preparo na hora e entrega na sua casa.",
  applicationName: siteConfig.name,
  keywords: [
    "Lucas Lanches",
    "lanches em Presidente Epitácio",
    "hamburgueria em Presidente Epitácio",
    "lanchonete Presidente Epitácio",
    "delivery de lanches Presidente Epitácio",
    "hambúrguer Presidente Epitácio",
  ],
  category: "food",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "pt_BR",
    url: siteConfig.url,
    title: `${siteConfig.name} em ${siteConfig.address.city} | Lanches e Delivery`,
    description:
      "Hambúrguer artesanal e delivery em Presidente Epitácio - SP. Peça pelo WhatsApp e receba na hora.",
    images: [
      {
        url: "/images/og.svg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - hambúrguer artesanal`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} em ${siteConfig.address.city}`,
    description: "Lanches artesanais com delivery em Presidente Epitácio - SP.",
    images: ["/images/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${signature.variable} ${block.variable} ${body.variable}`}
    >
      <body className="font-body">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <AppProviders>
          <Header />
          <RestaurantJsonLd />
          <main id="conteudo">{children}</main>
          <Footer />
          <OrderBar />
          {/* Espaço para a bottom navigation mobile */}
          <div
            aria-hidden="true"
            className="h-[calc(56px+env(safe-area-inset-bottom))] md:hidden"
          />
        </AppProviders>
      </body>
    </html>
  );
}
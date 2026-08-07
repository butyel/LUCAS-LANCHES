import type { Metadata, Viewport } from "next";
import { Kaushan_Script, Bebas_Neue, Inter } from "next/font/google";
import { siteConfig } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
  themeColor: "#E8291E",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Delivery de Hamburguer Artesanal`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "pt_BR",
    images: [
      {
        url: "/images/og.svg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
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
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-brand-red focus:px-4 focus:py-2 focus:text-white"
        >
          Pular para o conteudo
        </a>
        <Header />
        <RestaurantJsonLd />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
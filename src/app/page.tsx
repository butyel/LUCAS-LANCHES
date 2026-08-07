import type { Metadata } from "next";
import Hero from "@/components/Hero";
import CardapioPreview from "@/components/CardapioPreview";
import FeaturedMenu from "@/components/FeaturedMenu";
import CombosSection from "@/components/CombosSection";
import MidCta from "@/components/MidCta";
import TrustSection from "@/components/TrustSection";
import Location from "@/components/Location";
import Faq from "@/components/Faq";
import Blog from "@/components/Blog";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "Lucas Lanches em Presidente Epitácio | Lanches e Delivery",
  description:
    "Hambúrguer artesanal em Presidente Epitácio - SP. Delivery e retirada, preparo na hora e pedido fácil pelo WhatsApp. Veja o cardápio e peça agora.",
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CardapioPreview />
      <FeaturedMenu />
      <CombosSection />
      <MidCta />
      <TrustSection />
      <Location />
      <Faq />
      <Blog />
      <FinalCta />
    </>
  );
}
import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PromoBanner from "@/components/PromoBanner";
import FeaturedMenu from "@/components/FeaturedMenu";
import CombosSection from "@/components/CombosSection";
import Benefits from "@/components/Benefits";
import AboutSection from "@/components/AboutSection";
import Location from "@/components/Location";
import Cupons from "@/components/Cupons";
import Avaliacoes from "@/components/Avaliacoes";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Blog from "@/components/Blog";
import CardapioPreview from "@/components/CardapioPreview";

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
      <PromoBanner />
      <CardapioPreview />
      <FeaturedMenu />
      <CombosSection />
      <Benefits />
      <AboutSection />
      <Cupons />
      <Avaliacoes />
      <Location />
      <Faq />
      <Blog />
      <FinalCta />
    </>
  );
}
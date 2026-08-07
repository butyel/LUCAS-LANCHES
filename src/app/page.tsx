import Hero from "@/components/Hero";
import Cardapio from "@/components/Cardapio";
import Promocoes from "@/components/Promocoes";
import Cupons from "@/components/Cupons";
import Institucional from "@/components/Institucional";
import Avaliacoes from "@/components/Avaliacoes";
import Blog from "@/components/Blog";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Promocoes />
      <Cardapio />
      <Cupons />
      <Institucional />
      <Avaliacoes />
      <Blog />
    </>
  );
}
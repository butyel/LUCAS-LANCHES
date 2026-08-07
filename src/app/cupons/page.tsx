import Cupons from "@/components/Cupons";

export default function CuponsPage() {
  return (
    <div>
      <div className="bg-brand-green py-14 text-center text-white">
        <div className="container-site">
          <h1 className="font-block text-4xl uppercase tracking-tight sm:text-5xl">
            Cupons de desconto
          </h1>
          <p className="mt-2 text-white/75">
            Copie o codigo e use no seu pedido pelo WhatsApp.
          </p>
        </div>
      </div>
      <Cupons />
    </div>
  );
}
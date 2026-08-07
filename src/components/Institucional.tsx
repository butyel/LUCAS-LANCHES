import Image from "next/image";
import { siteConfig, mapEmbedSrc } from "@/lib/site";

export default function Institucional() {
  return (
    <section id="sobre" className="bg-white py-16 sm:py-20">
      <div className="container-site">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <Image
              src="/images/store.svg"
              alt="Estabelecimento Lucas Lanches"
              width={640}
              height={480}
              loading="lazy"
              className="h-auto w-full rounded-2xl shadow-card"
            />
          </div>

          <div>
            <h2 className="section-title">Uma historia de sabor</h2>
            <p className="text-lg text-brand-ink/75">
              A {siteConfig.name} nasceu da vontade de servir um hamburguer
              honesto, feito na chapa e com ingredientes frescos. O que comecou
              como uma chapa na garagem hoje entrega para toda a cidade de
              Presidente Epitacio e regiao.
            </p>
            <address className="mt-6 space-y-2 not-italic text-brand-ink/75">
              <p className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F4A1E" strokeWidth="2" aria-hidden="true">
                  <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {siteConfig.address.street}, {siteConfig.address.district},{" "}
                {siteConfig.address.city} - {siteConfig.address.state},{" "}
                {siteConfig.address.cep}
              </p>
              <p className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F4A1E" strokeWidth="2" aria-hidden="true">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M12 18h.01" />
                </svg>
                {siteConfig.hours}
              </p>
              <p className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2F4A1E" strokeWidth="2" aria-hidden="true">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 5.9 5.9l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
                </svg>
                {siteConfig.phoneDisplay}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl shadow-card">
          <iframe
            src={mapEmbedSrc}
            title="Mapa - Lucas Lanches"
            width="100%"
            height="360"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
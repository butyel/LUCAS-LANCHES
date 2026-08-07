import { siteConfig, mapEmbedSrc, mapDirectionsUrl, whatsappLink } from "@/lib/site";
import { IconPin, IconClock, IconPhone, IconWhatsApp } from "./icons";

export default function Location() {
  return (
    <section
      id="localizacao"
      aria-labelledby="location-title"
      className="bg-brand-ink py-16 text-white sm:py-20"
    >
      <div className="container-site">
        <div className="mb-10">
          <p className="section-kicker text-brand-orange">Onde estamos</p>
          <h2 id="location-title" className="section-title section-title--light mt-1">
            Retire aqui ou peça por delivery
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <iframe
              src={mapEmbedSrc}
              title={`Mapa - ${siteConfig.name}`}
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <address className="flex flex-col justify-center space-y-5 not-italic">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-brand-orange">
                <IconPin className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                  Endereço
                </h3>
                <p className="mt-1 text-white/75">
                  {siteConfig.address.street}, {siteConfig.address.district}.{" "}
                  {siteConfig.address.city} - {siteConfig.address.state},{" "}
                  {siteConfig.address.cep}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-brand-orange">
                <IconClock className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                  Horário
                </h3>
                <p className="mt-1 text-white/75">{siteConfig.hours}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-brand-orange">
                <IconPhone className="h-6 w-6" />
              </span>
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">
                  Pedidos e contato
                </h3>
                <p className="mt-1 text-white/75">{siteConfig.whatsappDisplay}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light px-6 py-3 text-base"
                aria-label="Traçar rota até a Lucas Lanches"
              >
                Como chegar
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp px-6 py-3 text-base"
                aria-label="Pedir pelo WhatsApp em nova aba"
              >
                <IconWhatsApp className="h-5 w-5" />
                Pedir por delivery
              </a>
            </div>
          </address>
        </div>
      </div>
    </section>
  );
}
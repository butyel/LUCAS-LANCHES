import Image from "next/image";
import type { MenuItem } from "@/lib/menu";
import { getBadges } from "@/lib/menu";
import { formatPrice } from "@/lib/site";
import { cn } from "@/lib/utils";
import { IconPlus } from "./icons";

type ProductCardProps = {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  className?: string;
  eager?: boolean;
};

const badgeStyle: Record<string, string> = {
  OFERTA: "bg-brand-orange text-white",
  COMBO: "bg-brand-ink text-white",
  "MAIS PEDIDO": "bg-brand-green text-white",
};

export default function ProductCard({
  item,
  onSelect,
  className,
  eager,
}: ProductCardProps) {
  const badges = getBadges(item);
  const price = item.precoPromo ?? item.preco;

  return (
    <article
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-brand-line transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(item)}
        aria-label={`Ver ${item.nome}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-brand-sand"
      >
        {badges.length > 0 && (
          <span
            className={cn(
              "absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white",
              badgeStyle[badges[0]]
            )}
          >
            {badges[0]}
          </span>
        )}
        <Image
          src={item.imagem}
          alt={item.nome}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold uppercase leading-none tracking-tight text-brand-ink">
            {item.nome}
          </h3>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-ink/65">
          {item.descricao}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-brand-line pt-4">
          <div className="flex items-baseline gap-2">
            {item.precoPromo && (
              <span className="text-sm text-brand-ink/45 line-through">
                {formatPrice(item.preco)}
              </span>
            )}
            <span className="price">{formatPrice(price)}</span>
          </div>
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="btn-red px-4 py-2.5 text-xs"
            aria-label={`Pedir ${item.nome}`}
          >
            <span className="sm:hidden">Pedir</span>
            <IconPlus className="mx-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
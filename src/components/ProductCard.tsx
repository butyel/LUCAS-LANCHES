import Image from "next/image";
import type { MenuItem } from "@/lib/menu";
import { basePrice, maxPrice } from "@/lib/menu";
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
  COMBO: "bg-brand-ink text-white",
  "TOP SEVEN": "bg-brand-orange text-white",
  DESTAQUE: "bg-brand-green text-white",
};

function getBadge(item: MenuItem): { label: string; cls: string } | null {
  if (item.categoria === "combos") return { label: "Combo", cls: badgeStyle.COMBO };
  if (item.categoria === "top-seven") return { label: "Top Seven", cls: badgeStyle["TOP SEVEN"] };
  if (item.destaque) return { label: "Destaque", cls: badgeStyle.DESTAQUE };
  return null;
}

function PriceDisplay({ item }: { item: MenuItem }) {
  if (item.options?.length) {
    const min = basePrice(item);
    const max = maxPrice(item);
    if (max > min) return <span className="price">{formatPrice(min)} – {formatPrice(max)}</span>;
    return <span className="price">{formatPrice(min)}</span>;
  }
  return <span className="price">{formatPrice(basePrice(item))}</span>;
}

export default function ProductCard({
  item,
  onSelect,
  className,
  eager,
}: ProductCardProps) {
  const badge = getBadge(item);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-brand-line transition-all duration-300 hover:-translate-y-1 hover:shadow-cardHover",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(item)}
        aria-label={`Ver ${item.nome}`}
        className="relative block aspect-[4/3] w-full overflow-hidden bg-brand-sand"
      >
        {badge && (
          <span
            className={cn(
              "absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white",
              badge.cls
            )}
          >
            {badge.label}
          </span>
        )}
        <Image
          src={item.imagem}
          alt={item.nome}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </button>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-lg font-bold uppercase leading-tight tracking-tight text-brand-ink">
          {item.nome}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-brand-ink/65">
          {item.descricao}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-brand-line pt-3.5">
          <PriceDisplay item={item} />
          <button
            type="button"
            onClick={() => onSelect(item)}
            className="flex h-11 min-w-11 items-center justify-center rounded-full bg-brand-red text-white shadow-cta transition-transform hover:bg-brand-redDark active:scale-90"
            aria-label={`Pedir ${item.nome}`}
            title={`Pedir ${item.nome}`}
          >
            <IconPlus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
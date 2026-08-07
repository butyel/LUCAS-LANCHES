import { IconMinus, IconPlus } from "@/components/icons";
import { cn } from "@/lib/utils";

type QuantitySelectorProps = {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  size?: "sm" | "md";
  className?: string;
  ariaLabel?: string;
};

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  size = "md",
  className,
  ariaLabel = "Quantidade",
}: QuantitySelectorProps) {
  const btnCls =
    size === "sm"
      ? "h-9 w-9"
      : "h-11 w-11";
  const boxCls = size === "sm" ? "w-7 text-sm" : "w-9 text-base";
  const rowCls =
    size === "sm" ? "gap-1 p-1" : "gap-2 p-1.5";

  return (
    <div
      className={cn(
        "flex items-center rounded-full border border-brand-line bg-white",
        rowCls,
        className
      )}
      role="group"
      aria-label={ariaLabel}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Diminuir quantidade"
        className={cn(
          "flex items-center justify-center rounded-full bg-brand-sand text-brand-ink transition-transform active:scale-90 disabled:cursor-not-allowed disabled:opacity-40",
          boxCls
        )}
      >
        <IconMinus className="h-4 w-4" />
      </button>
      <span
        className={cn("text-center font-block font-bold text-brand-ink", boxCls)}
        aria-live="polite"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Aumentar quantidade"
        className={cn(
          "flex items-center justify-center rounded-full bg-brand-red text-white transition-transform active:scale-90",
          boxCls
        )}
      >
        <IconPlus className="h-4 w-4" />
      </button>
    </div>
  );
}
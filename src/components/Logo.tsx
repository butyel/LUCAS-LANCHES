import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  scrolled?: boolean;
  compact?: boolean;
};

export default function Logo({ className, scrolled, compact }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Lucas Lanches - Início"
      className={cn(
        "group inline-flex flex-col leading-none transition-transform duration-300",
        (scrolled || compact) && "scale-90 origin-left",
        className
      )}
    >
      <span className="font-signature text-3xl text-brand-red transition-opacity group-hover:opacity-80 sm:text-4xl">
        Lucas
      </span>
      <span className="font-block text-2xl tracking-[0.18em] text-brand-green sm:text-[1.7rem]">
        LANCHES
      </span>
    </Link>
  );
}
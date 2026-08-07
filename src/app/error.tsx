"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="mx-auto max-w-md">
        <span className="text-6xl" aria-hidden="true">
          🍔
        </span>
        <h1 className="mt-4 font-block text-3xl font-bold uppercase tracking-tight text-brand-ink">
          Aconteceu um imprevisto
        </h1>
        <p className="mt-2 text-brand-ink/60">
          Não foi possível carregar esta página agora. Não se preocupe — seu
          cardápio está aqui para você.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="btn-red px-6 py-3 text-sm"
          >
            Tentar de novo
          </button>
          <Link href="/cardapio" className="btn-outline px-6 py-3 text-sm">
            Ver cardápio
          </Link>
        </div>
      </div>
    </div>
  );
}
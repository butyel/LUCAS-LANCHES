import type { MenuItem } from "@/lib/menu";
import { basePrice } from "@/lib/menu";
import { acrescimos } from "@/lib/menu";

export const CART_STORAGE_KEY = "lucas-lanches:cart:v1";

export type CartAddon = {
  id: string;
  nome: string;
  preco: number;
};

export type CartLine = {
  /** Chave única da linha (usada em chaves React e remoção). */
  key: string;
  productId: string;
  name: string;
  /** Preço unitário base (variação já aplicada). */
  unitPrice: number;
  variation?: string;
  addons: CartAddon[];
  notes?: string;
  quantity: number;
};

export type CartState = {
  items: CartLine[];
  /** Subtotal (soma de unitPrice * quantity por linha). */
  subtotal: number;
  /** Quantidade total de itens. */
  count: number;
};

export type CartInput = {
  productId: string;
  name: string;
  unitPrice: number;
  variation?: string;
  addons?: CartAddon[];
  notes?: string;
  quantity: number;
};

export type CartAction =
  | { type: "ADD"; input: CartInput }
  | { type: "REMOVE"; key: string }
  | { type: "SET_QTY"; key: string; quantity: number }
  | { type: "CLEAR" };

/** Calcula o total unitário de uma linha. */
export function lineUnitTotal(line: CartLine): number {
  const addons = line.addons.reduce((s, a) => s + a.preco, 0);
  return line.unitPrice + addons;
}

export function lineTotal(line: CartLine): number {
  return lineUnitTotal(line) * line.quantity;
}

/** Assinatura para agrupar linhas iguais (mesmo produto/variante/acréscimos). */
export function lineSignature(input: CartInput): string {
  const addons = (input.addons ?? [])
    .map((a) => `${a.id}:${a.preco}`)
    .sort()
    .join("|");
  return [input.productId, input.variation ?? "", addons, input.notes ?? ""].join(
    "::"
  );
}

function calc(items: CartLine[]): { subtotal: number; count: number } {
  const subtotal = items.reduce((s, l) => s + lineTotal(l), 0);
  const count = items.reduce((s, l) => s + l.quantity, 0);
  return { subtotal, count };
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD": {
      const sig = lineSignature(action.input);
      const existing = state.items.find(
        (l) => l.productId === action.input.productId && lineSignature({
          productId: l.productId,
          name: l.name,
          unitPrice: l.unitPrice,
          variation: l.variation,
          addons: l.addons.map((a) => ({ id: a.id, nome: a.nome, preco: a.preco })),
          notes: l.notes,
          quantity: l.quantity,
        }) === sig
      );
      let items: CartLine[];
      if (existing) {
        items = state.items.map((l) =>
          l.key === existing.key
            ? { ...l, quantity: l.quantity + action.input.quantity }
            : l
        );
      } else {
        const line: CartLine = {
          key: `${action.input.productId}-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 7)}`,
          productId: action.input.productId,
          name: action.input.name,
          unitPrice: action.input.unitPrice,
          variation: action.input.variation,
          addons: action.input.addons ?? [],
          notes: action.input.notes,
          quantity: action.input.quantity,
        };
        items = [...state.items, line];
      }
      return { items, ...calc(items) };
    }
    case "REMOVE": {
      const items = state.items.filter((l) => l.key !== action.key);
      return { items, ...calc(items) };
    }
    case "SET_QTY": {
      const items = state.items.map((l) =>
        l.key === action.key
          ? { ...l, quantity: Math.max(0, action.quantity) }
          : l
      ).filter((l) => l.quantity > 0);
      return { items, ...calc(items) };
    }
    case "CLEAR":
      return { items: [], subtotal: 0, count: 0 };
    default:
      return state;
  }
}

export function buildCartInput(item: MenuItem, opts: {
  optionIndex?: number;
  addonIds?: string[];
  notes?: string;
  quantity?: number;
}): CartInput {
  const variation =
    item.options && item.options.length
      ? item.options[opts.optionIndex ?? 0]
      : undefined;
  const unitPrice = variation ? variation.preco : basePrice(item);
  const selectedAddons = (opts.addonIds ?? [])
    .map((id) => acrescimos.find((a) => a.id === id))
    .filter((a) => a !== undefined)
    .map((a) => ({ id: a!.id, nome: a!.nome, preco: a!.preco }));

  return {
    productId: item.id,
    name: item.nome,
    unitPrice,
    variation: variation?.nome,
    addons: selectedAddons,
    notes: opts.notes?.trim() || undefined,
    quantity: Math.max(1, opts.quantity ?? 1),
  };
}

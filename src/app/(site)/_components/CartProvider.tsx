'use client';

// État du panier partagé côté client : l'en-tête (MiniCart) et les pages (ex. fiche produit) lisent et modifient le même panier.
import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';
import type { CartLine } from '@/lib/api';

interface CartContextValue {
  lines: CartLine[];
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  /** Ajoute une ligne (ou cumule la quantité, plafonnée au stock). */
  addLine: (line: CartLine) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  /** Réinsère une ligne retirée à sa position d'origine, sans cumuler la quantité. */
  restoreLine: (line: CartLine, index: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ initialCart, children }: { initialCart: CartLine[]; children: ReactNode }) {
  const [lines, setLines] = useState(initialCart);
  const [open, setOpen] = useState(false);

  const openCart = useCallback(() => setOpen(true), []);
  const closeCart = useCallback(() => setOpen(false), []);
  const addLine = useCallback((line: CartLine) => {
    setLines((ls) =>
      ls.some((l) => l.id === line.id)
        ? ls.map((l) => (l.id === line.id ? { ...l, quantity: Math.min(l.max, l.quantity + line.quantity) } : l))
        : [...ls, line],
    );
  }, []);
  const setQuantity = useCallback((id: string, quantity: number) => setLines((ls) => ls.map((l) => (l.id === id ? { ...l, quantity } : l))), []);
  const removeLine = useCallback((id: string) => setLines((ls) => ls.filter((l) => l.id !== id)), []);
  const restoreLine = useCallback((line: CartLine, index: number) => {
    setLines((ls) => (ls.some((l) => l.id === line.id) ? ls : ls.toSpliced(Math.min(index, ls.length), 0, line)));
  }, []);

  const value = useMemo(
    () => ({ lines, open, openCart, closeCart, addLine, setQuantity, removeLine, restoreLine }),
    [lines, open, openCart, closeCart, addLine, setQuantity, removeLine, restoreLine],
  );
  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart(): CartContextValue {
  const ctx = use(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans <CartProvider>.');
  return ctx;
}

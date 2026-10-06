'use client';

// État du panier partagé côté client : l'en-tête (MiniCart) et les pages (ex. fiche produit) lisent et modifient le même panier.
import { usePathname } from 'next/navigation';
import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartLine } from '@/lib/api';

interface CartContextValue {
  lines: CartLine[];
  open: boolean;
  /** Le focus revient au bouton panier à la fermeture (false quand le tiroir se ferme à cause d'une navigation). */
  restoreFocus: boolean;
  openCart: () => void;
  closeCart: () => void;
  /** Ferme le tiroir parce que la page change : le focus reste à la nouvelle page. */
  closeForNavigation: () => void;
  /** Ajoute une ligne (ou cumule la quantité, plafonnée au stock). */
  addLine: (line: CartLine) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeLine: (id: string) => void;
  /** Réinsère une ligne retirée à sa position d'origine, sans cumuler la quantité. */
  restoreLine: (line: CartLine, index: number) => void;
}

const STORAGE_KEY = 'boutique-demo:panier:v1';

function isCartLine(v: unknown): v is CartLine {
  const l = v as CartLine;
  return !!l && typeof l.id === 'string' && typeof l.quantity === 'number' && typeof l.unitPrice === 'number' && typeof l.max === 'number';
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ initialCart, children }: { initialCart: CartLine[]; children: ReactNode }) {
  const [lines, setLines] = useState(initialCart);
  const [open, setOpen] = useState(false);
  const [restoreFocus, setRestoreFocus] = useState(true);
  // Navigation : le tiroir (monté dans le layout) survit au changement de page, on le ferme dès que le chemin change.
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    if (open) {
      setRestoreFocus(false);
      setOpen(false);
    }
  }
  // Persistance sessionStorage : lecture après le montage (le premier rendu reste celui du serveur, donc pas d'écart d'hydratation).
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(STORAGE_KEY);
      const saved: unknown = raw ? JSON.parse(raw) : null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture unique du stockage navigateur après le montage
      if (Array.isArray(saved) && saved.every(isCartLine)) setLines(saved);
    } catch {
      /* stockage indisponible ou contenu illisible : on garde le panier de départ */
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* stockage plein ou refusé : le panier reste en mémoire */
    }
  }, [lines, restored]);

  const openCart = useCallback(() => {
    setRestoreFocus(true);
    setOpen(true);
  }, []);
  const closeCart = useCallback(() => setOpen(false), []);
  const closeForNavigation = useCallback(() => {
    setRestoreFocus(false);
    setOpen(false);
  }, []);
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
    () => ({ lines, open, restoreFocus, openCart, closeCart, closeForNavigation, addLine, setQuantity, removeLine, restoreLine }),
    [lines, open, restoreFocus, openCart, closeCart, closeForNavigation, addLine, setQuantity, removeLine, restoreLine],
  );
  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart(): CartContextValue {
  const ctx = use(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans <CartProvider>.');
  return ctx;
}

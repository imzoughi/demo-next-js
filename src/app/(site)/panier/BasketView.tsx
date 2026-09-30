'use client';

// Vue client du panier : lit le même état que le MiniCart (useCart) ; retrait annulable via un Toast.
import { useEffect, useRef, useState } from 'react';
import { ShoppingBasket } from '@/components/blocks/ShoppingBasket/ShoppingBasket';
import { Toast } from '@/components/ui/Toast/Toast';
import type { CartLine } from '@/lib/api';
import { useCart } from '../_components/CartProvider';

/** Où placer le focus après un retrait ou une annulation : le « Retirer » d'une ligne (par position) ou le titre. */
type FocusTarget = { kind: 'line'; index: number } | { kind: 'title' };

export function BasketView({ continueHref, checkoutHref }: { continueHref: string; checkoutHref: string }) {
  const { lines, setQuantity, removeLine, restoreLine } = useCart();
  const [removingIds, setRemovingIds] = useState<string[]>([]);
  const [undo, setUndo] = useState<{ line: CartLine; index: number } | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pendingFocus = useRef<FocusTarget | null>(null);

  const items = lines.map((l) => ({ ...l, removing: removingIds.includes(l.id) }));

  // Une fois la liste mise à jour, le focus rejoint la cible mémorisée (sinon il tomberait sur <body>).
  useEffect(() => {
    const target = pendingFocus.current;
    if (!target || !rootRef.current) return;
    pendingFocus.current = null;
    if (target.kind === 'line') {
      const rows = rootRef.current.querySelectorAll<HTMLElement>('ul > li');
      const button = rows[target.index]?.querySelector<HTMLElement>('button[aria-label^="Retirer"]');
      if (button) {
        button.focus();
        return;
      }
    }
    rootRef.current.querySelector<HTMLElement>('h1')?.focus();
  }, [lines]);

  function handleRemove(id: string) {
    setRemovingIds((ids) => (ids.includes(id) ? ids : [...ids, id]));
  }
  // Fin de l'animation de retrait : la ligne quitte le panier, le message propose d'annuler.
  function handleRemoved(id: string) {
    const index = lines.findIndex((l) => l.id === id);
    setRemovingIds((ids) => ids.filter((x) => x !== id));
    if (index < 0) return;
    const remaining = lines.length - 1;
    // La ligne suivante prend la même position ; à défaut, la précédente ; à défaut, le titre.
    pendingFocus.current = remaining > 0 ? { kind: 'line', index: Math.min(index, remaining - 1) } : { kind: 'title' };
    removeLine(id);
    setUndo({ line: lines[index], index });
    setToastOpen(true);
  }
  function handleUndo() {
    if (!undo) return;
    pendingFocus.current = { kind: 'line', index: Math.min(undo.index, lines.length) };
    restoreLine(undo.line, undo.index);
  }

  return (
    <div ref={rootRef}>
      <ShoppingBasket
        items={items}
        continueHref={continueHref}
        checkoutHref={checkoutHref}
        onQuantityChange={setQuantity}
        onRemove={handleRemove}
        onRemoved={handleRemoved}
      />
      <Toast
        open={toastOpen}
        message={undo ? `${undo.line.name} retiré` : undefined}
        action={{ label: 'Annuler', onClick: handleUndo }}
        onDismiss={() => setToastOpen(false)}
      />
    </div>
  );
}

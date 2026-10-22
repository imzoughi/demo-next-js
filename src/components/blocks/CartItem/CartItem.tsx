'use client';

// BANC D'ESSAI (phase 0) : implémentation retirée, à reconstruire par la boucle /decade-front:ds-component.
// Les props et les stories sont conservées : elles servent de cahier des charges et de tests.

import { formatPrice } from '@/lib/format';

export interface CartItemProps {
  /** drawer : mini-panier ; page : page panier (colonnes selon la largeur du conteneur). */
  context?: 'page' | 'drawer';
  name: string;
  href?: string;
  description?: string;
  unitPrice: number;
  quantity?: number;
  /** Stock maximum. */
  max?: number;
  image: string;
  imageAlt?: string;
  disabled?: boolean;
  /** Retrait en cours : fondu puis fermeture de la hauteur, puis onRemoved. */
  removing?: boolean;
  /** Image au-dessus de la ligne de flottaison : chargée en priorité. */
  priority?: boolean;
  className?: string;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
  onRemoved?: () => void;
}

/** Ligne d'article du panier et du mini-panier : à placer dans une liste `ul`. */
export function CartItem({ name, unitPrice, quantity = 1, className }: CartItemProps) {
  return (
    <li className={className} data-bench="a-reconstruire">
      {name} · {quantity} × {formatPrice(unitPrice)}
    </li>
  );
}

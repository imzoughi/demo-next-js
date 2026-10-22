'use client';

// BANC D'ESSAI (phase 0) : implémentation retirée, à reconstruire par la boucle /decade-front:ds-component.
// Les props et les stories sont conservées : elles servent de cahier des charges et de tests.

import type { ReactNode, RefObject } from 'react';

export interface DrawerProps {
  open: boolean;
  /** right (défaut), left, bottom, ou sheet : depuis le bas en mobile, à droite dès 768 px. */
  side?: 'right' | 'left' | 'bottom' | 'sheet';
  title: string;
  closeLabel?: string;
  /** Plein écran sous 768 px (true par défaut). */
  fullScreenMobile?: boolean;
  /** Rendu dans son conteneur (documentation), sans piège de focus ni blocage du défilement. */
  static?: boolean;
  busy?: boolean;
  footer?: ReactNode;
  /** Élément qui reçoit le focus à l'ouverture (le panneau par défaut). */
  initialFocus?: RefObject<HTMLElement | null>;
  /** Rend le focus au déclencheur à la fermeture (true par défaut) ; false quand la fermeture suit une navigation. */
  restoreFocus?: boolean;
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
  /** Appelé quand la fermeture est terminée. */
  onClosed?: () => void;
}

/** Couche générique : voile, titre, croix, focus piégé, Échap, clic sur le voile, retour du focus au déclencheur. */
export function Drawer({ open, title, footer, children, className }: DrawerProps) {
  if (!open) return null;
  return (
    <section className={className} aria-label={title} data-bench="a-reconstruire">
      <h2>{title}</h2>
      {children}
      {footer}
    </section>
  );
}

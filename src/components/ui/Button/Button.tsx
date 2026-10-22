'use client';

// BANC D'ESSAI (phase 0) : implémentation retirée, à reconstruire par la boucle /decade-front:ds-component.
// Les props et les stories sont conservées : elles servent de cahier des charges et de tests.

import type { MouseEvent, ReactNode } from 'react';
import type { IconName } from '../Icon/Icon';

export type ButtonType = 'primary' | 'secondary' | 'white' | 'opaque' | 'ghost';

export interface ButtonProps {
  /** primary, secondary, ghost ; white et opaque uniquement sur color-surface-inverse. */
  type?: ButtonType;
  size?: 'md' | 'sm';
  /** Icône à droite (true = chevron-down). */
  iconRight?: boolean | IconName;
  /** true : pleine largeur ; 'mobile' : pleine largeur sous 768 px. */
  fullWidth?: boolean | 'mobile';
  loading?: boolean;
  /** Libellé pendant le chargement (« Ajout en cours »). */
  loadingLabel?: string;
  disabled?: boolean;
  /** Inactif mais focalisable et annoncé (aria-disabled), sans changer de rendu : utile quand un message explique pourquoi. */
  softDisabled?: boolean;
  /** Rend un lien `<AppLink>`. */
  href?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  'aria-haspopup'?: 'dialog' | 'menu' | 'listbox' | boolean;
  'aria-describedby'?: string;
  'aria-live'?: 'polite' | 'assertive' | 'off';
}

/** Bouton d'action à angles droits : cinq types, deux tailles, états défaut, survol, focus, actif, désactivé, chargement. */
export function Button({ children, htmlType = 'button', disabled, onClick, className }: ButtonProps) {
  return (
    <button type={htmlType} disabled={disabled} onClick={onClick} className={className} data-bench="a-reconstruire">
      {children}
    </button>
  );
}

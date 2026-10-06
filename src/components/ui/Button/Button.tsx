'use client';

import { AppLink } from '@/components/ui/AppLink/AppLink';
import type { MouseEvent, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Button.module.scss';

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
export function Button({
  type = 'primary',
  size = 'md',
  iconRight,
  fullWidth,
  loading = false,
  loadingLabel,
  disabled = false,
  softDisabled = false,
  href,
  htmlType = 'button',
  className,
  children,
  onClick,
  ...rest
}: ButtonProps) {
  const inactive = loading || disabled || softDisabled;
  const right = iconRight === true ? 'chevron-down' : iconRight;
  const cls = cx(
    styles.root,
    'body-medium',
    type !== 'primary' && styles[type],
    size === 'sm' && styles.sm,
    fullWidth === true && styles.full,
    fullWidth === 'mobile' && styles.fullMobile,
    loading && styles.isLoading,
    (disabled || softDisabled) && styles.isDisabled,
    className,
  );
  const content = (
    <>
      {loading ? <Icon name="loader-circle" size="md" spin /> : null}
      <span>{loading && loadingLabel ? loadingLabel : children}</span>
      {!loading && right ? <Icon name={right} size="md" /> : null}
    </>
  );
  const handle = (e: MouseEvent<HTMLElement>) => {
    if (inactive) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };
  if (href) {
    return (
      <AppLink
        {...rest}
        className={cls}
        href={inactive ? undefined : href}
        role={inactive ? 'link' : undefined}
        aria-disabled={inactive ? true : undefined}
        aria-busy={loading ? true : undefined}
        onClick={handle}
      >
        {content}
      </AppLink>
    );
  }
  // aria-disabled plutôt que disabled pendant le chargement : le bouton garde le focus et annonce son état.
  return (
    <button
      {...rest}
      className={cls}
      type={htmlType}
      disabled={disabled && !loading ? true : undefined}
      aria-disabled={loading || softDisabled ? true : undefined}
      aria-busy={loading ? true : undefined}
      onClick={handle}
    >
      {content}
    </button>
  );
}

import type { MouseEvent, ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type IconName, type IconSize } from '../Icon/Icon';
import styles from './IconButton.module.scss';

export interface IconButtonProps {
  icon: IconName;
  /** Nom accessible, obligatoire (le bouton n'a pas de texte). */
  label: string;
  tone?: 'default' | 'inverse';
  size?: IconSize;
  href?: string;
  disabled?: boolean;
  /** Bouton à bascule (aria-pressed). */
  pressed?: boolean;
  /** Déclencheur de panneau (aria-expanded). */
  expanded?: boolean;
  className?: string;
  /** Contenu superposé à l'icône (ex. Badge). */
  children?: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

/** Bouton icône seul : icône inchangée, zone cliquable 44 x 44 px, nom accessible obligatoire. */
export function IconButton({
  icon,
  label,
  tone = 'default',
  size = 'sm',
  href,
  disabled,
  pressed,
  expanded,
  className,
  children,
  onClick,
}: IconButtonProps) {
  const cls = cx(styles.root, tone === 'inverse' && styles.inverse, className);
  const content = (
    <>
      <Icon name={icon} size={size} />
      {children}
    </>
  );
  if (href && disabled) {
    // Sans href, <a> perd son rôle : role="link" rend aria-label valide (WCAG 4.1.2).
    return (
      <a className={cls} role="link" aria-disabled="true" aria-label={label}>
        {content}
      </a>
    );
  }
  if (href) {
    return (
      <a className={cls} href={href} aria-label={label} aria-expanded={expanded} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={cls}
      aria-label={label}
      aria-pressed={pressed}
      aria-expanded={expanded}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

import { AppLink } from '@/components/ui/AppLink/AppLink';
import type { AnchorHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import styles from './Logo.module.scss';

export interface LogoProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  /** default sur fond clair, inverse (blanc) sur fond sombre. */
  tone?: 'default' | 'inverse';
  href?: string;
  /** Page courante : ajoute aria-current="page". */
  current?: boolean;
  /** Nom accessible du lien. */
  label?: string;
}

/** Marque « Avion » : texte Red Hat Display, lien vers l'accueil. Ne jamais la redessiner. */
export function Logo({ tone = 'default', href = '/', current, label = 'Avion, accueil', className, ...rest }: LogoProps) {
  return (
    <AppLink
      {...rest}
      href={href}
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      className={cx(styles.root, 'h3', tone === 'inverse' && styles.inverse, className)}
    >
      Avion
    </AppLink>
  );
}

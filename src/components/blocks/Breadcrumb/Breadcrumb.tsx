import { AppLink } from '@/components/ui/AppLink/AppLink';
import type { MouseEventHandler } from 'react';
import { cx } from '@/lib/cx';
import { Icon } from '../../ui/Icon/Icon';
import styles from './Breadcrumb.module.scss';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface BreadcrumbProps {
  /** Du plus haut au plus bas ; le dernier élément est la page courante (non cliquable). */
  items: BreadcrumbItem[];
  className?: string;
}

/** Fil d'Ariane « Accueil › Catégorie › Produit » ; en mobile, un lien de retour vers le parent. */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const parent = items.length > 1 ? items[items.length - 2] : null;
  return (
    <nav className={cx(styles.root, className)} aria-label="Fil d’Ariane">
      <ol className={styles.list}>
        {items.map((it, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${it.label}-${i}`} className={cx(styles.item, last && styles.isCurrent)}>
              {i > 0 ? <Icon name="chevron-right" size="sm" className={styles.sep} /> : null}
              {last ? (
                <span className={cx(styles.current, 'body-medium')} aria-current="page" title={it.label}>
                  {it.label}
                </span>
              ) : (
                <AppLink href={it.href} className={cx(styles.link, 'body-medium')} onClick={it.onClick}>
                  {it.label}
                </AppLink>
              )}
            </li>
          );
        })}
      </ol>
      {parent ? (
        <AppLink href={parent.href} className={cx(styles.back, 'body-medium')} onClick={parent.onClick}>
          <Icon name="arrow-left" size="sm" />
          <span>
            <span className="av-visually-hidden">Retour à </span>
            {parent.label}
          </span>
        </AppLink>
      ) : null}
    </nav>
  );
}

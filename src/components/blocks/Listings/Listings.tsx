import type { MouseEventHandler } from 'react';
import type { Product } from '@/mocks/types';
import { cx } from '@/lib/cx';
import { Button } from '../../ui/Button/Button';
import { EmptyState, type EmptyStateProps } from '../EmptyState/EmptyState';
import { ProductCard } from '../ProductCard/ProductCard';
import styles from './Listings.module.scss';

export interface ListingsProps {
  products?: Array<Pick<Product, 'id' | 'name' | 'price' | 'image' | 'imageAlt' | 'href'>>;
  title?: string;
  loading?: boolean;
  /** Nombre de squelettes pendant le chargement. */
  count?: number;
  /** Deux colonnes en mobile (une par défaut). */
  mobileColumns?: 1 | 2;
  /** Colonnes dès 768 px : 3 pour une série de trois éléments (pas de carte orpheline), 4 sinon (2 de 768 à 1279 px). */
  columns?: 3 | 4;
  /** tight : espace réduit au-dessus de la grille, quand une barre de filtres la précède. */
  spacing?: 'default' | 'tight';
  /** Charge en priorité l'image de la 1ʳᵉ carte (grille en haut de page). */
  priorityFirst?: boolean;
  /** Contenu de l'état vide. */
  empty?: EmptyStateProps;
  /** Bouton « Voir la collection » ; false pour le masquer. */
  action?: false | { label?: string; href?: string; onClick?: MouseEventHandler<HTMLElement> };
  className?: string;
}

/** Grille de ProductCard : 4 colonnes dès 1280 px, 2 dès 768 px ; états chargement et vide. */
export function Listings({ products = [], title, loading, count, mobileColumns = 1, columns = 4, spacing = 'default', priorityFirst, empty, action, className }: ListingsProps) {
  const n = count ?? (products.length || 4);
  let body;
  if (loading) {
    body = (
      <div className={styles.grid} aria-busy="true">
        <p className="av-visually-hidden" role="status">
          Chargement des produits
        </p>
        {Array.from({ length: n }, (_, i) => (
          <ProductCard key={i} loading />
        ))}
      </div>
    );
  } else if (!products.length) {
    body = <EmptyState kind="results" headingLevel={3} {...empty} />;
  } else {
    body = (
      <ul className={styles.grid}>
        {products.map((p, i) => (
          <li key={p.id}>
            <ProductCard {...p} priority={priorityFirst && i === 0} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <section className={cx(styles.sec, mobileColumns === 2 && styles.m2, columns === 3 && styles.c3, spacing === 'tight' && styles.tight, className)}>
      <div className={styles.secInner}>
        {title ? <h2 className={cx(styles.secTitle, 'h3')}>{title}</h2> : null}
        {body}
        {action !== false && products.length > 0 && !loading ? (
          <div className={styles.more}>
            <Button type="secondary" href={action?.href ?? '/liste-produits/'} onClick={action?.onClick} fullWidth="mobile">
              {action?.label ?? 'Voir la collection'}
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

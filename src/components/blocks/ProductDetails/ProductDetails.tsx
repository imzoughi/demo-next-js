'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Product } from '@/mocks/types';
import { cx } from '@/lib/cx';
import { formatPrice } from '@/lib/format';
import { Button } from '../../ui/Button/Button';
import { Stepper } from '../../ui/Stepper/Stepper';
import { Breadcrumb, type BreadcrumbItem } from '../Breadcrumb/Breadcrumb';
import styles from './ProductDetails.module.scss';

export interface ProductDetailsProps {
  product: Pick<Product, 'name' | 'price' | 'image' | 'imageAlt' | 'description' | 'dimensions' | 'max'>;
  breadcrumb?: BreadcrumbItem[];
  className?: string;
  /** Ajout au panier : promesse résolue = terminé (le bouton reste en chargement jusque-là). */
  onAdd?: (quantity: number) => Promise<unknown> | void;
  /** Affiche « Enregistrer dans mes favoris » quand présent. */
  onFavorite?: () => void;
}

/** Fiche produit en pile verticale : image, titre, prix, description, dimensions, quantité, « Ajouter au panier ». */
export function ProductDetails({ product: p, breadcrumb, className, onAdd, onFavorite }: ProductDetailsProps) {
  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const max = p.max;

  async function add() {
    if (!onAdd) return;
    setAdding(true);
    try {
      await onAdd(qty);
    } finally {
      setAdding(false);
    }
  }

  return (
    <section className={cx(styles.sec, styles.root, className)}>
      <div className={cx(styles.secInner, styles.inner)}>
        <div className={styles.media}>
          <Image src={p.image} alt={p.imageAlt || p.name} width={800} height={800} priority sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div className={styles.info}>
          {breadcrumb ? <Breadcrumb items={breadcrumb} /> : null}
          <div className={styles.head}>
            <h1 className="h1">{p.name}</h1>
            <p className="price">{formatPrice(p.price)}</p>
          </div>
          <div className={styles.block}>
            <h2 className="h5">Description du produit</h2>
            <p className="body-medium">{p.description}</p>
          </div>
          {p.dimensions.length > 0 ? (
            <div className={styles.block}>
              <h2 className="h5">Dimensions</h2>
              <dl className={styles.dims}>
                {p.dimensions.map((d) => (
                  <div key={d.label}>
                    <dt className="body-small">{d.label}</dt>
                    <dd className="body-medium">{d.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}
          <div className={styles.block}>
            <h2 className="h5">Quantité</h2>
            <Stepper className={styles.stepper} label={`Quantité, ${p.name}`} min={1} max={max} value={qty} onChange={setQty} />
            {qty >= max ? (
              <p className={cx(styles.stock, 'body-medium')}>
                {`Stock maximum atteint : ${max} exemplaire${max > 1 ? 's' : ''} disponible${max > 1 ? 's' : ''}.`}
              </p>
            ) : null}
          </div>
          <div className={styles.actions}>
            <Button onClick={add} loading={adding} loadingLabel="Ajout en cours" fullWidth="mobile">
              Ajouter au panier
            </Button>
            {onFavorite ? (
              <Button type="ghost" onClick={onFavorite} fullWidth="mobile">
                Enregistrer dans mes favoris
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

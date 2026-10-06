import { AppLink } from '@/components/ui/AppLink/AppLink';
import type { MouseEventHandler } from 'react';
import Image from 'next/image';
import { withBase } from '@/lib/paths';
import { cx } from '@/lib/cx';
import { formatPrice } from '@/lib/format';
import { Skeleton } from '../../ui/Skeleton/Skeleton';
import styles from './ProductCard.module.scss';

export interface ProductCardProps {
  name?: string;
  /** Prix en euros. */
  price?: number;
  image?: string;
  imageAlt?: string;
  href?: string;
  /** sm : ratio 4 / 5 ; lg : ratio 5 / 3. */
  size?: 'sm' | 'lg';
  /** Squelette au ratio de l'image. */
  loading?: boolean;
  /** Charge l'image en priorité (1ʳᵉ image visible d'une page, candidate au LCP). */
  priority?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/** Carte produit : toute la carte est un lien vers la fiche ; survol = soulèvement + ombre. */
export function ProductCard({ name, price = 0, image, imageAlt = '', href = '#', size = 'sm', loading, priority, className, onClick }: ProductCardProps) {
  if (loading) {
    return (
      <div className={cx(styles.root, size === 'lg' && styles.lg, className)} aria-hidden="true">
        <Skeleton shape="card" ratio={size === 'lg' ? '5 / 3' : '4 / 5'} />
      </div>
    );
  }
  return (
    <AppLink href={href} className={cx(styles.root, size === 'lg' && styles.lg, className)} onClick={onClick}>
      <span className={styles.media}>
        {image ? (
          <Image className={styles.img} src={withBase(image)} alt={imageAlt} fill priority={priority} sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" />
        ) : null}
      </span>
      <span className={cx(styles.name, 'h4')}>{name}</span>
      <span className={cx(styles.price, 'body-large')}>{formatPrice(price)}</span>
    </AppLink>
  );
}

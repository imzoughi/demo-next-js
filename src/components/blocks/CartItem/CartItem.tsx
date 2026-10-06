'use client';

import { AppLink } from '@/components/ui/AppLink/AppLink';
import { useRef, type AnimationEvent } from 'react';
import Image from 'next/image';
import { withBase } from '@/lib/paths';
import { cx } from '@/lib/cx';
import { formatPrice } from '@/lib/format';
import { Stepper } from '../../ui/Stepper/Stepper';
import { TextLink } from '../../ui/TextLink/TextLink';
import styles from './CartItem.module.scss';

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
export function CartItem({
  context = 'page',
  name,
  href,
  description,
  unitPrice,
  quantity = 1,
  max = 99,
  image,
  imageAlt = '',
  disabled,
  removing,
  priority,
  className,
  onQuantityChange,
  onRemove,
  onRemoved,
}: CartItemProps) {
  const drawer = context === 'drawer';
  const ended = useRef(0);

  // Deux animations se jouent au retrait (fondu, puis fermeture de la hauteur) : on prévient à la seconde.
  function onAnimationEnd(e: AnimationEvent<HTMLLIElement>) {
    if (e.target !== e.currentTarget || !removing) return;
    ended.current += 1;
    if (ended.current >= 2) onRemoved?.();
  }

  const nameCls = cx(styles.name, drawer ? 'h5' : 'h4');
  const stepper = (
    <div className={styles.qty}>
      <Stepper label={`Quantité, ${name}`} subject={name} min={1} max={max} value={quantity} onChange={onQuantityChange} disabled={disabled} />
      {quantity >= max ? <p className={cx(styles.stock, 'body-medium')}>Stock maximum atteint</p> : null}
    </div>
  );
  const total = (
    <p className={cx(styles.total, drawer ? 'body-medium' : 'body-large')}>
      <span className="av-visually-hidden">Total : </span>
      {formatPrice(unitPrice * quantity)}
    </p>
  );

  return (
    <li className={cx(styles.root, !drawer && styles.page, removing && styles.isRemoving, className)} onAnimationEnd={onAnimationEnd}>
      <div className={styles.inner}>
        <Image className={styles.img} src={withBase(image)} alt={imageAlt} width={240} height={300} priority={priority} />
        <div className={styles.info}>
          {href ? (
            <AppLink href={href} className={nameCls}>
              {name}
            </AppLink>
          ) : (
            <p className={nameCls}>{name}</p>
          )}
          {description && !drawer ? <p className={cx(styles.desc, 'body-medium')}>{description}</p> : null}
          <p className="body-medium">{formatPrice(unitPrice)}</p>
          {drawer ? (
            <div className={styles.row}>
              {stepper}
              {total}
            </div>
          ) : null}
          <TextLink iconLeft="trash-2" onClick={onRemove} aria-label={`Retirer ${name} du panier`}>
            Retirer
          </TextLink>
        </div>
        {!drawer ? stepper : null}
        {!drawer ? total : null}
      </div>
    </li>
  );
}

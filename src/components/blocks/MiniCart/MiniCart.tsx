'use client';

import type { CartLine } from '@/mocks/types';
import { cx } from '@/lib/cx';
import { formatPrice } from '@/lib/format';
import { Button } from '../../ui/Button/Button';
import { Drawer } from '../../ui/Drawer/Drawer';
import { Skeleton } from '../../ui/Skeleton/Skeleton';
import { Toast } from '../../ui/Toast/Toast';
import { CartItem } from '../CartItem/CartItem';
import { EmptyState } from '../EmptyState/EmptyState';
import styles from './MiniCart.module.scss';

export interface MiniCartItem extends CartLine {
  /** Retrait en cours (animation puis onRemoved). */
  removing?: boolean;
}

export interface MiniCartNotice {
  message: string;
  tone?: 'info' | 'success' | 'error';
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  onDismiss?: () => void;
}

export interface MiniCartProps {
  open: boolean;
  items?: MiniCartItem[];
  loading?: boolean;
  /** Message « … retiré · Annuler », affiché dans le panneau. */
  notice?: MiniCartNotice | null;
  /** Rendu dans son conteneur (documentation). */
  static?: boolean;
  collectionHref?: string;
  cartHref?: string;
  checkoutHref?: string;
  className?: string;
  onClose?: () => void;
  onClosed?: () => void;
  onBrowse?: () => void;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onRemoved?: (id: string) => void;
}

/** Aperçu du panier après ajout : articles, sous-total, « Voir le panier » et « Commander ». */
export function MiniCart({
  open,
  items = [],
  loading,
  notice,
  static: isStatic,
  collectionHref = '/collection',
  cartHref = '/panier',
  checkoutHref = '/paiement',
  className,
  onClose,
  onClosed,
  onBrowse,
  onQuantityChange,
  onRemove,
  onRemoved,
}: MiniCartProps) {
  const live = items.filter((i) => !i.removing);
  const count = live.reduce((n, i) => n + i.quantity, 0);
  const subtotal = live.reduce((n, i) => n + i.unitPrice * i.quantity, 0);
  const empty = !loading && items.length === 0;

  let body;
  if (loading) {
    body = (
      <div className={styles.loading}>
        <p className="av-visually-hidden" role="status">
          Chargement du panier
        </p>
        {[0, 1].map((k) => (
          <div key={k} className={styles.skel}>
            <Skeleton shape="image" ratio="4 / 5" />
            <div className="h5">
              <Skeleton shape="line" lines={3} />
            </div>
          </div>
        ))}
      </div>
    );
  } else if (empty) {
    body = (
      <EmptyState
        kind="cart"
        headingLevel={3}
        className={styles.empty}
        action={{ label: 'Découvrir la collection', href: collectionHref, onClick: onBrowse }}
      />
    );
  } else {
    body = (
      <>
        {/* Toast rendu DANS le panneau : le focus y est piégé, il reste joignable au clavier. */}
        <Toast
          className={styles.toast}
          position="static"
          open={!!notice}
          tone={notice?.tone ?? 'info'}
          message={notice?.message}
          action={notice?.actionLabel ? { label: notice.actionLabel, onClick: notice.onAction } : undefined}
          duration={notice?.duration}
          onDismiss={notice?.onDismiss}
        />
        <ul className={styles.list}>
          {items.map((i) => (
            <CartItem
              key={i.id}
              context="drawer"
              name={i.name}
              href={i.href}
              unitPrice={i.unitPrice}
              quantity={i.quantity}
              max={i.max}
              image={i.image}
              imageAlt={i.imageAlt}
              removing={i.removing}
              onQuantityChange={(v) => onQuantityChange?.(i.id, v)}
              onRemove={() => onRemove?.(i.id)}
              onRemoved={() => onRemoved?.(i.id)}
            />
          ))}
        </ul>
      </>
    );
  }

  const footer =
    !empty && !loading ? (
      <>
        <div className={styles.sum}>
          <span className="h5">Sous-total</span>
          <span className={cx('price', styles.subtotal)} aria-live="polite">
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className={cx(styles.note, 'body-small')}>Taxes et livraison calculées au paiement</p>
        <div className={styles.actions}>
          <Button type="secondary" href={cartHref} fullWidth>
            Voir le panier
          </Button>
          <Button href={checkoutHref} fullWidth>
            Commander
          </Button>
        </div>
      </>
    ) : null;

  return (
    <Drawer
      open={open}
      static={isStatic}
      onClose={onClose}
      onClosed={onClosed}
      side="right"
      title={loading || !count ? 'Votre panier' : `Votre panier (${count})`}
      busy={loading}
      footer={footer}
      className={cx(styles.root, className)}
    >
      {body}
    </Drawer>
  );
}

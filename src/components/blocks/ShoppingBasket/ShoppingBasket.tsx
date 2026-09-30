'use client';

import type { MouseEventHandler } from 'react';
import type { CartLine } from '@/mocks/types';
import { cx } from '@/lib/cx';
import { TextLink } from '../../ui/TextLink/TextLink';
import { CartItem } from '../CartItem/CartItem';
import { EmptyState } from '../EmptyState/EmptyState';
import { OrderSummary } from '../OrderSummary/OrderSummary';
import styles from './ShoppingBasket.module.scss';

export interface ShoppingBasketItem extends CartLine {
  removing?: boolean;
}

export interface ShoppingBasketProps {
  items?: ShoppingBasketItem[];
  continueHref?: string;
  checkoutHref?: string;
  className?: string;
  onContinue?: MouseEventHandler<HTMLElement>;
  onCheckout?: MouseEventHandler<HTMLElement>;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onRemoved?: (id: string) => void;
}

/** Page panier : articles (CartItem), « Continuer mes achats », sous-total, « Passer la commande » ; état vide inclus. */
export function ShoppingBasket({
  items = [],
  continueHref = '/collection',
  checkoutHref = '/paiement',
  className,
  onContinue,
  onCheckout,
  onQuantityChange,
  onRemove,
  onRemoved,
}: ShoppingBasketProps) {
  const subtotal = items.filter((i) => !i.removing).reduce((n, i) => n + i.unitPrice * i.quantity, 0);
  const empty = items.length === 0;
  return (
    <section className={cx(styles.sec, styles.root, className)}>
      <div className={styles.secInner}>
        <div className={styles.panel}>
          <div className={styles.head}>
            <h1 className="h2" tabIndex={-1}>Votre panier</h1>
            {!empty ? (
              <TextLink tone="brand" href={continueHref} iconLeft="arrow-left" onClick={onContinue}>
                Continuer mes achats
              </TextLink>
            ) : null}
          </div>
          {empty ? (
            <EmptyState kind="cart" headingLevel={2} action={{ label: 'Découvrir la collection', href: continueHref, onClick: onContinue }} />
          ) : (
            <>
              <div className={styles.cols} aria-hidden="true">
                <span className="body-small">Produit</span>
                <span className="body-small">Quantité</span>
                <span className="body-small">Total</span>
              </div>
              <ul className={styles.list}>
                {items.map((i, index) => (
                  <CartItem
                    key={i.id}
                    context="page"
                    name={i.name}
                    href={i.href}
                    description={i.description}
                    unitPrice={i.unitPrice}
                    quantity={i.quantity}
                    max={i.max}
                    image={i.image}
                    imageAlt={i.imageAlt}
                    removing={i.removing}
                    priority={index === 0}
                    onQuantityChange={(v) => onQuantityChange?.(i.id, v)}
                    onRemove={() => onRemove?.(i.id)}
                    onRemoved={() => onRemoved?.(i.id)}
                  />
                ))}
              </ul>
              <OrderSummary
                context="panier"
                subtotal={subtotal}
                title={false}
                className={styles.summary}
                action={{ label: 'Passer la commande', href: checkoutHref, onClick: onCheckout }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

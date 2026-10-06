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
  /** Niveau du titre : 1 par défaut (titre de la page) ; plus bas quand le bloc est montré dans une fiche de documentation. */
  headingLevel?: 1 | 2 | 3 | 4;
  onContinue?: MouseEventHandler<HTMLElement>;
  onCheckout?: MouseEventHandler<HTMLElement>;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onRemoved?: (id: string) => void;
}

/** Page panier : articles (CartItem), « Continuer mes achats », sous-total, « Passer la commande » ; état vide inclus. */
export function ShoppingBasket({
  items = [],
  continueHref = '/liste-produits/',
  checkoutHref = '/paiement/',
  className,
  headingLevel = 1,
  onContinue,
  onCheckout,
  onQuantityChange,
  onRemove,
  onRemoved,
}: ShoppingBasketProps) {
  const subtotal = items.filter((i) => !i.removing).reduce((n, i) => n + i.unitPrice * i.quantity, 0);
  const H = `h${headingLevel}` as 'h1' | 'h2' | 'h3' | 'h4';
  const empty = items.length === 0;
  return (
    <section className={cx(styles.sec, styles.root, className)}>
      <div className={styles.secInner}>
        <div className={styles.panel}>
          <div className={styles.head}>
            <H className="h2" tabIndex={-1}>Votre panier</H>
            {!empty ? (
              <TextLink tone="brand" href={continueHref} iconLeft="arrow-left" onClick={onContinue}>
                Continuer mes achats
              </TextLink>
            ) : null}
          </div>
          {empty ? (
            <EmptyState kind="cart" headingLevel={Math.min(headingLevel + 1, 4) as 2 | 3 | 4} action={{ label: 'Découvrir la collection', href: continueHref, onClick: onContinue }} />
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

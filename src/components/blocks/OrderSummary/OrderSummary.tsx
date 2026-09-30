'use client';

import { useState, type MouseEventHandler } from 'react';
import { cx } from '@/lib/cx';
import { formatPrice } from '@/lib/format';
import { useSafeId } from '@/lib/useSafeId';
import { Button } from '../../ui/Button/Button';
import { Icon } from '../../ui/Icon/Icon';
import { Skeleton } from '../../ui/Skeleton/Skeleton';
import styles from './OrderSummary.module.scss';

export interface OrderSummaryLine {
  name: string;
  price: number;
  quantity?: number;
}

export interface OrderSummaryProps {
  /** panier : sous-total et note ; paiement : lignes, livraison et total. */
  context?: 'panier' | 'paiement';
  lines?: OrderSummaryLine[];
  /** Sous-total imposé ; sinon somme des lignes. */
  subtotal?: number;
  /** Frais de livraison (0 = gratuite) ; absent = « Calculée à l'étape suivante ». */
  shipping?: number;
  /** Titre ; false pour aucun. */
  title?: string | false;
  /** Replié par défaut, avec bouton (mobile du tunnel de paiement). */
  collapsible?: boolean;
  loading?: boolean;
  action?: { label: string; href?: string; onClick?: MouseEventHandler<HTMLElement> };
  /** false : bouton à largeur naturelle. */
  actionFull?: boolean;
  className?: string;
}

/** Récapitulatif de commande : lignes, sous-total, livraison, total, action. */
export function OrderSummary({
  context = 'panier',
  lines = [],
  subtotal,
  shipping,
  title,
  collapsible,
  loading,
  action,
  actionFull = true,
  className,
}: OrderSummaryProps) {
  const paiement = context === 'paiement';
  const sub = subtotal ?? lines.reduce((n, l) => n + l.price * (l.quantity ?? 1), 0);
  const total = sub + (typeof shipping === 'number' ? shipping : 0);
  const [open, setOpen] = useState(!collapsible);
  const id = useSafeId('os');
  const rootCls = cx(styles.root, styles[context], className);

  if (loading) {
    return (
      <div className={rootCls} aria-busy="true">
        <p className="av-visually-hidden" role="status">
          Chargement du récapitulatif
        </p>
        <div className="body-medium">
          <Skeleton shape="line" lines={4} />
        </div>
      </div>
    );
  }

  const rows = (
    <div id={id} className={styles.body} hidden={!open}>
      {paiement && lines.length > 0 ? (
        <ul className={styles.lines}>
          {lines.map((l, i) => (
            <li key={`${l.name}-${i}`}>
              <span className="body-medium">
                {l.name}
                {(l.quantity ?? 1) > 1 ? <span className={styles.qty}>{` × ${l.quantity}`}</span> : null}
              </span>
              <span className="body-medium">{formatPrice(l.price * (l.quantity ?? 1))}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <dl className={styles.totals}>
        <div>
          <dt className="body-medium">Sous-total</dt>
          <dd className="body-medium">{formatPrice(sub)}</dd>
        </div>
        {paiement ? (
          <div>
            <dt className="body-medium">Livraison</dt>
            <dd className="body-medium">
              {shipping === undefined ? 'Calculée à l’étape suivante' : shipping === 0 ? 'Gratuite' : formatPrice(shipping)}
            </dd>
          </div>
        ) : null}
        {paiement ? (
          <div className={styles.total}>
            <dt className="h5">Total</dt>
            <dd className="price">{formatPrice(total)}</dd>
          </div>
        ) : null}
      </dl>
      {!paiement ? <p className={cx(styles.note, 'body-small')}>Taxes et livraison calculées au paiement</p> : null}
      {action ? (
        <Button href={action.href} onClick={action.onClick} fullWidth={actionFull ? 'mobile' : false}>
          {action.label}
        </Button>
      ) : null}
    </div>
  );

  return (
    <section className={rootCls} aria-label="Récapitulatif de commande">
      {collapsible ? (
        <button type="button" className={cx(styles.toggle, 'body-medium')} aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
          <span>{open ? 'Masquer le récapitulatif' : 'Afficher le récapitulatif'}</span>
          <span className={styles.toggleTotal}>
            {formatPrice(paiement ? total : sub)}
            <Icon name="chevron-down" size="sm" className={open ? styles.isOpen : undefined} />
          </span>
        </button>
      ) : title !== false ? (
        <h2 className={cx(styles.title, 'h4')}>{title ?? (paiement ? 'Récapitulatif' : 'Total')}</h2>
      ) : null}
      {rows}
    </section>
  );
}

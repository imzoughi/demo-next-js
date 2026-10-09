// Fiche d'une commande : suivi, articles, adresse de livraison, paiement et récapitulatif. Sans état : rendue à la construction.
import Image from 'next/image';
import { CheckoutProgress } from '@/components/blocks/CheckoutProgress/CheckoutProgress';
import { OrderSummary } from '@/components/blocks/OrderSummary/OrderSummary';
import { Icon, type IconName } from '@/components/ui/Icon/Icon';
import { cx } from '@/lib/cx';
import { formatPrice } from '@/lib/format';
import { withBase } from '@/lib/paths';
import type { Order } from '@/lib/api';
import { PageTitle } from './PageTitle';
import styles from './compte.module.scss';

const STATUS_ICON: Record<Order['status'], IconName> = { 'En préparation': 'package', Expédiée: 'truck', Livrée: 'circle-check' };
const STEPS = ['Préparation', 'Expédition', 'Livraison'];
const STEP_INDEX: Record<Order['status'], number> = { 'En préparation': 0, Expédiée: 1, Livrée: 2 };

export function OrderDetail({ order }: { order: Order }) {
  const subtotal = order.items.reduce((n, i) => n + i.unitPrice * i.quantity, 0);
  const count = order.items.reduce((n, i) => n + i.quantity, 0);
  return (
    <>
      <PageTitle title={`Commande N° ${order.number}`} />
      <dl className={styles.meta}>
        <div>
          <dt className="body-small">Date</dt>
          <dd className="body-medium">{order.date}</dd>
        </div>
        <div>
          <dt className="body-small">Statut</dt>
          <dd className="body-medium">
            <span className={cx(styles.status, order.status === 'Livrée' && styles.statusDone)}>
              <Icon name={STATUS_ICON[order.status]} size="sm" />
              {order.status}
            </span>
          </dd>
        </div>
        <div>
          <dt className="body-small">Total</dt>
          <dd className="body-medium">{formatPrice(order.total)}</dd>
        </div>
      </dl>

      <section className={styles.tracking} aria-labelledby="commande-suivi">
        <h2 className="h3" id="commande-suivi">
          Suivi de la commande
        </h2>
        <CheckoutProgress steps={STEPS} current={STEP_INDEX[order.status]} />
      </section>

      <div className={styles.orderGrid}>
        <section aria-labelledby="commande-articles">
          <h2 className={cx('h3', styles.articlesTitle)} id="commande-articles">
            {count > 1 ? `Articles (${count})` : 'Article'}
          </h2>
          <ul className={styles.items}>
            {order.items.map((item) => (
              <li key={item.id}>
                <Image className={styles.thumb} src={withBase(item.image)} alt={item.imageAlt} width={240} height={300} />
                <div className={styles.itemName}>
                  <p className="h5">{item.name}</p>
                  {item.description ? <p className="body-small">{item.description}</p> : null}
                </div>
                <p className={cx(styles.itemPrice, 'body-medium')}>{formatPrice(item.unitPrice * item.quantity)}</p>
                <p className={cx(styles.itemMeta, 'body-medium')}>{`Quantité : ${item.quantity} · ${formatPrice(item.unitPrice)} l’unité`}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.side}>
          <section aria-labelledby="commande-livraison">
            <h2 className={cx('h4', styles.sideTitle)} id="commande-livraison">
              Adresse de livraison
            </h2>
            <address className={cx('body-medium', styles.addressText)}>
              {order.shippingAddress.name}
              {order.shippingAddress.lines.map((l) => (
                <span key={l} className={styles.line}>
                  {l}
                </span>
              ))}
            </address>
          </section>
          <section aria-labelledby="commande-paiement">
            <h2 className={cx('h4', styles.sideTitle)} id="commande-paiement">
              Mode de paiement
            </h2>
            <p className={cx('body-medium', styles.plainText)}>
              {order.payment}
            </p>
          </section>
          <OrderSummary context="paiement" title="Récapitulatif" subtotal={subtotal} shipping={order.shipping} />
        </div>
      </div>
    </>
  );
}

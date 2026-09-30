'use client';

import type { Order } from '@/mocks/types';
import { cx } from '@/lib/cx';
import { formatPrice } from '@/lib/format';
import { Icon, type IconName } from '../../ui/Icon/Icon';
import { Skeleton } from '../../ui/Skeleton/Skeleton';
import { TextLink } from '../../ui/TextLink/TextLink';
import { EmptyState } from '../EmptyState/EmptyState';
import styles from './OrderList.module.scss';

const ORDER_ICON: Record<Order['status'], IconName> = {
  'En préparation': 'package',
  Expédiée: 'truck',
  Livrée: 'circle-check',
};

export interface OrderListProps {
  orders?: Order[];
  loading?: boolean;
  collectionHref?: string;
  className?: string;
  onBrowse?: () => void;
  /** Ouvre le détail d'une commande sans naviguer. */
  onOpen?: (order: Order) => void;
}

/** Liste des commandes : tableau dès 768 px, cartes en mobile ; états chargement et vide. */
export function OrderList({ orders = [], loading, collectionHref = '/collection', className, onBrowse, onOpen }: OrderListProps) {
  if (loading) {
    return (
      <div className={cx(styles.sec, className)} aria-busy="true">
        <p className="av-visually-hidden" role="status">
          Chargement des commandes
        </p>
        <div className="body-large">
          <Skeleton shape="line" lines={5} />
        </div>
      </div>
    );
  }
  if (!orders.length) {
    return (
      <div className={cx(styles.sec, className)}>
        <EmptyState
          icon="package"
          title="Aucune commande pour l’instant"
          text="Vos commandes apparaîtront ici, avec leur suivi."
          headingLevel={2}
          action={{ label: 'Découvrir la collection', href: collectionHref, onClick: onBrowse }}
        />
      </div>
    );
  }
  return (
    <div className={cx(styles.sec, className)}>
      <table className={styles.table}>
        <caption className="av-visually-hidden">Vos commandes</caption>
        <thead>
          <tr>
            {['Commande', 'Date', 'Statut', 'Total', ''].map((c, i) => (
              <th key={i} scope="col" className="body-small">
                {c || <span className="av-visually-hidden">Action</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.number}>
              <th scope="row" className={cx(styles.num, 'h5')} data-label="Commande">
                {`N° ${o.number}`}
              </th>
              <td className="body-medium" data-label="Date">
                {o.date}
              </td>
              <td className="body-medium" data-label="Statut">
                <span className={styles.status}>
                  <Icon name={ORDER_ICON[o.status]} size="sm" />
                  {o.status}
                </span>
              </td>
              <td className={cx('body-medium', styles.total)} data-label="Total">
                {formatPrice(o.total)}
              </td>
              <td className={styles.action}>
                <TextLink
                  tone="brand"
                  href={o.href ?? '#'}
                  onClick={
                    onOpen
                      ? (e) => {
                          e.preventDefault();
                          onOpen(o);
                        }
                      : undefined
                  }
                  iconRight="chevron-right"
                  aria-label={`Voir le détail de la commande ${o.number}`}
                >
                  Voir le détail
                </TextLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

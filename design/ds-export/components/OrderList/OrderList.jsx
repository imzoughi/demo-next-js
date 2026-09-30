/* Avion — boutique-demo · OrderList (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import EmptyState from '../EmptyState/EmptyState.jsx';
import Icon from '../Icon/Icon.jsx';
import Skeleton from '../Skeleton/Skeleton.jsx';
import TextLink from '../TextLink/TextLink.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Prix en euros : « 250 € », « 1 250 € » ——— */
const EUR =
  window.Intl && Intl.NumberFormat
    ? new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    : null;
function formatPrice(n) {
  return EUR ? EUR.format(n) : n + ' €';
}
/* ——— OrderList : commandes ——— */
const ORDER_ICON = {
  'En préparation': 'package',
  Expédiée: 'truck',
  Livrée: 'circle-check',
};
function OrderList(props) {
  var orders = props.orders || [];
  if (props.loading)
    return (
      <div className={cx('av-sec', 'av-orders', props.className)} aria-busy="true">
        <p className="av-visually-hidden" role="status">
          Chargement des commandes
        </p>
        <div className="body-large">
          <Skeleton shape="line" lines={5} />
        </div>
      </div>
    );
  if (!orders.length)
    return (
      <div className={cx('av-sec', 'av-orders', props.className)}>
        <EmptyState
          icon="package"
          title="Aucune commande pour l’instant"
          text="Vos commandes apparaîtront ici, avec leur suivi."
          headingLevel={2}
          action={{
            label: 'Découvrir la collection',
            href: props.collectionHref || '/collection',
            onClick: props.onBrowse,
          }}
        />
      </div>
    );
  return (
    <div className={cx('av-sec', 'av-orders', props.className)}>
      <table className="av-orders__table">
        <caption className="av-visually-hidden">Vos commandes</caption>
        <thead>
          <tr>
            {['Commande', 'Date', 'Statut', 'Total', ''].map(function (c, i) {
              return (
                <th key={i} scope="col" className="body-small">
                  {c || <span className="av-visually-hidden">Action</span>}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {orders.map(function (o) {
            return (
              <tr key={o.number}>
                <th scope="row" className="av-orders__num h5" data-label="Commande">
                  {'N° ' + o.number}
                </th>
                <td className="body-medium" data-label="Date">
                  {o.date}
                </td>
                <td className="body-medium" data-label="Statut">
                  <span className="av-orders__status">
                    <Icon name={ORDER_ICON[o.status] || 'package'} size="sm" />
                    {o.status}
                  </span>
                </td>
                <td className="body-medium av-orders__total" data-label="Total">
                  {formatPrice(o.total)}
                </td>
                <td className="av-orders__action">
                  <TextLink
                    tone="brand"
                    href={o.href || '#'}
                    onClick={
                      props.onOpen
                        ? function (e) {
                            e.preventDefault();
                            props.onOpen(o);
                          }
                        : undefined
                    }
                    iconRight="chevron-right"
                    aria-label={'Voir le détail de la commande ' + o.number}
                  >
                    Voir le détail
                  </TextLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderList;

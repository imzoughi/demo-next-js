/* Avion — boutique-demo · OrderSummary (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';
import Skeleton from '../Skeleton/Skeleton.jsx';

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
/* ——— OrderSummary : récapitulatif (panier, paiement) ——— */
function OrderSummary(props) {
  var ctx = props.context === 'paiement' ? 'paiement' : 'panier';
  var lines = props.lines || [];
  var sub =
    props.subtotal !== undefined
      ? props.subtotal
      : lines.reduce(function (n, l) {
          return n + l.price * (l.quantity || 1);
        }, 0);
  var ship = props.shipping;
  var total = sub + (typeof ship === 'number' ? ship : 0);
  var o = React.useState(!props.collapsible),
    open = o[0],
    setOpen = o[1];
  var id = 'av-os' + React.useId().replace(/:/g, '');
  if (props.loading)
    return (
      <div className={cx('av-summary', 'av-summary--' + ctx, props.className)} aria-busy="true">
        <p className="av-visually-hidden" role="status">
          Chargement du récapitulatif
        </p>
        <div className="body-medium">
          <Skeleton shape="line" lines={4} />
        </div>
      </div>
    );
  var rows = (
    <div id={id} className="av-summary__body" hidden={!open}>
      {ctx === 'paiement' && lines.length > 0 && (
        <ul className="av-summary__lines">
          {lines.map(function (l, i) {
            return (
              <li key={i}>
                <span className="body-medium">
                  {l.name}
                  {(l.quantity || 1) > 1 && <span className="av-summary__qty">{' × ' + l.quantity}</span>}
                </span>
                <span className="body-medium">{formatPrice(l.price * (l.quantity || 1))}</span>
              </li>
            );
          })}
        </ul>
      )}
      <dl className="av-summary__totals">
        <div>
          <dt className="body-medium">Sous-total</dt>
          <dd className="body-medium">{formatPrice(sub)}</dd>
        </div>
        {ctx === 'paiement' && (
          <div>
            <dt className="body-medium">Livraison</dt>
            <dd className="body-medium">
              {ship === undefined
                ? 'Calculée à l’étape suivante'
                : ship === 0
                  ? 'Gratuite'
                  : formatPrice(ship)}
            </dd>
          </div>
        )}
        {ctx === 'paiement' && (
          <div className="av-summary__total">
            <dt className="h5">Total</dt>
            <dd className="price">{formatPrice(total)}</dd>
          </div>
        )}
      </dl>
      {ctx === 'panier' && (
        <p className="av-summary__note body-small">Taxes et livraison calculées au paiement</p>
      )}
      {props.action && (
        <Button
          href={props.action.href}
          onClick={props.action.onClick}
          fullWidth={props.actionFull === false ? false : 'mobile'}
          className="av-summary__cta"
        >
          {props.action.label}
        </Button>
      )}
    </div>
  );
  return (
    <section
      className={cx('av-summary', 'av-summary--' + ctx, props.className)}
      aria-label="Récapitulatif de commande"
    >
      {props.collapsible ? (
        <button
          type="button"
          className="av-summary__toggle body-medium"
          aria-expanded={open ? 'true' : 'false'}
          aria-controls={id}
          onClick={function () {
            setOpen(!open);
          }}
        >
          <span>{open ? 'Masquer le récapitulatif' : 'Afficher le récapitulatif'}</span>
          <span className="av-summary__toggle-total">
            {formatPrice(ctx === 'paiement' ? total : sub)}
            <Icon name="chevron-down" size="sm" className={open ? 'is-open' : ''} />
          </span>
        </button>
      ) : (
        props.title !== false && (
          <h2 className="av-summary__title h4">
            {props.title || (ctx === 'paiement' ? 'Récapitulatif' : 'Total')}
          </h2>
        )
      )}
      {rows}
    </section>
  );
}

export default OrderSummary;

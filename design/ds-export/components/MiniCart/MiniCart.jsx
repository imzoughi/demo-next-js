/* Avion — boutique-demo · MiniCart (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Button from '../Button/Button.jsx';
import CartItem from '../CartItem/CartItem.jsx';
import Drawer from '../Drawer/Drawer.jsx';
import EmptyState from '../EmptyState/EmptyState.jsx';
import Skeleton from '../Skeleton/Skeleton.jsx';
import Toast from '../Toast/Toast.jsx';

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
/* ——— MiniCart : aperçu du panier après ajout ——— */
function MiniCart(props) {
  var items = props.items || [];
  var live = items.filter(function (i) {
    return !i.removing;
  });
  var count = live.reduce(function (n, i) {
    return n + (i.quantity || 1);
  }, 0);
  var subtotal = live.reduce(function (n, i) {
    return n + i.unitPrice * (i.quantity || 1);
  }, 0);
  var empty = !props.loading && !items.length;
  var body;
  if (props.loading)
    body = (
      <div className="av-minicart__loading">
        <p className="av-visually-hidden" role="status">
          Chargement du panier
        </p>
        {[0, 1].map(function (k) {
          return (
            <div key={k} className="av-minicart__skel">
              <div className="av-minicart__skel-img">
                <Skeleton shape="image" ratio="4 / 5" />
              </div>
              <div className="h5">
                <Skeleton shape="line" lines={3} />
              </div>
            </div>
          );
        })}
      </div>
    );
  else if (empty)
    body = (
      <EmptyState
        kind="cart"
        headingLevel={3}
        action={{
          label: 'Découvrir la collection',
          href: props.collectionHref || '/collection',
          onClick: props.onBrowse,
        }}
      />
    );
  /* Toast « … retiré · Annuler » rendu DANS le panneau : le focus y est piégé, il reste joignable au clavier. */
  var notice = (
    <Toast
      key="n"
      className="av-minicart__toast"
      position="static"
      open={!!props.notice}
      tone={(props.notice && props.notice.tone) || 'info'}
      message={props.notice && props.notice.message}
      action={
        props.notice && props.notice.actionLabel
          ? {
              label: props.notice.actionLabel,
              onClick: props.notice.onAction,
            }
          : undefined
      }
      duration={props.notice && props.notice.duration}
      onDismiss={props.notice && props.notice.onDismiss}
    />
  );
  if (!props.loading && !empty)
    body = [
      notice,
      <ul key="l" className="av-minicart__list">
        {items.map(function (i) {
          return (
            <CartItem
              {...Object.assign(
                {
                  key: i.id,
                  context: 'drawer',
                },
                i,
                {
                  onQuantityChange: function (v) {
                    if (props.onQuantityChange) props.onQuantityChange(i.id, v);
                  },
                  onRemove: function () {
                    if (props.onRemove) props.onRemove(i.id);
                  },
                  onRemoved: function () {
                    if (props.onRemoved) props.onRemoved(i.id);
                  },
                },
              )}
            />
          );
        })}
      </ul>,
    ];
  var footer =
    !empty && !props.loading ? (
      <React.Fragment>
        <div className="av-minicart__sum">
          <span className="h5">Sous-total</span>
          <span className="price av-minicart__subtotal" aria-live="polite">
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className="av-minicart__note body-small">Taxes et livraison calculées au paiement</p>
        <div className="av-minicart__actions">
          <Button type="secondary" href={props.cartHref || '/panier'} fullWidth={true}>
            Voir le panier
          </Button>
          <Button href={props.checkoutHref || '/paiement'} fullWidth={true}>
            Commander
          </Button>
        </div>
      </React.Fragment>
    ) : null;
  return (
    <Drawer
      open={props.open}
      static={props.static}
      onClose={props.onClose}
      onClosed={props.onClosed}
      side="right"
      title={props.loading || !count ? 'Votre panier' : 'Votre panier (' + count + ')'}
      busy={props.loading}
      footer={footer}
      className={cx('av-minicart', props.className)}
    >
      {body}
    </Drawer>
  );
}

export default MiniCart;

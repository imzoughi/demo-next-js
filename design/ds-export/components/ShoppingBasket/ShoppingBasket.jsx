/* Avion — boutique-demo · ShoppingBasket (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import CartItem from '../CartItem/CartItem.jsx';
import EmptyState from '../EmptyState/EmptyState.jsx';
import OrderSummary from '../OrderSummary/OrderSummary.jsx';
import TextLink from '../TextLink/TextLink.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— ShoppingBasket : page panier ——— */
function ShoppingBasket(props) {
  var items = props.items || [];
  var live = items.filter(function (i) {
    return !i.removing;
  });
  var sub = live.reduce(function (n, i) {
    return n + i.unitPrice * (i.quantity || 1);
  }, 0);
  var empty = !items.length;
  return (
    <section className={cx('av-sec', 'av-basket', props.className)}>
      <div className="av-sec__inner">
        <div className="av-basket__panel">
          <div className="av-basket__head">
            <h1 className="h2">Votre panier</h1>
            {!empty && (
              <TextLink
                tone="brand"
                href={props.continueHref || '/collection'}
                iconLeft="arrow-left"
                onClick={props.onContinue}
              >
                Continuer mes achats
              </TextLink>
            )}
          </div>
          {empty ? (
            <EmptyState
              kind="cart"
              headingLevel={2}
              action={{
                label: 'Découvrir la collection',
                href: props.continueHref || '/collection',
                onClick: props.onContinue,
              }}
            />
          ) : (
            <React.Fragment>
              <div className="av-basket__cols" aria-hidden="true">
                <span className="body-small">Produit</span>
                <span className="body-small">Quantité</span>
                <span className="body-small">Total</span>
              </div>
              <ul className="av-basket__list">
                {items.map(function (i) {
                  return (
                    <CartItem
                      {...Object.assign(
                        {
                          key: i.id,
                          context: 'page',
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
              </ul>
              <OrderSummary
                context="panier"
                subtotal={sub}
                title={false}
                className="av-basket__summary"
                action={{
                  label: 'Passer la commande',
                  href: props.checkoutHref || '/paiement',
                  onClick: props.onCheckout,
                }}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </section>
  );
}

export default ShoppingBasket;

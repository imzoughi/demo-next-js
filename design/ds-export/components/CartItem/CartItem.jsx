/* Avion — boutique-demo · CartItem (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Stepper from '../Stepper/Stepper.jsx';
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
/* ——— CartItem : ligne d'article du panier et du mini-panier ——— */
function CartItem(props) {
  var ctx = props.context === 'drawer' ? 'drawer' : 'page';
  var q = props.quantity || 1,
    max = props.max === undefined ? 99 : props.max;
  function ended(e) {
    if (
      e.target === e.currentTarget &&
      e.animationName === 'av-ci-collapse' &&
      props.removing &&
      props.onRemoved
    )
      props.onRemoved();
  }
  var name = props.href ? (
    <a href={props.href} className={'av-cartitem__name ' + (ctx === 'drawer' ? 'h5' : 'h4')}>
      {props.name}
    </a>
  ) : (
    <p className={'av-cartitem__name ' + (ctx === 'drawer' ? 'h5' : 'h4')}>{props.name}</p>
  );
  var stepper = (
    <div className="av-cartitem__qty">
      <Stepper
        label={'Quantité, ' + props.name}
        min={1}
        max={max}
        value={q}
        onChange={props.onQuantityChange}
        disabled={props.disabled}
      />
      {q >= max && <p className="av-cartitem__stock body-medium">Stock maximum atteint</p>}
    </div>
  );
  var remove = (
    <TextLink
      className="av-cartitem__remove"
      iconLeft="trash-2"
      onClick={props.onRemove}
      aria-label={'Retirer ' + props.name + ' du panier'}
    >
      Retirer
    </TextLink>
  );
  return (
    <li
      className={cx('av-cartitem', 'av-cartitem--' + ctx, props.removing && 'is-removing', props.className)}
      onAnimationEnd={ended}
    >
      <div className="av-cartitem__inner">
        <img className="av-cartitem__img" src={props.image} alt={props.imageAlt || ''} />
        <div className="av-cartitem__info">
          {name}
          {props.description && ctx === 'page' && (
            <p className="av-cartitem__desc body-medium">{props.description}</p>
          )}
          <p className="av-cartitem__unit body-medium">{formatPrice(props.unitPrice)}</p>
          {ctx === 'drawer' && (
            <div className="av-cartitem__row">
              {stepper}
              <p className="av-cartitem__total body-medium">
                <span className="av-visually-hidden">{'Total : '}</span>
                {formatPrice(props.unitPrice * q)}
              </p>
            </div>
          )}
          {remove}
        </div>
        {ctx === 'page' && stepper}
        {ctx === 'page' && (
          <p className="av-cartitem__total body-large">
            <span className="av-visually-hidden">{'Total : '}</span>
            {formatPrice(props.unitPrice * q)}
          </p>
        )}
      </div>
    </li>
  );
}

export default CartItem;

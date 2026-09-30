/* Avion — boutique-demo · ProductCard (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
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
/* ——— ProductCard : toute la carte est un lien vers la fiche ——— */
function ProductCard(props) {
  var size = props.size === 'lg' ? 'lg' : 'sm';
  if (props.loading)
    return (
      <div className={cx('av-pcard', 'av-pcard--' + size, 'is-loading', props.className)} aria-hidden="true">
        <Skeleton shape="card" ratio={size === 'lg' ? '5 / 3' : '4 / 5'} />
      </div>
    );
  return (
    <a
      href={props.href || '#'}
      className={cx('av-pcard', 'av-pcard--' + size, props.className)}
      onClick={props.onClick}
    >
      <span className="av-pcard__media">
        <img className="av-pcard__img" src={props.image} alt={props.imageAlt || ''} loading="lazy" />
      </span>
      <span className="av-pcard__name h4">{props.name}</span>
      <span className="av-pcard__price body-large">{formatPrice(props.price)}</span>
    </a>
  );
}

export default ProductCard;
export { formatPrice };

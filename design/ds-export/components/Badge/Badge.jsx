/* Avion — boutique-demo · Badge (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Badge : pastille de quantité, masquée à 0, « 99+ » au-delà ——— */
function Badge(props) {
  var n = Math.max(0, Math.floor(props.count || 0));
  if (!n) return null;
  var txt = n > 99 ? '99+' : String(n);
  return (
    <span
      className={cx(
        'av-badge',
        'body-small',
        props.tone === 'inverse' && 'av-badge--inverse',
        props.className,
      )}
      aria-hidden="true"
    >
      <span key={txt} className="av-badge__value">
        {txt}
      </span>
    </span>
  );
}
function cartLabel(n) {
  return n > 0 ? 'Panier, ' + n + (n > 1 ? ' articles' : ' article') : 'Panier, vide';
}

export default Badge;
export { cartLabel };

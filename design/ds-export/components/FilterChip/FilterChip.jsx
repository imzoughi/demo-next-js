/* Avion — boutique-demo · FilterChip (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Icon from '../Icon/Icon.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— FilterChip : filtre actif retirable ——— */
function FilterChip(props) {
  var st = React.useState(false),
    leaving = st[0],
    setLeaving = st[1];
  function remove() {
    if (!leaving) setLeaving(true);
  }
  function ended(e) {
    if (e.target === e.currentTarget && leaving && props.onRemove) props.onRemove();
  }
  return (
    <button
      type="button"
      className={cx('av-chip', 'body-medium', leaving && 'is-leaving', props.className)}
      aria-label={'Retirer le filtre ' + props.label}
      onClick={remove}
      onAnimationEnd={ended}
      disabled={props.disabled}
    >
      <span>{props.label}</span>
      <Icon name="x" size="sm" />
    </button>
  );
}

export default FilterChip;

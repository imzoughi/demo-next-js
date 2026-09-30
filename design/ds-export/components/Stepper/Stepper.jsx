/* Avion — boutique-demo · Stepper (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Icon from '../Icon/Icon.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Stepper : quantité entre min et max ——— */
function Stepper(props) {
  var min = props.min === undefined ? 1 : props.min,
    max = props.max === undefined ? 99 : props.max;
  var controlled = props.value !== undefined;
  var st = React.useState(props.defaultValue === undefined ? min : props.defaultValue);
  var value = controlled ? props.value : st[0];
  var dis = !!props.disabled;
  var label = props.label || 'Quantité';
  function set(v) {
    v = Math.max(min, Math.min(max, v));
    if (v === value) return;
    if (!controlled) st[1](v);
    if (props.onChange) props.onChange(v);
  }
  var atMin = value <= min,
    atMax = value >= max;
  function btn(dir) {
    var off = dis || (dir < 0 ? atMin : atMax);
    return (
      <button
        type="button"
        className="av-stepper__btn"
        aria-disabled={off ? 'true' : undefined}
        aria-label={dir < 0 ? 'Diminuer la quantité' : 'Augmenter la quantité'}
        disabled={dis ? true : undefined}
        onClick={function () {
          if (!off) set(value + dir);
        }}
      >
        <Icon name={dir < 0 ? 'minus' : 'plus'} size="sm" strokeWidth={2} />
      </button>
    );
  }
  var live =
    label +
    ' : ' +
    value +
    (atMax && !dis ? ', stock maximum atteint' : '') +
    (atMin && !dis && value === min && min > 0 ? '' : '');
  return (
    <div className={cx('av-stepper', dis && 'is-disabled', props.className)} role="group" aria-label={label}>
      {btn(-1)}
      <output className="av-stepper__value body-medium" aria-hidden="true">
        {value}
      </output>
      {btn(1)}
      <span className="av-visually-hidden" aria-live="polite">
        {live}
      </span>
    </div>
  );
}

export default Stepper;

/* Avion — boutique-demo · Checkbox (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Icon from '../Icon/Icon.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
function omit(props, keys) {
  var o = {};
  for (var k in props) if (keys.indexOf(k) < 0) o[k] = props[k];
  return o;
}
/* ——— Messages sous un champ (aide, erreur, succès) ——— */
function FieldMessage(p) {
  if (!p.text) return null;
  var tone = p.tone || 'hint';
  return (
    <p
      id={p.id}
      className={cx('av-field-msg', tone === 'hint' ? 'body-small' : 'body-medium', 'av-field-msg--' + tone)}
    >
      {tone === 'error' && <Icon name="circle-alert" size="sm" />}
      {tone === 'success' && <Icon name="check" size="sm" />}
      <span>{p.text}</span>
    </p>
  );
}
function describedBy() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ') || undefined;
}
/* ——— Checkbox et Radio : même gabarit, toute la ligne cliquable ——— */
function choice(kind) {
  return function (props) {
    var autoId = React.useId();
    var id = props.id || 'av-' + kind + autoId.replace(/:/g, '');
    var hintId = props.hint ? id + '-aide' : null,
      errId = props.error ? id + '-err' : null;
    var rest = omit(props, ['id', 'label', 'hint', 'count', 'error', 'className', 'tone']);
    return (
      <div
        className={cx(
          'av-choice',
          'av-choice--' + kind,
          props.error && 'is-error',
          props.disabled && 'is-disabled',
          props.className,
        )}
      >
        <label htmlFor={id} className="av-choice__row body-medium">
          <input
            {...Object.assign(rest, {
              id: id,
              type: kind,
              className: 'av-choice__input',
              'aria-invalid': props.error ? 'true' : undefined,
              'aria-describedby': describedBy(hintId, errId),
            })}
          />
          <span className="av-choice__box" aria-hidden="true">
            {kind === 'checkbox' && <Icon name="check" size="sm" strokeWidth={2.5} />}
          </span>
          <span className="av-choice__text">
            <span className="av-choice__label">{props.label}</span>
            {props.hint && (
              <span id={hintId} className="av-choice__hint body-medium">
                {props.hint}
              </span>
            )}
          </span>
          {props.count !== undefined && (
            <span className="av-choice__count">
              <span className="av-visually-hidden">{', '}</span>
              {props.count}
              <span className="av-visually-hidden">{' produits'}</span>
            </span>
          )}
        </label>
        <FieldMessage id={errId} text={props.error} tone="error" />
      </div>
    );
  };
}
const Checkbox = choice('checkbox');

export default Checkbox;

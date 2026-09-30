/* Avion — boutique-demo · TextInput (design system ds-export 1.0.0).
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
/* ——— TextInput ——— */
const KEYBOARDS = {
  text: {
    type: 'text',
  },
  email: {
    type: 'email',
    inputMode: 'email',
    autoCapitalize: 'off',
    spellCheck: false,
  },
  tel: {
    type: 'tel',
    inputMode: 'tel',
  },
  numeric: {
    type: 'text',
    inputMode: 'numeric',
    pattern: '[0-9 ]*',
  },
  password: {
    type: 'password',
  },
};
function TextInput(props) {
  var autoId = React.useId();
  var id = props.id || 'av-in' + autoId.replace(/:/g, '');
  var variant = props.variant === 'opaque' ? 'opaque' : 'primary';
  var kb = KEYBOARDS[props.type] || KEYBOARDS.text;
  var hintId = props.hint ? id + '-aide' : null,
    msgId = props.error || props.success ? id + '-msg' : null;
  var rest = omit(props, [
    'id',
    'label',
    'hideLabel',
    'hint',
    'error',
    'success',
    'type',
    'variant',
    'optional',
    'className',
    'autocomplete',
    'autoComplete',
  ]);
  return (
    <div
      className={cx(
        'av-field',
        'av-field--' + variant,
        props.error && 'is-error',
        props.success && !props.error && 'is-success',
        props.disabled && 'is-disabled',
        props.className,
      )}
    >
      <label
        htmlFor={id}
        className={cx('av-field__label', 'body-medium', props.hideLabel && 'av-visually-hidden')}
      >
        {props.label}
        {props.optional && <span className="av-field__optional">{' (facultatif)'}</span>}
      </label>
      <input
        {...Object.assign({}, kb, rest, {
          id: id,
          className: cx('av-input', 'body-medium'),
          autoComplete: props.autoComplete || props.autocomplete,
          required: props.optional ? undefined : props.required,
          'aria-invalid': props.error ? 'true' : undefined,
          'aria-describedby': describedBy(hintId, msgId),
        })}
      />
      <FieldMessage id={hintId} text={props.hint} tone="hint" />
      <div aria-live="polite">
        <FieldMessage
          key={props.error ? 'e' : 's'}
          id={msgId}
          text={props.error || props.success}
          tone={props.error ? 'error' : 'success'}
        />
      </div>
    </div>
  );
}

export default TextInput;

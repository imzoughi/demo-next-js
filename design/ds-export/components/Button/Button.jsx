/* Avion — boutique-demo · Button (design system ds-export 1.0.0).
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
/* ——— Button : primary, secondary, white, opaque, ghost · md 56 / sm 48 ——— */
const BTN_TYPES = ['primary', 'secondary', 'white', 'opaque', 'ghost'];
function Button(props) {
  var type = BTN_TYPES.indexOf(props.type) >= 0 ? props.type : 'primary';
  var size = props.size === 'sm' ? 'sm' : 'md';
  var loading = !!props.loading,
    disabled = !!props.disabled;
  var inactive = loading || disabled;
  var iconRight = props.iconRight === true ? 'chevron-down' : props.iconRight;
  var rest = omit(props, [
    'type',
    'size',
    'iconRight',
    'fullWidth',
    'loading',
    'loadingLabel',
    'disabled',
    'className',
    'children',
    'href',
    'htmlType',
    'onClick',
  ]);
  var cls = cx(
    'av-btn',
    'body-medium',
    'av-btn--' + type,
    'av-btn--' + size,
    props.fullWidth === true && 'av-btn--full',
    props.fullWidth === 'mobile' && 'av-btn--full-mobile',
    loading && 'is-loading',
    disabled && 'is-disabled',
    props.className,
  );
  var content = [
    loading && <Icon key="l" name="loader-circle" size="md" spin={true} />,
    <span key="t" className="av-btn__label">
      {loading && props.loadingLabel ? props.loadingLabel : props.children}
    </span>,
    !loading && iconRight && <Icon key="i" name={iconRight} size="md" />,
  ];
  var onClick = function (e) {
    if (inactive) {
      e.preventDefault();
      return;
    }
    if (props.onClick) props.onClick(e);
  };
  if (props.href) {
    return (
      <a
        {...Object.assign(rest, {
          className: cls,
          href: inactive ? undefined : props.href,
          role: inactive ? 'link' : undefined,
          'aria-disabled': inactive ? 'true' : undefined,
          'aria-busy': loading ? 'true' : undefined,
          onClick: onClick,
        })}
      >
        {content}
      </a>
    );
  }
  /* aria-disabled plutôt que disabled pendant le chargement : le bouton garde le focus et annonce son état. */
  return (
    <button
      {...Object.assign(rest, {
        className: cls,
        type: props.htmlType || 'button',
        disabled: disabled && !loading ? true : undefined,
        'aria-disabled': loading ? 'true' : undefined,
        'aria-busy': loading ? 'true' : undefined,
        onClick: onClick,
      })}
    >
      {content}
    </button>
  );
}

export default Button;

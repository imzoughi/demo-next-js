/* Avion — boutique-demo · IconButton (design system ds-export 1.0.0).
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
/* ——— IconButton : icône inchangée, zone 44 × 44, nom accessible obligatoire ——— */
function IconButton(props) {
  if (!props.label && window.console)
    console.warn('Avion.IconButton : « label » est obligatoire (nom accessible).');
  var tone = props.tone === 'inverse' ? 'inverse' : 'default';
  var rest = omit(props, [
    'icon',
    'label',
    'tone',
    'size',
    'className',
    'children',
    'href',
    'pressed',
    'expanded',
  ]);
  var common = Object.assign(rest, {
    className: cx('av-iconbtn', 'av-iconbtn--' + tone, props.className),
    'aria-label': props.label,
    'aria-pressed': props.pressed === undefined ? undefined : String(!!props.pressed),
    'aria-expanded': props.expanded === undefined ? undefined : String(!!props.expanded),
  });
  var content = [<Icon key="i" name={props.icon} size={props.size || 'sm'} />, props.children];
  if (props.href)
    return (
      <a
        {...Object.assign(common, {
          href: props.disabled ? undefined : props.href,
          'aria-disabled': props.disabled ? 'true' : undefined,
        })}
      >
        {content}
      </a>
    );
  return (
    <button
      {...Object.assign(common, {
        type: 'button',
      })}
    >
      {content}
    </button>
  );
}

export default IconButton;

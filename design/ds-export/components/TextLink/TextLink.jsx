/* Avion — boutique-demo · TextLink (design system ds-export 1.0.0).
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
/* ——— TextLink : lien texte, ou bouton d'aspect lien quand il n'a pas de href (« Retirer ») ——— */
function TextLink(props) {
  var tone = ['default', 'brand', 'inverse'].indexOf(props.tone) >= 0 ? props.tone : 'default';
  var rest = omit(props, ['tone', 'inline', 'iconLeft', 'iconRight', 'className', 'children', 'href']);
  var cls = cx(
    'av-link',
    !props.inline && 'body-medium',
    'av-link--' + tone,
    props.inline && 'av-link--inline',
    props.className,
  );
  var content = [
    props.iconLeft && <Icon key="l" name={props.iconLeft} size="md" />,
    <span key="t" className="av-link__label">
      {props.children}
    </span>,
    props.iconRight && <Icon key="r" name={props.iconRight} size="md" />,
  ];
  if (props.href)
    return (
      <a
        {...Object.assign(rest, {
          className: cls,
          href: props.href,
        })}
      >
        {content}
      </a>
    );
  return (
    <button
      {...Object.assign(rest, {
        className: cls,
        type: 'button',
      })}
    >
      {content}
    </button>
  );
}

export default TextLink;

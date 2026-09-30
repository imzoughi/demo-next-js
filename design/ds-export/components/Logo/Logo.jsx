/* Avion — boutique-demo · Logo (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Logo : « Avion » en texte Red Hat Display, lien vers l'accueil ——— */
function Logo(props) {
  var tone = props.tone === 'inverse' ? 'inverse' : 'default';
  var rest = {};
  for (var k in props)
    if (['tone', 'href', 'current', 'className', 'label'].indexOf(k) < 0) rest[k] = props[k];
  return (
    <a
      {...Object.assign(rest, {
        className: cx('av-logo', 'h3', 'av-logo--' + tone, props.className),
        href: props.href || '/',
        'aria-label': props.label || 'Avion, accueil',
        'aria-current': props.current ? 'page' : undefined,
      })}
    >
      Avion
    </a>
  );
}

export default Logo;

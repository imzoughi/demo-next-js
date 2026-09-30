/* Avion — boutique-demo · Breadcrumb (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Icon from '../Icon/Icon.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Breadcrumb : « Accueil › Catégorie › Produit » ; en mobile, lien de retour ——— */
function Breadcrumb(props) {
  var items = props.items || [];
  var parent = items.length > 1 ? items[items.length - 2] : null;
  return (
    <nav className={cx('av-crumb', props.className)} aria-label="Fil d’Ariane">
      <ol className="av-crumb__list">
        {items.map(function (it, i) {
          var last = i === items.length - 1;
          return (
            <li key={i} className={cx('av-crumb__item', last && 'is-current')}>
              {i > 0 && <Icon name="chevron-right" size="sm" className="av-crumb__sep" />}
              {last ? (
                <span className="av-crumb__current body-medium" aria-current="page" title={it.label}>
                  {it.label}
                </span>
              ) : (
                <a href={it.href} className="av-crumb__link body-medium" onClick={it.onClick}>
                  {it.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
      {parent && (
        <a href={parent.href} className="av-crumb__back body-medium" onClick={parent.onClick}>
          <Icon name="arrow-left" size="sm" />
          <span>
            <span className="av-visually-hidden">{'Retour à '}</span>
            {parent.label}
          </span>
        </a>
      )}
    </nav>
  );
}

export default Breadcrumb;

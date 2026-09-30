/* Avion — boutique-demo · EmptyState (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Button from '../Button/Button.jsx';
import Icon from '../Icon/Icon.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— EmptyState : titre, phrase courte, bouton ——— */
const EMPTY = {
  cart: {
    icon: 'shopping-cart',
    title: 'Votre panier est vide',
    text: 'Nos pièces n’attendent que vous : céramiques, chaises, tables et bien plus.',
    action: 'Découvrir la collection',
  },
  results: {
    icon: 'search',
    title: 'Aucun produit ne correspond',
    text: 'Essayez avec moins de filtres ou une autre catégorie.',
    action: 'Effacer les filtres',
  },
};
function EmptyState(props) {
  var preset = EMPTY[props.kind] || {};
  var title = props.title || preset.title,
    text = props.text || preset.text;
  var action =
    props.action ||
    (preset.action
      ? {
          label: preset.action,
        }
      : null);
  var H = 'h' + (props.headingLevel || 2);
  return (
    <div className={cx('av-empty', props.className)}>
      {(props.icon || preset.icon) && (
        <Icon name={props.icon || preset.icon} size="lg" className="av-empty__icon" />
      )}
      <H className="av-empty__title h3">{title}</H>
      {text && <p className="av-empty__text body-medium">{text}</p>}
      {action && (
        <Button
          type={action.type || 'primary'}
          href={action.href}
          onClick={action.onClick}
          fullWidth="mobile"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;

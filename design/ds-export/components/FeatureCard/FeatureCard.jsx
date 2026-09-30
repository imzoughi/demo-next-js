/* Avion — boutique-demo · FeatureCard (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Icon from '../Icon/Icon.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— FeatureCard : avantage (pictogramme, titre, texte) ——— */
function FeatureCard(props) {
  var H = 'h' + (props.headingLevel || 3);
  return (
    <div className={cx('av-fcard', props.filled !== false && 'av-fcard--filled', props.className)}>
      {props.icon && <Icon name={props.icon} size="lg" className="av-fcard__icon" />}
      <H className="av-fcard__title h4">{props.title}</H>
      <p className="av-fcard__text body-medium">{props.text}</p>
    </div>
  );
}

export default FeatureCard;

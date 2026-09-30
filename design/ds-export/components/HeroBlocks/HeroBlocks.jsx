/* Avion — boutique-demo · HeroBlocks (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Button from '../Button/Button.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— HeroBlocks : titre, texte, action, image ; jamais de carrousel ——— */
function HeroBlocks(props) {
  var variant = props.variant === 'card' ? 'card' : 'dark';
  var H = 'h' + (props.headingLevel || 1);
  var action = props.action || {
    label: 'Voir la collection',
    href: '/collection',
  };
  return (
    <section className={cx('av-sec', 'av-hero', 'av-hero--' + variant, props.className)}>
      <div className="av-hero__inner">
        <div className={cx('av-hero__text', variant === 'dark' && 'av-on-inverse')}>
          <H className="av-hero__title h2">{props.title}</H>
          {props.text && <p className="av-hero__lead body-large">{props.text}</p>}
          <Button
            type={variant === 'dark' ? 'white' : 'secondary'}
            href={action.href}
            onClick={action.onClick}
            fullWidth="mobile"
            className="av-hero__cta"
          >
            {action.label}
          </Button>
        </div>
        <div className="av-hero__media">
          <img src={props.image} alt={props.imageAlt || ''} />
        </div>
      </div>
    </section>
  );
}

export default HeroBlocks;

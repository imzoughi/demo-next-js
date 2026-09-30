/* Avion — boutique-demo · Features (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import FeatureCard from '../FeatureCard/FeatureCard.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Features : rangée de FeatureCard ——— */
const FEATURES = [
  {
    icon: 'truck',
    title: 'Livraison le lendemain',
    text: 'Commandez avant 15 h et recevez votre commande dès le lendemain.',
  },
  {
    icon: 'circle-check',
    title: 'Fabriqué par de vrais artisans',
    text: 'Des pièces faites à la main, avec passion et savoir-faire.',
  },
  {
    icon: 'credit-card',
    title: 'Des prix justes',
    text: 'La qualité de nos matières au meilleur prix, sans intermédiaire.',
  },
  {
    icon: 'sprout',
    title: 'Emballages recyclés',
    text: 'Nos emballages sont recyclés à 100 % pour limiter notre empreinte.',
  },
];
function Features(props) {
  var items = props.items || FEATURES;
  return (
    <section className={cx('av-sec', 'av-features', props.className)}>
      <div className="av-sec__inner">
        {props.title !== false && (
          <h2 className="av-sec__title av-sec__title--center h3">
            {props.title || 'Ce qui rend notre marque différente'}
          </h2>
        )}
        <div className="av-features__grid">
          {items.map(function (f) {
            return (
              <FeatureCard
                {...Object.assign(
                  {
                    key: f.title,
                    headingLevel: 3,
                    filled: props.filled,
                  },
                  f,
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;

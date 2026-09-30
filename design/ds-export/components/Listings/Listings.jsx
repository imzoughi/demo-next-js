/* Avion — boutique-demo · Listings (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Button from '../Button/Button.jsx';
import EmptyState from '../EmptyState/EmptyState.jsx';
import ProductCard from '../ProductCard/ProductCard.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Listings : grille de ProductCard + « Voir la collection » ——— */
function Listings(props) {
  var products = props.products || [];
  var n = props.count || products.length || 4;
  var body;
  if (props.loading)
    body = (
      <div className="av-listings__grid" aria-busy="true">
        <p className="av-visually-hidden" role="status">
          Chargement des produits
        </p>
        {Array.from({
          length: n,
        }).map(function (_, i) {
          return <ProductCard key={i} loading={true} />;
        })}
      </div>
    );
  else if (!products.length)
    body = (
      <EmptyState
        {...Object.assign(
          {
            kind: 'results',
            headingLevel: 3,
          },
          props.empty || {},
        )}
      />
    );
  else
    body = (
      <ul className="av-listings__grid">
        {products.map(function (p, i) {
          return (
            <li key={p.id || i}>
              <ProductCard {...p} />
            </li>
          );
        })}
      </ul>
    );
  return (
    <section
      className={cx('av-sec', 'av-listings', props.mobileColumns === 2 && 'av-listings--m2', props.className)}
    >
      <div className="av-sec__inner">
        {props.title && <h2 className="av-sec__title h3">{props.title}</h2>}
        {body}
        {props.action !== false && products.length > 0 && !props.loading && (
          <div className="av-listings__more">
            <Button
              type="secondary"
              href={(props.action && props.action.href) || '/collection'}
              onClick={props.action && props.action.onClick}
              fullWidth="mobile"
            >
              {(props.action && props.action.label) || 'Voir la collection'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Listings;

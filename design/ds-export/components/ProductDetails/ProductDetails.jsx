/* Avion — boutique-demo · ProductDetails (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb.jsx';
import Button from '../Button/Button.jsx';
import Stepper from '../Stepper/Stepper.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Prix en euros : « 250 € », « 1 250 € » ——— */
const EUR =
  window.Intl && Intl.NumberFormat
    ? new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })
    : null;
function formatPrice(n) {
  return EUR ? EUR.format(n) : n + ' €';
}
/* ——— ProductDetails : fiche produit en pile verticale ——— */
function ProductDetails(props) {
  var p = props.product || {};
  var q = React.useState(1),
    qty = q[0],
    setQty = q[1];
  var a = React.useState(false),
    adding = a[0],
    setAdding = a[1];
  var max = p.max === undefined ? 99 : p.max;
  function add() {
    if (!props.onAdd) return;
    setAdding(true);
    Promise.resolve(props.onAdd(qty)).then(
      function () {
        setAdding(false);
      },
      function () {
        setAdding(false);
      },
    );
  }
  return (
    <section className={cx('av-sec', 'av-pd', props.className)}>
      <div className="av-sec__inner av-pd__inner">
        <div className="av-pd__media">
          <img src={p.image} alt={p.imageAlt || p.name} />
        </div>
        <div className="av-pd__info">
          {props.breadcrumb && <Breadcrumb items={props.breadcrumb} />}
          <div className="av-pd__head">
            <h1 className="av-pd__title h1">{p.name}</h1>
            <p className="av-pd__price price">{formatPrice(p.price)}</p>
          </div>
          <div className="av-pd__block">
            <h2 className="h5">Description du produit</h2>
            <p className="body-medium">{p.description}</p>
          </div>
          {p.dimensions && (
            <div className="av-pd__block">
              <h2 className="h5">Dimensions</h2>
              <dl className="av-pd__dims">
                {p.dimensions.map(function (d) {
                  return (
                    <div key={d.label}>
                      <dt className="body-small">{d.label}</dt>
                      <dd className="body-medium">{d.value}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}
          <div className="av-pd__block">
            <h2 className="h5" id="av-pd-qty">
              Quantité
            </h2>
            <Stepper label={'Quantité, ' + p.name} min={1} max={max} value={qty} onChange={setQty} />
            {qty >= max && (
              <p className="av-pd__stock body-medium">
                {'Stock maximum atteint : ' +
                  max +
                  ' exemplaire' +
                  (max > 1 ? 's' : '') +
                  ' disponible' +
                  (max > 1 ? 's' : '') +
                  '.'}
              </p>
            )}
          </div>
          <div className="av-pd__actions">
            <Button onClick={add} loading={adding} loadingLabel="Ajout en cours" fullWidth="mobile">
              Ajouter au panier
            </Button>
            {props.onFavorite && (
              <Button type="ghost" onClick={props.onFavorite} fullWidth="mobile">
                Enregistrer dans mes favoris
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;

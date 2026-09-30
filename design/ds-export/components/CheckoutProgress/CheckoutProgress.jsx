/* Avion — boutique-demo · CheckoutProgress (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Icon from '../Icon/Icon.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— CheckoutProgress : étapes numérotées du tunnel ——— */
function CheckoutProgress(props) {
  var steps = props.steps || ['Livraison', 'Paiement', 'Confirmation'];
  var cur = props.current || 0;
  return (
    <nav className={cx('av-steps', props.className)} aria-label="Étapes de la commande">
      <p className="av-steps__mobile body-medium">{'Étape ' + (cur + 1) + ' sur ' + steps.length}</p>
      <ol className="av-steps__list">
        {steps.map(function (s, i) {
          var state = i < cur ? 'done' : i === cur ? 'current' : 'todo';
          var mark = (
            <span className="av-steps__mark body-medium" aria-hidden="true">
              {state === 'done' ? <Icon name="check" size="sm" strokeWidth={2} /> : i + 1}
            </span>
          );
          var label = (
            <span className="av-steps__label body-medium">
              {s}
              <span className="av-visually-hidden">
                {state === 'done' ? ' (terminée)' : state === 'todo' ? ' (à venir)' : ''}
              </span>
            </span>
          );
          return (
            <li
              key={s}
              className={cx('av-steps__item', 'is-' + state)}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              {state === 'done' && props.onStepClick ? (
                <button
                  type="button"
                  className="av-steps__btn"
                  onClick={function () {
                    props.onStepClick(i);
                  }}
                >
                  {mark}
                  {label}
                </button>
              ) : (
                <span className="av-steps__btn">
                  {mark}
                  {label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default CheckoutProgress;

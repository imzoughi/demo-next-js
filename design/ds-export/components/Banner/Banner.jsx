/* Avion — boutique-demo · Banner (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Icon from '../Icon/Icon.jsx';
import IconButton from '../IconButton/IconButton.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Drawer : couche générique, focus piégé, Échap, clic sur le voile, retour du focus ——— */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
/* ——— Banner : bandeau d'annonce fermable ——— */
function Banner(props) {
  var ref = React.useRef(null);
  var st = React.useState(false),
    gone = st[0],
    setGone = st[1];
  if (gone || props.open === false) return null;
  function dismiss() {
    var all = Array.prototype.slice.call(document.querySelectorAll(FOCUSABLE));
    var next = all.filter(function (x) {
      return ref.current && !ref.current.contains(x) && ref.current.compareDocumentPosition(x) & 4;
    })[0];
    if (props.open === undefined) setGone(true);
    if (props.onDismiss) props.onDismiss();
    if (next)
      setTimeout(function () {
        next.focus();
      }, 0);
  }
  return (
    <section ref={ref} className={cx('av-banner', 'av-on-inverse', props.className)} aria-label="Annonce">
      <p className="av-banner__msg body-medium">
        {props.icon !== false && <Icon name={props.icon || 'truck'} size="sm" />}
        <span>{props.children}</span>
      </p>
      {props.dismissible !== false && (
        <IconButton
          icon="x"
          label="Fermer l’annonce"
          tone="inverse"
          className="av-banner__close"
          onClick={dismiss}
        />
      )}
    </section>
  );
}

export default Banner;

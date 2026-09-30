/* Avion — boutique-demo · Drawer (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import ReactDOM from 'react-dom';
import IconButton from '../IconButton/IconButton.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Drawer : couche générique, focus piégé, Échap, clic sur le voile, retour du focus ——— */
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
function Drawer(props) {
  var side = ['right', 'bottom', 'left'].indexOf(props.side) >= 0 ? props.side : 'right';
  var st = React.useState(props.open ? 'open' : 'closed'),
    phase = st[0],
    setPhase = st[1];
  var panel = React.useRef(null),
    opener = React.useRef(null);
  var autoId = React.useId(),
    titleId = 'av-dr' + autoId.replace(/:/g, '');
  var close = React.useRef();
  close.current = props.onClose;
  React.useEffect(
    function () {
      if (props.open) {
        if (phase === 'closed') opener.current = document.activeElement;
        setPhase('open');
      } else if (phase !== 'closed') setPhase('closing');
    },
    [props.open],
  );
  React.useEffect(
    function () {
      if (phase !== 'open' || props.static) return;
      var prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      var target = props.initialFocus && props.initialFocus.current;
      (target || panel.current).focus({
        preventScroll: true,
      });
      /* Échap et Tab écoutés sur le document : le focus peut sortir du panneau (élément retiré du DOM). */
      function doc(e) {
        if (!panel.current) return;
        if (e.key === 'Escape') {
          onKey(e);
          return;
        }
        if (e.key === 'Tab' && !panel.current.contains(document.activeElement)) {
          e.preventDefault();
          panel.current.focus();
        }
      }
      function refocus(e) {
        if (panel.current && !panel.current.contains(e.target))
          panel.current.focus({
            preventScroll: true,
          });
      }
      document.addEventListener('keydown', doc);
      document.addEventListener('focusin', refocus);
      return function () {
        document.body.style.overflow = prev;
        document.removeEventListener('keydown', doc);
        document.removeEventListener('focusin', refocus);
      };
    },
    [phase],
  );
  function onKey(e) {
    if (e.key === 'Escape' && e.defaultPrevented) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      if (close.current) close.current();
      return;
    }
    if (e.key !== 'Tab') return;
    var f = Array.prototype.filter.call(panel.current.querySelectorAll(FOCUSABLE), function (x) {
      return x.getClientRects().length;
    });
    if (!f.length) {
      e.preventDefault();
      return;
    }
    var first = f[0],
      last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
  function ended(e) {
    if (e.target !== panel.current || phase !== 'closing') return;
    setPhase('closed');
    var o = opener.current;
    if (o && o.focus && document.contains(o)) o.focus();
    if (props.onClosed) props.onClosed();
  }
  if (phase === 'closed') return null;
  var node = (
    <div
      className={cx(
        'av-drawer',
        'av-drawer--' + side,
        props.fullScreenMobile !== false && 'av-drawer--full-mobile',
        props.static && 'av-drawer--static',
        phase === 'closing' && 'is-closing',
        props.className,
      )}
    >
      <div
        className="av-drawer__veil"
        onClick={function () {
          if (close.current) close.current();
        }}
        aria-hidden="true"
      />
      <div
        ref={panel}
        className="av-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-busy={props.busy ? 'true' : undefined}
        tabIndex={-1}
        onKeyDown={
          props.static
            ? undefined
            : function (e) {
                if (e.key === 'Tab') onKey(e);
              }
        }
        onAnimationEnd={ended}
      >
        <div className="av-drawer__head">
          <h2 id={titleId} className="av-drawer__title h4">
            {props.title}
          </h2>
          <IconButton
            icon="x"
            label={props.closeLabel || 'Fermer'}
            size="md"
            onClick={function () {
              if (close.current) close.current();
            }}
          />
        </div>
        <div className="av-drawer__body">{props.children}</div>
        {props.footer && <div className="av-drawer__foot">{props.footer}</div>}
      </div>
    </div>
  );
  return !props.static && ReactDOM && ReactDOM.createPortal
    ? ReactDOM.createPortal(node, document.body)
    : node;
}

export default Drawer;

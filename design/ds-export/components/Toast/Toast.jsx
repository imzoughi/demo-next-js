/* Avion — boutique-demo · Toast (design system ds-export 1.0.0).
 * Styles : bundle.css (classes av-*, tokens en variables CSS). Guide : README.md du même dossier. */
import React from 'react';
import Icon from '../Icon/Icon.jsx';

function cx() {
  return Array.prototype.filter.call(arguments, Boolean).join(' ');
}
/* ——— Toast : message bref, role="status", disparition auto après duration, en pause au survol et au focus ——— */
const TOAST_ICON = {
  success: 'check',
  error: 'circle-alert',
};
function Toast(props) {
  var tone = ['info', 'success', 'error'].indexOf(props.tone) >= 0 ? props.tone : 'info';
  var duration = props.duration === undefined ? tokenMs('--motion-duration-toast', 6000) : props.duration;
  var st = React.useState(props.open ? 'in' : 'off'),
    phase = st[0],
    setPhase = st[1];
  var paused = React.useRef(false),
    left = React.useRef(duration),
    start = React.useRef(0),
    timer = React.useRef(null);
  var onDismiss = React.useRef(props.onDismiss);
  onDismiss.current = props.onDismiss;
  function clear() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }
  function arm() {
    clear();
    if (!duration) return;
    start.current = Date.now();
    timer.current = setTimeout(function () {
      close();
    }, left.current);
  }
  function close() {
    clear();
    setPhase(function (p) {
      return p === 'off' ? 'off' : 'out';
    });
  }
  React.useEffect(
    function () {
      if (props.open) {
        left.current = duration;
        setPhase('in');
        if (!paused.current) arm();
      } else
        setPhase(function (p) {
          return p === 'off' ? 'off' : 'out';
        });
      return clear;
    },
    [props.open, props.message],
  );
  function pause() {
    if (paused.current) return;
    paused.current = true;
    if (timer.current) {
      left.current -= Date.now() - start.current;
      clear();
    }
  }
  function resume(e) {
    if (e && e.type === 'blur' && e.currentTarget.contains(e.relatedTarget)) return;
    paused.current = false;
    if (phase === 'in') arm();
  }
  function ended(e) {
    if (e.target !== e.currentTarget) return;
    if (phase === 'out') {
      setPhase('off');
      if (onDismiss.current) onDismiss.current();
    }
  }
  var visible = phase !== 'off';
  return (
    <div
      className={cx(
        'av-toast-region',
        props.position === 'static' && 'av-toast-region--static',
        props.className,
      )}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {visible && (
        <div
          className={cx('av-toast', 'av-toast--' + tone, 'body-medium', phase === 'out' && 'is-leaving')}
          onMouseEnter={pause}
          onMouseLeave={resume}
          onFocus={pause}
          onBlur={resume}
          onAnimationEnd={ended}
        >
          {TOAST_ICON[tone] && <Icon name={TOAST_ICON[tone]} size="md" />}
          <span className="av-toast__msg">{props.message}</span>
          {props.action && (
            <button
              type="button"
              className="av-toast__action body-medium"
              onClick={function () {
                if (props.action.onClick) props.action.onClick();
                close();
              }}
            >
              {props.action.label}
            </button>
          )}
          <button type="button" className="av-toast__close" aria-label="Fermer le message" onClick={close}>
            <Icon name="x" size="sm" />
          </button>
        </div>
      )}
    </div>
  );
}
function tokenMs(name, fallback) {
  try {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    var n = parseFloat(v);
    if (!isNaN(n)) return /ms$/.test(v) ? n : n * 1000;
  } catch (e) {}
  return fallback;
}

export default Toast;

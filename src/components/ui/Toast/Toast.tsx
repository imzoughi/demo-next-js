'use client';

import { useCallback, useEffect, useRef, useState, type AnimationEvent, type FocusEvent } from 'react';
import { cx } from '@/lib/cx';
import { Icon } from '../Icon/Icon';
import styles from './Toast.module.scss';

const TOAST_ICON = { success: 'check', error: 'circle-alert' } as const;

/** Durée par défaut : token motion-duration-toast lu dans les variables CSS (6 s si absent). */
function tokenMs(name: string, fallback: number): number {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const n = parseFloat(v);
  if (Number.isNaN(n)) return fallback;
  return v.endsWith('ms') ? n : n * 1000;
}

export interface ToastProps {
  open: boolean;
  tone?: 'info' | 'success' | 'error';
  message?: string;
  /** Action réversible (« Annuler ») : ferme le Toast. */
  action?: { label: string; onClick?: () => void };
  /** Délai en ms avant disparition ; 0 = reste affiché. */
  duration?: number;
  /** fixed : bas de page ; static : dans le flux (couches, documentation). */
  position?: 'fixed' | 'static';
  className?: string;
  /** Appelé après la disparition. */
  onDismiss?: () => void;
}

/** Message bref, role="status", disparition automatique en pause au survol et au focus. Une seule zone par page. */
export function Toast({ open, tone = 'info', message, action, duration, position = 'fixed', className, onDismiss }: ToastProps) {
  const [phase, setPhase] = useState<'off' | 'in' | 'out'>(open ? 'in' : 'off');
  const [prev, setPrev] = useState({ open, message });
  const paused = useRef(false);
  const left = useRef(0);
  const started = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismiss = useRef(onDismiss);
  useEffect(() => {
    dismiss.current = onDismiss;
  });

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const close = useCallback(() => {
    clear();
    setPhase((p) => (p === 'off' ? 'off' : 'out'));
  }, [clear]);
  const arm = useCallback(() => {
    clear();
    if (!left.current) return;
    started.current = Date.now();
    timer.current = setTimeout(close, left.current);
  }, [clear, close]);

  // Ouverture, fermeture ou nouveau message : la phase se recalcule pendant le rendu.
  if (open !== prev.open || message !== prev.message) {
    setPrev({ open, message });
    if (open) setPhase('in');
    else setPhase((p) => (p === 'off' ? 'off' : 'out'));
  }

  useEffect(() => {
    if (!open) return;
    left.current = duration ?? tokenMs('--motion-duration-toast', 6000);
    if (!paused.current) arm();
    return clear;
  }, [open, message, duration, arm, clear]);

  function pause() {
    if (paused.current) return;
    paused.current = true;
    if (timer.current) {
      left.current -= Date.now() - started.current;
      clear();
    }
  }
  function resume(e?: FocusEvent<HTMLDivElement>) {
    if (e?.type === 'blur' && e.currentTarget.contains(e.relatedTarget as Node | null)) return;
    paused.current = false;
    if (phase === 'in') arm();
  }
  function ended(e: AnimationEvent<HTMLDivElement>) {
    if (e.target !== e.currentTarget) return;
    if (phase === 'out') {
      setPhase('off');
      dismiss.current?.();
    }
  }

  return (
    <div
      className={cx(styles.region, position === 'static' && styles.regionStatic, className)}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {phase !== 'off' ? (
        <div
          className={cx(
            styles.root,
            tone !== 'info' && styles[tone],
            'body-medium',
            phase === 'out' && styles.isLeaving,
          )}
          onMouseEnter={pause}
          onMouseLeave={() => resume()}
          onFocus={pause}
          onBlur={resume}
          onAnimationEnd={ended}
        >
          {tone !== 'info' ? <Icon name={TOAST_ICON[tone]} size="md" /> : null}
          <span className={styles.msg}>{message}</span>
          {action ? (
            <button
              type="button"
              className={cx(styles.action, 'body-medium')}
              onClick={() => {
                action.onClick?.();
                close();
              }}
            >
              {action.label}
            </button>
          ) : null}
          <button type="button" className={styles.close} aria-label="Fermer le message" onClick={close}>
            <Icon name="x" size="sm" />
          </button>
        </div>
      ) : null}
    </div>
  );
}

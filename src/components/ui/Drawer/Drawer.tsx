'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type AnimationEvent, type KeyboardEvent, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/lib/cx';
import { useSafeId } from '@/lib/useSafeId';
import { IconButton } from '../IconButton/IconButton';
import styles from './Drawer.module.scss';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const subscribeNoop = () => () => {};

export interface DrawerProps {
  open: boolean;
  /** right (défaut), left, bottom, ou sheet : depuis le bas en mobile, à droite dès 768 px. */
  side?: 'right' | 'left' | 'bottom' | 'sheet';
  title: string;
  closeLabel?: string;
  /** Plein écran sous 768 px (true par défaut). */
  fullScreenMobile?: boolean;
  /** Rendu dans son conteneur (documentation), sans piège de focus ni blocage du défilement. */
  static?: boolean;
  busy?: boolean;
  footer?: ReactNode;
  /** Élément qui reçoit le focus à l'ouverture (le panneau par défaut). */
  initialFocus?: RefObject<HTMLElement | null>;
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
  /** Appelé quand la fermeture est terminée. */
  onClosed?: () => void;
}

/** Couche générique : voile, titre, croix, focus piégé, Échap, clic sur le voile, retour du focus au déclencheur. */
export function Drawer({
  open,
  side = 'right',
  title,
  closeLabel = 'Fermer',
  fullScreenMobile = true,
  static: isStatic,
  busy,
  footer,
  initialFocus,
  className,
  children,
  onClose,
  onClosed,
}: DrawerProps) {
  const [phase, setPhase] = useState<'closed' | 'open' | 'closing'>(open ? 'open' : 'closed');
  const [prevOpen, setPrevOpen] = useState(open);
  // Côté client seulement : le portail a besoin de document.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const panel = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const titleId = useSafeId('dr');
  const close = useRef(onClose);
  useEffect(() => {
    close.current = onClose;
  });

  // Transition pilotée par la prop `open`, calculée pendant le rendu (pas dans un effet).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) setPhase('open');
    else if (phase !== 'closed') setPhase('closing');
  }

  useEffect(() => {
    if (phase !== 'open' || isStatic) return;
    opener.current ??= document.activeElement;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    (initialFocus?.current ?? panel.current)?.focus({ preventScroll: true });
    // Échap et Tab écoutés sur le document : le focus peut sortir du panneau (élément retiré du DOM).
    function onDocKey(e: globalThis.KeyboardEvent) {
      if (!panel.current) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        close.current?.();
        return;
      }
      if (e.key === 'Tab' && !panel.current.contains(document.activeElement)) {
        e.preventDefault();
        panel.current.focus();
      }
    }
    function refocus(e: FocusEvent) {
      if (panel.current && !panel.current.contains(e.target as Node)) panel.current.focus({ preventScroll: true });
    }
    document.addEventListener('keydown', onDocKey);
    document.addEventListener('focusin', refocus);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onDocKey);
      document.removeEventListener('focusin', refocus);
    };
  }, [phase, isStatic, initialFocus]);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'Tab' || !panel.current) return;
    const focusable = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((x) => x.getClientRects().length);
    if (!focusable.length) {
      e.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function ended(e: AnimationEvent<HTMLDivElement>) {
    if (e.target !== panel.current || phase !== 'closing') return;
    setPhase('closed');
    const o = opener.current as HTMLElement | null;
    opener.current = null;
    if (o?.focus && document.contains(o)) o.focus();
    onClosed?.();
  }

  if (phase === 'closed') return null;
  if (!isStatic && !mounted) return null;

  const node = (
    <div
      className={cx(
        styles.root,
        side === 'left' && styles.left,
        (side === 'bottom' || side === 'sheet') && styles.bottom,
        side === 'sheet' && styles.sheet,
        fullScreenMobile && styles.fullMobile,
        isStatic && styles.static,
        phase === 'closing' && styles.isClosing,
        className,
      )}
    >
      <div className={styles.veil} onClick={() => close.current?.()} aria-hidden="true" />
      <div
        ref={panel}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-busy={busy ? true : undefined}
        tabIndex={-1}
        onKeyDown={isStatic ? undefined : onKeyDown}
        onAnimationEnd={ended}
      >
        <div className={styles.head}>
          <h2 id={titleId} className={cx(styles.title, 'h4')}>
            {title}
          </h2>
          <IconButton icon="x" label={closeLabel} size="md" onClick={() => close.current?.()} />
        </div>
        <div className={styles.body}>{children}</div>
        {footer ? <div className={styles.foot}>{footer}</div> : null}
      </div>
    </div>
  );
  return isStatic ? node : createPortal(node, document.body);
}

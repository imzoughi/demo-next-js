'use client';

import { useRef, useState, type ReactNode } from 'react';
import { cx } from '@/lib/cx';
import { Icon, type IconName } from '../../ui/Icon/Icon';
import { IconButton } from '../../ui/IconButton/IconButton';
import styles from './Banner.module.scss';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export interface BannerProps {
  children: ReactNode;
  /** Icône Lucide ; false pour aucune (truck par défaut). */
  icon?: IconName | false;
  dismissible?: boolean;
  /** Contrôlé : false masque le bandeau. Absent, le bandeau se ferme seul. */
  open?: boolean;
  className?: string;
  onDismiss?: () => void;
}

/** Bandeau d'annonce fermable, au-dessus de l'en-tête. À la fermeture, le focus passe à l'élément suivant. */
export function Banner({ children, icon = 'truck', dismissible = true, open, className, onDismiss }: BannerProps) {
  const ref = useRef<HTMLElement>(null);
  const [gone, setGone] = useState(false);
  if (gone || open === false) return null;

  function dismiss() {
    const node = ref.current;
    const next = Array.from(document.querySelectorAll<HTMLElement>(FOCUSABLE)).find(
      (x) => node && !node.contains(x) && node.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING,
    );
    if (open === undefined) setGone(true);
    onDismiss?.();
    if (next) setTimeout(() => next.focus(), 0);
  }

  return (
    <section ref={ref} className={cx(styles.root, 'av-on-inverse', className)} aria-label="Annonce">
      <p className={cx(styles.msg, 'body-medium')}>
        {icon ? <Icon name={icon} size="sm" /> : null}
        <span>{children}</span>
      </p>
      {dismissible ? <IconButton icon="x" label="Fermer l’annonce" tone="inverse" className={styles.close} onClick={dismiss} /> : null}
    </section>
  );
}

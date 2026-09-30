import { cx } from '@/lib/cx';
import styles from './Badge.module.scss';

export interface BadgeProps {
  count: number;
  /** inverse : sur color-surface-inverse. */
  tone?: 'default' | 'inverse';
  className?: string;
}

/** Pastille de quantité posée sur l'icône panier : masquée à 0, « 99+ » au-delà. Le nombre est porté par le nom du bouton (cartLabel). */
export function Badge({ count, tone = 'default', className }: BadgeProps) {
  const n = Math.max(0, Math.floor(count || 0));
  if (!n) return null;
  const text = n > 99 ? '99+' : String(n);
  return (
    <span className={cx(styles.root, 'body-small', tone === 'inverse' && styles.inverse, className)} aria-hidden="true">
      <span key={text} className={styles.value}>
        {text}
      </span>
    </span>
  );
}

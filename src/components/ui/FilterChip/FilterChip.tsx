'use client';

import { useState, type AnimationEvent } from 'react';
import { cx } from '@/lib/cx';
import { Icon } from '../Icon/Icon';
import styles from './FilterChip.module.scss';

export interface FilterChipProps {
  label: string;
  disabled?: boolean;
  className?: string;
  /** Appelé à la fin de l'animation de retrait. */
  onRemove?: () => void;
}

/** Puce de filtre actif, retirable au clavier et au toucher (zone 44 px). */
export function FilterChip({ label, disabled, className, onRemove }: FilterChipProps) {
  const [leaving, setLeaving] = useState(false);
  function ended(e: AnimationEvent<HTMLButtonElement>) {
    if (e.target === e.currentTarget && leaving) onRemove?.();
  }
  return (
    <button
      type="button"
      className={cx(styles.root, 'body-medium', leaving && styles.isLeaving, className)}
      aria-label={`Retirer le filtre ${label}`}
      disabled={disabled}
      onClick={() => setLeaving(true)}
      onAnimationEnd={ended}
    >
      <span>{label}</span>
      <Icon name="x" size="sm" />
    </button>
  );
}

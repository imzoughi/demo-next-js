'use client';

import { useState } from 'react';
import { cx } from '@/lib/cx';
import { Icon } from '../Icon/Icon';
import styles from './Stepper.module.scss';

export interface StepperProps {
  min?: number;
  /** Stock maximum. */
  max?: number;
  /** Valeur contrôlée. */
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  /** Nom accessible du groupe (« Quantité, Fauteuil Dandy »). */
  label?: string;
  /** Complément des libellés des boutons (« Diminuer la quantité de Fauteuil Dandy »). */
  subject?: string;
  className?: string;
  onChange?: (value: number) => void;
}

/** Quantité entre min et max : boutons moins et plus de 44 x 44 px, valeur annoncée aux lecteurs d'écran. */
export function Stepper({ min = 1, max = 99, value, defaultValue, disabled = false, label = 'Quantité', subject, className, onChange }: StepperProps) {
  const [inner, setInner] = useState(defaultValue ?? min);
  const current = value ?? inner;
  const atMin = current <= min;
  const atMax = current >= max;

  function set(next: number) {
    const v = Math.max(min, Math.min(max, next));
    if (v === current) return;
    if (value === undefined) setInner(v);
    onChange?.(v);
  }

  function button(dir: -1 | 1) {
    const off = disabled || (dir < 0 ? atMin : atMax);
    return (
      <button
        type="button"
        className={styles.btn}
        aria-disabled={off ? true : undefined}
        aria-label={`${dir < 0 ? 'Diminuer' : 'Augmenter'} la quantité${subject ? ` de ${subject}` : ''}`}
        disabled={disabled ? true : undefined}
        onClick={() => {
          if (!off) set(current + dir);
        }}
      >
        <Icon name={dir < 0 ? 'minus' : 'plus'} size="sm" strokeWidth={2} />
      </button>
    );
  }

  return (
    <div className={cx(styles.root, disabled && styles.isDisabled, className)} role="group" aria-label={label}>
      {button(-1)}
      <output className={cx(styles.value, 'body-medium')} aria-hidden="true">
        {current}
      </output>
      {button(1)}
      <span className="av-visually-hidden" aria-live="polite">
        {`${label} : ${current}${atMax && !disabled ? ', stock maximum atteint' : ''}`}
      </span>
    </div>
  );
}

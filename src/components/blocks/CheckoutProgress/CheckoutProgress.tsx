'use client';

import { cx } from '@/lib/cx';
import { Icon } from '../../ui/Icon/Icon';
import styles from './CheckoutProgress.module.scss';

export interface CheckoutProgressProps {
  steps?: string[];
  /** Index de l'étape courante (0 = première). */
  current?: number;
  className?: string;
  /** Rend les étapes terminées cliquables (retour en arrière). */
  onStepClick?: (index: number) => void;
}

/** Étapes numérotées du tunnel : Livraison, Paiement, Confirmation. */
export function CheckoutProgress({ steps = ['Livraison', 'Paiement', 'Confirmation'], current = 0, className, onStepClick }: CheckoutProgressProps) {
  return (
    <nav className={cx(styles.root, className)} aria-label="Étapes de la commande">
      <p className={cx(styles.mobile, 'body-medium')}>{`Étape ${current + 1} sur ${steps.length}`}</p>
      <ol className={styles.list}>
        {steps.map((s, i) => {
          const state = i < current ? 'done' : i === current ? 'current' : 'todo';
          const stateCls = state === 'done' ? styles.isDone : state === 'current' ? styles.isCurrent : styles.isTodo;
          const inner = (
            <>
              <span className={cx(styles.mark, 'body-medium')} aria-hidden="true">
                {state === 'done' ? <Icon name="check" size="sm" strokeWidth={2} /> : i + 1}
              </span>
              <span className={cx(styles.label, 'body-medium')}>
                {s}
                <span className="av-visually-hidden">{state === 'done' ? ' (terminée)' : state === 'todo' ? ' (à venir)' : ''}</span>
              </span>
            </>
          );
          return (
            <li key={s} className={cx(styles.item, stateCls)} aria-current={state === 'current' ? 'step' : undefined}>
              {state === 'done' && onStepClick ? (
                <button type="button" className={styles.btn} onClick={() => onStepClick(i)}>
                  {inner}
                </button>
              ) : (
                <span className={styles.btn}>{inner}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

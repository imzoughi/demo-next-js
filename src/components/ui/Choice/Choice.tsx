import type { ChangeEvent } from 'react';
import { cx } from '@/lib/cx';
import { useSafeId } from '@/lib/useSafeId';
import { FieldMessage } from '../TextInput/FieldMessage';
import { Icon } from '../Icon/Icon';
import styles from './Choice.module.scss';

export interface ChoiceProps {
  label: string;
  /** Texte d'aide sous le libellé. */
  hint?: string;
  /** Compteur de résultats (filtres). */
  count?: number;
  error?: string;
  id?: string;
  name?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/** Gabarit commun de Checkbox et Radio (composant interne) : toute la ligne est cliquable, hauteur >= 44 px. */
export function Choice({
  kind,
  label,
  hint,
  count,
  error,
  id: idProp,
  className,
  ...rest
}: ChoiceProps & { kind: 'checkbox' | 'radio' }) {
  const autoId = useSafeId(kind);
  const id = idProp ?? autoId;
  const hintId = hint ? `${id}-aide` : undefined;
  const errId = error ? `${id}-err` : undefined;
  return (
    <div
      className={cx(
        styles.root,
        kind === 'radio' && styles.radio,
        error && styles.isError,
        rest.disabled && styles.isDisabled,
        className,
      )}
    >
      <label htmlFor={id} className={cx(styles.row, 'body-medium')}>
        <input
          {...rest}
          id={id}
          type={kind}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errId].filter(Boolean).join(' ') || undefined}
        />
        <span className={styles.box} aria-hidden="true">
          {kind === 'checkbox' ? <Icon name="check" size="sm" strokeWidth={2.5} /> : null}
        </span>
        <span className={styles.text}>
          <span>{label}</span>
          {hint ? (
            <span id={hintId} className={cx(styles.hint, 'body-medium')}>
              {hint}
            </span>
          ) : null}
        </span>
        {count !== undefined ? (
          <span className={styles.count}>
            <span className="av-visually-hidden">, </span>
            {count}
            <span className="av-visually-hidden"> produits</span>
          </span>
        ) : null}
      </label>
      <FieldMessage id={errId} text={error} tone="error" />
    </div>
  );
}

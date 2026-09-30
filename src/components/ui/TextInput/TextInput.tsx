import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { cx } from '@/lib/cx';
import { useSafeId } from '@/lib/useSafeId';
import { FieldMessage } from './FieldMessage';
import styles from './TextInput.module.scss';

/** Claviers et attributs mobiles selon le type de saisie. */
const KEYBOARDS = {
  text: { type: 'text' },
  email: { type: 'email', inputMode: 'email', autoCapitalize: 'off', spellCheck: false },
  tel: { type: 'tel', inputMode: 'tel' },
  numeric: { type: 'text', inputMode: 'numeric', pattern: '[0-9 ]*' },
  password: { type: 'password' },
} as const satisfies Record<string, InputHTMLAttributes<HTMLInputElement>>;

export interface TextInputProps {
  label: string;
  /** primary, ou opaque sur color-surface-inverse. */
  variant?: 'primary' | 'opaque';
  type?: keyof typeof KEYBOARDS;
  /** Label masqué visuellement mais lu par les lecteurs d'écran. */
  hideLabel?: boolean;
  /** Champ facultatif : ajoute « (facultatif) » au label. */
  optional?: boolean;
  hint?: string;
  error?: string;
  success?: string;
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

/** Champ texte : label visible, aide, message d'erreur ou de succès reliés par aria-describedby. */
export function TextInput({
  label,
  variant = 'primary',
  type = 'text',
  hideLabel,
  optional,
  hint,
  error,
  success,
  id: idProp,
  className,
  required,
  ...rest
}: TextInputProps) {
  const autoId = useSafeId('in');
  const id = idProp ?? autoId;
  const hintId = hint ? `${id}-aide` : undefined;
  const msgId = error || success ? `${id}-msg` : undefined;
  const describedBy = [hintId, msgId].filter(Boolean).join(' ') || undefined;
  const opaque = variant === 'opaque';
  return (
    <div
      className={cx(
        styles.root,
        opaque && styles.opaque,
        error && styles.isError,
        success && !error && styles.isSuccess,
        rest.disabled && styles.isDisabled,
        className,
      )}
    >
      <label htmlFor={id} className={cx(styles.label, 'body-medium', hideLabel && 'av-visually-hidden')}>
        {label}
        {optional ? <span className={styles.optional}> (facultatif)</span> : null}
      </label>
      <input
        {...KEYBOARDS[type]}
        {...rest}
        id={id}
        className={cx(styles.input, 'body-medium')}
        required={optional ? undefined : required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      <FieldMessage id={hintId} text={hint} tone="hint" className={styles.msg} />
      <div aria-live="polite">
        <FieldMessage
          key={error ? 'e' : 's'}
          id={msgId}
          text={error || success}
          tone={error ? 'error' : 'success'}
          className={cx(styles.msg, error ? styles.msgError : styles.msgSuccess)}
        />
      </div>
    </div>
  );
}

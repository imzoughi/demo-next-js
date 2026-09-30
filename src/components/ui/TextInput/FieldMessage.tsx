import { cx } from '@/lib/cx';
import { Icon } from '../Icon/Icon';
import styles from './FieldMessage.module.scss';

export interface FieldMessageProps {
  id?: string;
  text?: string;
  /** hint : aide (body-small) ; error et success : body-medium avec icône, jamais la couleur seule. */
  tone?: 'hint' | 'error' | 'success';
  className?: string;
}

/** Message sous un champ : aide, erreur ou succès (composant interne de TextInput, Checkbox et Radio). */
export function FieldMessage({ id, text, tone = 'hint', className }: FieldMessageProps) {
  if (!text) return null;
  return (
    <p
      id={id}
      className={cx(
        styles.root,
        tone === 'hint' ? 'body-small' : 'body-medium',
        tone === 'error' && styles.error,
        tone === 'success' && styles.success,
        className,
      )}
    >
      {tone === 'error' ? <Icon name="circle-alert" size="sm" /> : null}
      {tone === 'success' ? <Icon name="check" size="sm" /> : null}
      <span>{text}</span>
    </p>
  );
}

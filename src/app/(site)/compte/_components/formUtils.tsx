// Briques communes aux formulaires de l'espace client : erreurs par champ, focus sur la première erreur, résumé.
import { Icon } from '@/components/ui/Icon/Icon';
import { cx } from '@/lib/cx';
import styles from './compte.module.scss';

export const PHONE_RE = /^(?:0\d{9}|\+33\d{9})$/;
export const REQUIRED = 'Ce champ est obligatoire';
export const PHONE_ERROR = 'Numéro invalide : dix chiffres, par exemple 06 12 34 56 78';

export type Errors = Record<string, string>;

/** Donne le focus au premier champ en erreur (dans l'ordre de `names`) ; renvoie true s'il y en a un. */
export function focusFirst(form: HTMLFormElement | null, names: string[], errors: Errors) {
  const first = names.find((n) => errors[n]);
  if (first) setTimeout(() => form?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus(), 0);
  return Boolean(first);
}

export function without(errors: Errors, name: string): Errors {
  const next = { ...errors };
  delete next[name];
  return next;
}

export function Summary({ errors }: { errors: Errors }) {
  const n = Object.keys(errors).length;
  if (n < 2) return null;
  return (
    <div className={cx(styles.alert, 'body-medium')} role="alert">
      <Icon name="circle-alert" size="md" />
      <span>{`${n} champs sont à corriger.`}</span>
    </div>
  );
}


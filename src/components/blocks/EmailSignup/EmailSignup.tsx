'use client';

import { useState, type FormEvent } from 'react';
import { cx } from '@/lib/cx';
import { Button } from '../../ui/Button/Button';
import { Icon } from '../../ui/Icon/Icon';
import { TextInput } from '../../ui/TextInput/TextInput';
import styles from './EmailSignup.module.scss';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export interface EmailSignupProps {
  /** light : fond clair ; dark : sur color-surface-inverse (pied de page). */
  tone?: 'light' | 'dark';
  /** Sans encart : titre, champ et bouton seulement (colonne du pied de page). */
  compact?: boolean;
  title?: string;
  text?: string;
  benefits?: string[];
  errorText?: string;
  successText?: string;
  headingLevel?: 2 | 3;
  className?: string;
  /** Promesse résolue = inscrit ; rejetée = échec. Sans elle, l'inscription réussit tout de suite. */
  onSubscribe?: (email: string) => Promise<unknown> | void;
}

/** Inscription à la lettre d'information : champ (label masqué visuellement) + bouton, avec erreur, chargement et succès. */
export function EmailSignup({
  tone = 'light',
  compact,
  title = 'Rejoignez notre lettre d’information',
  text = 'Offres exclusives, nouvelles collections, ventes privées et plus encore.',
  benefits,
  errorText = 'Adresse e-mail invalide',
  successText = 'Merci, vous êtes inscrit',
  headingLevel = 2,
  className,
  onSubscribe,
}: EmailSignupProps) {
  const dark = tone === 'dark';
  const [value, setValue] = useState('');
  const [state, setState] = useState<'idle' | 'error' | 'loading' | 'success' | 'failed'>('idle');
  const H = `h${headingLevel}` as 'h2' | 'h3';

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(value.trim())) {
      setState('error');
      return;
    }
    if (!onSubscribe) {
      setState('success');
      return;
    }
    setState('loading');
    try {
      await onSubscribe(value.trim());
      setState('success');
    } catch {
      setState('failed');
    }
  }

  const error = state === 'error' ? errorText : state === 'failed' ? 'L’inscription n’a pas abouti. Réessayez.' : undefined;

  return (
    <section className={cx(styles.root, dark && styles.dark, dark && 'av-on-inverse', compact && styles.compact, className)}>
      <div className={styles.inner}>
        <H className={compact ? 'h5' : 'h3'}>{title}</H>
        {!compact ? <p className={cx(styles.text, 'body-medium')}>{text}</p> : null}
        {benefits ? (
          <ul className={styles.benefits}>
            {benefits.map((b) => (
              <li key={b} className="body-medium">
                <Icon name="circle-check" size="md" />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
        <form className={styles.form} noValidate onSubmit={submit}>
          <TextInput
            className={styles.field}
            variant={dark ? 'opaque' : 'primary'}
            label="Adresse e-mail"
            hideLabel
            type="email"
            autoComplete="email"
            placeholder="vous@exemple.fr"
            value={value}
            disabled={state === 'success'}
            onChange={(e) => {
              setValue(e.target.value);
              if (state === 'error' || state === 'failed') setState('idle');
            }}
            error={error}
            success={state === 'success' ? successText : undefined}
          />
          <Button
            type={dark ? 'white' : 'primary'}
            htmlType="submit"
            loading={state === 'loading'}
            loadingLabel="Inscription"
            disabled={state === 'success'}
            className={styles.btn}
          >
            S’inscrire
          </Button>
        </form>
      </div>
    </section>
  );
}

'use client';

import { useRef, useState, type FormEvent } from 'react';
import { cx } from '@/lib/cx';
import { Button } from '../../ui/Button/Button';
import { Checkbox } from '../../ui/Checkbox/Checkbox';
import { Icon } from '../../ui/Icon/Icon';
import { TextInput } from '../../ui/TextInput/TextInput';
import { TextLink } from '../../ui/TextLink/TextLink';
import styles from './AuthForm.module.scss';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Mode = 'login' | 'register';
type FieldType = 'text' | 'email' | 'password';
type Field = readonly [name: string, label: string, type: FieldType, autoComplete: string];

const LOGIN_FIELDS: Field[] = [
  ['email', 'Adresse e-mail', 'email', 'email'],
  ['password', 'Mot de passe', 'password', 'current-password'],
];
const REGISTER_FIELDS: Field[] = [
  ['firstName', 'Prénom', 'text', 'given-name'],
  ['lastName', 'Nom', 'text', 'family-name'],
  ['email', 'Adresse e-mail', 'email', 'email'],
  ['password', 'Mot de passe', 'password', 'new-password'],
];

type Values = Record<string, string | boolean>;

export interface AuthFormProps {
  mode?: Mode;
  forgotHref?: string;
  className?: string;
  /** Rejette avec une Error pour afficher son message en haut du formulaire. */
  onSubmit?: (mode: Mode, values: Values) => Promise<unknown> | void;
  onForgot?: () => void;
}

/** Connexion et création de compte : validation à l'envoi, résumé d'erreurs, focus sur le premier champ en erreur. */
export function AuthForm({ mode: initial = 'login', forgotHref = '#', className, onSubmit, onForgot }: AuthFormProps) {
  const [mode, setMode] = useState<Mode>(initial);
  const [vals, setVals] = useState<Values>({});
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fields = mode === 'login' ? LOGIN_FIELDS : REGISTER_FIELDS;
  const text = (k: string) => (typeof vals[k] === 'string' ? (vals[k] as string) : '');

  function set(k: string, v: string | boolean) {
    setVals((p) => ({ ...p, [k]: v }));
    if (errs[k]) {
      setErrs((p) => {
        const next = { ...p };
        delete next[k];
        return next;
      });
    }
  }

  function validate() {
    const r: Record<string, string> = {};
    for (const [name] of fields) if (!text(name).trim()) r[name] = 'Ce champ est obligatoire';
    if (!r.email && text('email') && !EMAIL_RE.test(text('email').trim())) r.email = 'Adresse e-mail invalide';
    if (mode === 'register' && !r.password && text('password').length < 8) r.password = 'Au moins 8 caractères';
    return r;
  }

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    setGlobalError(null);
    const r = validate();
    setErrs(r);
    const first = fields.map(([n]) => n).find((k) => r[k]);
    if (first) {
      setTimeout(() => formRef.current?.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus(), 0);
      return;
    }
    if (!onSubmit) return;
    setLoading(true);
    try {
      await onSubmit(mode, vals);
    } catch (err) {
      setGlobalError(
        (err instanceof Error && err.message) ||
          (mode === 'login' ? 'Adresse e-mail ou mot de passe incorrect.' : 'La création du compte n’a pas abouti. Réessayez.'),
      );
    } finally {
      setLoading(false);
    }
  }

  const nErr = Object.keys(errs).length;

  function tab(k: Mode, label: string) {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={mode === k}
        className={cx(styles.tab, 'body-medium', mode === k && styles.isActive)}
        onClick={() => {
          setMode(k);
          setErrs({});
          setGlobalError(null);
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <section className={cx(styles.root, className)} aria-label="Mon compte">
      <div className={styles.tabs} role="tablist" aria-label="Connexion ou création de compte">
        {tab('login', 'Connexion')}
        {tab('register', 'Créer un compte')}
      </div>
      <form ref={formRef} className={styles.form} noValidate onSubmit={submit} role="tabpanel">
        <h2 className="h3">{mode === 'login' ? 'Connectez-vous' : 'Créez votre compte'}</h2>
        {globalError || nErr > 1 ? (
          <div className={cx(styles.alert, 'body-medium')} role="alert">
            <Icon name="circle-alert" size="md" />
            <span>{globalError || `${nErr} champs sont à corriger.`}</span>
          </div>
        ) : null}
        <div className={styles.fields}>
          {fields.map(([name, label, type, autoComplete]) => (
            <TextInput
              key={mode + name}
              name={name}
              label={label}
              type={type}
              autoComplete={autoComplete}
              value={text(name)}
              onChange={(e) => set(name, e.target.value)}
              error={errs[name]}
              hint={mode === 'register' && name === 'password' ? '8 caractères minimum.' : undefined}
              className={mode === 'register' && (name === 'firstName' || name === 'lastName') ? styles.half : undefined}
            />
          ))}
        </div>
        {mode === 'login' ? (
          <div className={styles.row}>
            <Checkbox label="Se souvenir de moi" checked={!!vals.remember} onChange={(e) => set('remember', e.target.checked)} />
            <TextLink tone="brand" href={forgotHref} onClick={onForgot}>
              Mot de passe oublié
            </TextLink>
          </div>
        ) : (
          <Checkbox
            label="Recevoir la lettre d’information"
            hint="Facultatif. Désinscription en un clic."
            checked={!!vals.newsletter}
            onChange={(e) => set('newsletter', e.target.checked)}
          />
        )}
        <Button htmlType="submit" loading={loading} loadingLabel={mode === 'login' ? 'Connexion' : 'Création du compte'} fullWidth>
          {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
        </Button>
      </form>
    </section>
  );
}

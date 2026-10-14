'use client';

// Informations personnelles, adresses et mot de passe : trois formulaires indépendants. Démo : rien n'est envoyé,
// les valeurs sont gardées en session. Validation à l'envoi, résumé d'erreurs, focus sur le premier champ en erreur,
// message de succès annoncé par le Toast (role="status").
import { useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import { Toast } from '@/components/ui/Toast/Toast';
import { cx } from '@/lib/cx';
import { AddressesForm } from './AddressesForm';
import { useAccount } from './AccountProvider';
import { PHONE_ERROR, PHONE_RE, REQUIRED, Summary, focusFirst, without, type Errors } from './formUtils';
import { PageTitle } from './PageTitle';
import styles from './compte.module.scss';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;


const PROFILE_FIELDS = [
  ['firstName', 'Prénom', 'text', 'given-name'],
  ['lastName', 'Nom', 'text', 'family-name'],
  ['email', 'Adresse e-mail', 'email', 'email'],
  ['phone', 'Téléphone', 'tel', 'tel'],
] as const;

const PASSWORD_FIELDS = [
  ['current', 'Mot de passe actuel', 'current-password'],
  ['next', 'Nouveau mot de passe', 'new-password'],
  ['confirm', 'Confirmation du nouveau mot de passe', 'new-password'],
] as const;

const RULES: [label: string, test: (v: string) => boolean][] = [
  ['Au moins 8 caractères', (v) => v.length >= 8],
  ['Une majuscule', (v) => /[A-ZÀ-Ý]/.test(v)],
  ['Un chiffre', (v) => /\d/.test(v)],
];

export function InformationsForms() {
  const { profile, updateProfile } = useAccount();
  const [toast, setToast] = useState({ open: false, message: '' });

  // Coordonnées
  const [values, setValues] = useState({ firstName: profile.firstName, lastName: profile.lastName, email: profile.email, phone: profile.phone });
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const profileRef = useRef<HTMLFormElement>(null);

  // Mot de passe
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [pwdErrors, setPwdErrors] = useState<Errors>({});
  const [pwdSaving, setPwdSaving] = useState(false);
  const pwdRef = useRef<HTMLFormElement>(null);

  function setField(name: keyof typeof values, v: string) {
    setValues((p) => ({ ...p, [name]: v }));
    if (errors[name]) setErrors((p) => without(p, name));
  }

  async function submitProfile(ev: FormEvent) {
    ev.preventDefault();
    const r: Errors = {};
    for (const [name] of PROFILE_FIELDS) if (!values[name].trim()) r[name] = REQUIRED;
    if (!r.email && !EMAIL_RE.test(values.email.trim())) r.email = 'Adresse e-mail invalide';
    if (!r.phone && !PHONE_RE.test(values.phone.replace(/[\s.-]/g, ''))) r.phone = PHONE_ERROR;
    setErrors(r);
    if (focusFirst(profileRef.current, PROFILE_FIELDS.map(([n]) => n), r)) return;
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateProfile({ firstName: values.firstName.trim(), lastName: values.lastName.trim(), email: values.email.trim(), phone: values.phone.trim() });
    setSaving(false);
    setToast({ open: true, message: 'Vos informations ont été enregistrées.' });
  }

  function setPwdField(name: keyof typeof pwd, v: string) {
    setPwd((p) => ({ ...p, [name]: v }));
    if (pwdErrors[name]) setPwdErrors((p) => without(p, name));
  }

  async function submitPassword(ev: FormEvent) {
    ev.preventDefault();
    const r: Errors = {};
    if (!pwd.current) r.current = REQUIRED;
    if (!pwd.next) r.next = REQUIRED;
    else if (RULES.some(([, test]) => !test(pwd.next))) r.next = 'Le mot de passe ne respecte pas toutes les règles';
    else if (pwd.next === pwd.current) r.next = 'Choisissez un mot de passe différent de l’actuel';
    if (!pwd.confirm) r.confirm = REQUIRED;
    else if (pwd.confirm !== pwd.next) r.confirm = 'La confirmation est différente du nouveau mot de passe';
    setPwdErrors(r);
    if (focusFirst(pwdRef.current, PASSWORD_FIELDS.map(([n]) => n), r)) return;
    setPwdSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setPwdSaving(false);
    setPwd({ current: '', next: '', confirm: '' });
    setToast({ open: true, message: 'Votre mot de passe a été modifié.' });
  }

  return (
    <>
      <PageTitle title="Mes informations">Modifiez vos coordonnées, vos adresses ou votre mot de passe. Cette démo n’envoie rien : vos changements restent dans cet onglet.</PageTitle>

      <form ref={profileRef} className={styles.form} noValidate onSubmit={submitProfile} aria-labelledby="infos-titre">
        <h2 className="h3" id="infos-titre">
          Coordonnées
        </h2>
        <Summary errors={errors} />
        <div className={styles.fieldsTwo}>
          {PROFILE_FIELDS.map(([name, label, type, autoComplete]) => (
            <TextInput
              key={name}
              name={name}
              label={label}
              type={type}
              autoComplete={autoComplete}
              required
              value={values[name]}
              error={errors[name]}
              hint={name === 'phone' ? 'Dix chiffres, par exemple 06 12 34 56 78.' : undefined}
              onChange={(e) => setField(name, e.target.value)}
            />
          ))}
        </div>
        <div>
          <Button htmlType="submit" loading={saving} loadingLabel="Enregistrement">
            Enregistrer mes informations
          </Button>
        </div>
      </form>

      <hr className={styles.separator} />

      <AddressesForm onSaved={(message) => setToast({ open: true, message })} />

      <hr className={styles.separator} />

      <form ref={pwdRef} className={styles.form} noValidate onSubmit={submitPassword} aria-labelledby="mdp-titre">
        <h2 className="h3" id="mdp-titre">
          Changer le mot de passe
        </h2>
        <Summary errors={pwdErrors} />
        {PASSWORD_FIELDS.map(([name, label, autoComplete]) => (
          <TextInput
            key={name}
            name={name}
            label={label}
            type="password"
            autoComplete={autoComplete}
            required
            value={pwd[name]}
            error={pwdErrors[name]}
            onChange={(e) => setPwdField(name, e.target.value)}
          />
        ))}
        <div>
          <p className="body-medium" id="mdp-regles">
            Le nouveau mot de passe doit contenir :
          </p>
          <ul className={cx(styles.rules, 'body-medium')} aria-labelledby="mdp-regles">
            {RULES.map(([label, test]) => {
              const ok = pwd.next.length > 0 && test(pwd.next);
              return (
                <li key={label} className={ok ? styles.ruleOk : undefined}>
                  <Icon name={ok ? 'check' : 'x'} size="sm" />
                  <span>
                    {label}
                    <span className="av-visually-hidden">{ok ? ' (respectée)' : ' (à respecter)'}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <Button htmlType="submit" loading={pwdSaving} loadingLabel="Modification">
            Changer le mot de passe
          </Button>
        </div>
      </form>

      <Toast open={toast.open} tone="success" message={toast.message} onDismiss={() => setToast((t) => ({ ...t, open: false }))} />
    </>
  );
}

'use client';

// Adresses de livraison et de facturation. Démo : rien n'est envoyé, les valeurs sont gardées en session.
// Validation à l'envoi, résumé d'erreurs, focus sur le premier champ en erreur. Case « facturation identique » :
// cochée, le formulaire de facturation est masqué (ses valeurs restent mémorisées si on la décoche).
import { useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button/Button';
import { Icon } from '@/components/ui/Icon/Icon';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import type { PostalAddress } from '@/lib/api';
import { useAccount } from './AccountProvider';
import { PHONE_ERROR, PHONE_RE, REQUIRED, Summary, focusFirst, without, type Errors } from './formUtils';
import styles from './compte.module.scss';

type Kind = 'shipping' | 'billing';
type Key = keyof PostalAddress;

/** Champs dans l'ordre d'affichage : clé, libellé, type de saisie, jeton autocomplete (préfixé par shipping ou billing). */
const FIELDS: { key: Key; label: string; type: 'text' | 'tel'; autoComplete: string; full?: boolean; optional?: boolean }[] = [
  { key: 'firstName', label: 'Prénom', type: 'text', autoComplete: 'given-name' },
  { key: 'lastName', label: 'Nom', type: 'text', autoComplete: 'family-name' },
  { key: 'address', label: 'Adresse', type: 'text', autoComplete: 'address-line1', full: true },
  { key: 'addressLine2', label: 'Complément d’adresse', type: 'text', autoComplete: 'address-line2', full: true, optional: true },
  { key: 'postalCode', label: 'Code postal', type: 'text', autoComplete: 'postal-code' },
  { key: 'city', label: 'Ville', type: 'text', autoComplete: 'address-level2' },
  { key: 'country', label: 'Pays', type: 'text', autoComplete: 'country-name' },
  { key: 'phone', label: 'Téléphone', type: 'tel', autoComplete: 'tel' },
];

const POSTAL_RE = /^\d{5}$/;

const fieldName = (kind: Kind, key: Key) => `${kind}_${key}`;

function validate(kind: Kind, a: PostalAddress): Errors {
  const r: Errors = {};
  const required: Key[] = ['firstName', 'lastName', 'address', 'postalCode', 'city', 'country'];
  if (kind === 'shipping') required.push('phone');
  for (const key of required) if (!a[key].trim()) r[fieldName(kind, key)] = REQUIRED;
  const isFrance = a.country.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase() === 'france';
  if (!r[fieldName(kind, 'postalCode')] && isFrance && !POSTAL_RE.test(a.postalCode.trim())) {
    r[fieldName(kind, 'postalCode')] = 'Code postal invalide : cinq chiffres, par exemple 69003';
  }
  const phone = a.phone.replace(/[\s.-]/g, '');
  if (!r[fieldName(kind, 'phone')] && phone && !PHONE_RE.test(phone)) r[fieldName(kind, 'phone')] = PHONE_ERROR;
  return r;
}

function trimmed(a: PostalAddress): PostalAddress {
  return Object.fromEntries(Object.entries(a).map(([k, v]) => [k, v.trim()])) as unknown as PostalAddress;
}

interface AddressFieldsProps {
  kind: Kind;
  legend: string;
  values: PostalAddress;
  errors: Errors;
  onChange: (kind: Kind, key: Key, value: string) => void;
}

function AddressFields({ kind, legend, values, errors, onChange }: AddressFieldsProps) {
  return (
    <fieldset className={styles.fieldset}>
      <legend className={`${styles.legend} h4`}>
        <span className={styles.legendInner}>
          <Icon name={kind === 'shipping' ? 'truck' : 'receipt'} size="md" />
          {legend}
        </span>
      </legend>
      <div className={styles.fieldsTwo}>
        {FIELDS.map((f) => {
          const name = fieldName(kind, f.key);
          const isPhone = f.key === 'phone';
          return (
            <TextInput
              key={name}
              name={name}
              label={f.label}
              type={f.type}
              autoComplete={`${kind} ${f.autoComplete}`}
              required={!f.optional && !(isPhone && kind === 'billing')}
              optional={f.optional || (isPhone && kind === 'billing')}
              className={f.full ? styles.fieldFull : undefined}
              value={values[f.key]}
              error={errors[name]}
              hint={isPhone ? 'Dix chiffres, par exemple 06 12 34 56 78.' : undefined}
              onChange={(e) => onChange(kind, f.key, e.target.value)}
            />
          );
        })}
      </div>
    </fieldset>
  );
}

export function AddressesForm({ onSaved }: { onSaved: (message: string) => void }) {
  const { addressBook, updateAddressBook } = useAccount();
  const [values, setValues] = useState({ shipping: addressBook.shipping, billing: addressBook.billing });
  const [same, setSame] = useState(addressBook.billingSameAsShipping);
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function setField(kind: Kind, key: Key, value: string) {
    setValues((p) => ({ ...p, [kind]: { ...p[kind], [key]: value } }));
    const name = fieldName(kind, key);
    if (errors[name]) setErrors((p) => without(p, name));
  }

  function toggleSame(checked: boolean) {
    setSame(checked);
    if (checked) setErrors((p) => Object.fromEntries(Object.entries(p).filter(([n]) => !n.startsWith('billing_'))));
  }

  async function submit(ev: FormEvent) {
    ev.preventDefault();
    const r: Errors = { ...validate('shipping', values.shipping), ...(same ? {} : validate('billing', values.billing)) };
    setErrors(r);
    const names = [...FIELDS.map((f) => fieldName('shipping', f.key)), ...(same ? [] : FIELDS.map((f) => fieldName('billing', f.key)))];
    if (focusFirst(formRef.current, names, r)) return;
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    updateAddressBook({ shipping: trimmed(values.shipping), billing: trimmed(values.billing), billingSameAsShipping: same });
    setSaving(false);
    onSaved('Vos adresses ont été enregistrées.');
  }

  return (
    <form ref={formRef} className={styles.form} noValidate onSubmit={submit} aria-labelledby="adresses-titre">
      <h2 className="h3" id="adresses-titre">
        Mes adresses
      </h2>
      <Summary errors={errors} />
      <AddressFields kind="shipping" legend="Adresse de livraison" values={values.shipping} errors={errors} onChange={setField} />
      <Checkbox name="billingSame" label="L’adresse de facturation est identique à l’adresse de livraison" checked={same} onChange={(e) => toggleSame(e.target.checked)} />
      {same ? null : <AddressFields kind="billing" legend="Adresse de facturation" values={values.billing} errors={errors} onChange={setField} />}
      <div>
        <Button htmlType="submit" loading={saving} loadingLabel="Enregistrement">
          Enregistrer mes adresses
        </Button>
      </div>
    </form>
  );
}

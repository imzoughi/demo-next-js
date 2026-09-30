'use client';

// Tunnel de paiement sur une seule route : 1 Livraison, 2 Paiement (carte de démo, aucun débit), 3 Confirmation.
// Validation à l'envoi de chaque étape ; le focus va au premier champ en erreur, puis au titre de la nouvelle étape.
import { useEffect, useRef, useState, type ComponentProps, type FormEvent } from 'react';
import { CheckoutProgress } from '@/components/blocks/CheckoutProgress/CheckoutProgress';
import { EmptyState } from '@/components/blocks/EmptyState/EmptyState';
import { OrderSummary } from '@/components/blocks/OrderSummary/OrderSummary';
import { Button } from '@/components/ui/Button/Button';
import { Checkbox } from '@/components/ui/Checkbox/Checkbox';
import { Icon } from '@/components/ui/Icon/Icon';
import { Radio } from '@/components/ui/Radio/Radio';
import { TextInput } from '@/components/ui/TextInput/TextInput';
import type { CartLine } from '@/lib/api';
import { formatPrice } from '@/lib/format';
import { useCart } from '../_components/CartProvider';
import styles from './CheckoutView.module.scss';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9 .()-]{9,18}$/;
const POSTAL_RE = /^[0-9]{5}$/;
const REQUIRED = 'Ce champ est obligatoire';

const SHIPPING = {
  standard: { label: 'Standard, 3 à 5 jours', price: 0 },
  express: { label: 'Express, 24 h', price: 9 },
} as const;
type ShippingId = keyof typeof SHIPPING;

type Values = Record<string, string>;
type Errors = Record<string, string>;

const DELIVERY_FIELDS = ['email', 'phone', 'firstName', 'lastName', 'address', 'postalCode', 'city', 'country'];
const PAYMENT_FIELDS = ['cardNumber', 'cardName', 'cardExpiry', 'cardCode'];

const INITIAL: Values = {
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
  address: '',
  address2: '',
  postalCode: '',
  city: '',
  country: 'France',
  cardNumber: '',
  cardName: '',
  cardExpiry: '',
  cardCode: '',
};

function luhn(digits: string) {
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let d = Number(digits[digits.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return sum % 10 === 0;
}

function validateDelivery(v: Values): Errors {
  const e: Errors = {};
  for (const k of DELIVERY_FIELDS) if (!v[k].trim()) e[k] = REQUIRED;
  if (!e.email && !EMAIL_RE.test(v.email.trim())) e.email = 'Adresse e-mail invalide';
  if (!e.phone && !PHONE_RE.test(v.phone.trim())) e.phone = 'Numéro de téléphone invalide';
  if (!e.postalCode && !POSTAL_RE.test(v.postalCode.trim())) e.postalCode = 'Code postal invalide';
  return e;
}

function validatePayment(v: Values): Errors {
  const e: Errors = {};
  for (const k of PAYMENT_FIELDS) if (!v[k].trim()) e[k] = REQUIRED;
  const digits = v.cardNumber.replace(/\s/g, '');
  if (!e.cardNumber && !(digits.length >= 13 && digits.length <= 19 && luhn(digits))) e.cardNumber = 'Numéro de carte invalide';
  if (!e.cardExpiry) {
    const m = /^(\d{2})\/(\d{2})$/.exec(v.cardExpiry);
    const now = new Date();
    const month = m ? Number(m[1]) : 0;
    const year = m ? 2000 + Number(m[2]) : 0;
    const expired = year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1);
    if (!m || month < 1 || month > 12 || expired) e.cardExpiry = 'Date d’expiration invalide';
  }
  if (!e.cardCode && !/^[0-9]{3,4}$/.test(v.cardCode.trim())) e.cardCode = 'Code de sécurité invalide';
  return e;
}

function formatCardNumber(raw: string) {
  return raw
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(.{4})/g, '$1 ')
    .trim();
}
function formatExpiry(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

/** Numéro fictif : la vraie commande sera créée par le backend. */
function newOrderNumber() {
  return `AV-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function CheckoutView({ productsHref, cartHref }: { productsHref: string; cartHref: string }) {
  const { lines } = useCart();
  const [step, setStep] = useState(0);
  const [vals, setVals] = useState<Values>(INITIAL);
  const [errs, setErrs] = useState<Errors>({});
  const [shipping, setShipping] = useState<ShippingId>('standard');
  const [billingSame, setBillingSame] = useState(true);
  const [paying, setPaying] = useState(false);
  const [confirmed, setConfirmed] = useState<{ number: string; lines: CartLine[]; total: number; email: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const focusTitle = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  // Après un changement d'étape, le focus rejoint le titre de l'étape (clavier et lecteurs d'écran).
  useEffect(() => {
    if (focusTitle.current) {
      focusTitle.current = false;
      titleRef.current?.focus();
    }
  }, [step]);

  function set(k: string, v: string) {
    setVals((p) => ({ ...p, [k]: v }));
    if (errs[k])
      setErrs((p) => {
        const n = { ...p };
        delete n[k];
        return n;
      });
  }
  function goTo(next: number) {
    setErrs({});
    focusTitle.current = true;
    setStep(next);
  }
  function focusFirst(e: Errors, order: string[]) {
    const first = order.find((k) => e[k]);
    if (first) setTimeout(() => formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(), 0);
    return Boolean(first);
  }

  const shippingCost = SHIPPING[shipping].price;
  const shown = confirmed?.lines ?? lines;
  const summaryLines = shown.map((l) => ({ name: l.name, price: l.unitPrice, quantity: l.quantity }));
  const subtotal = summaryLines.reduce((n, l) => n + l.price * l.quantity, 0);
  const total = subtotal + shippingCost;

  function submitDelivery(ev: FormEvent) {
    ev.preventDefault();
    const e = validateDelivery(vals);
    setErrs(e);
    if (!focusFirst(e, DELIVERY_FIELDS)) goTo(1);
  }
  function submitPayment(ev: FormEvent) {
    ev.preventDefault();
    const e = validatePayment(vals);
    setErrs(e);
    if (focusFirst(e, PAYMENT_FIELDS)) return;
    // Aucun vrai paiement : courte attente simulée, puis confirmation avec un numéro fictif.
    setPaying(true);
    timer.current = setTimeout(() => {
      setPaying(false);
      setConfirmed({ number: newOrderNumber(), lines, total, email: vals.email.trim() });
      goTo(2);
    }, 900);
  }

  const nErr = Object.keys(errs).length;
  const alert =
    nErr > 0 ? (
      <div className={`${styles.alert} body-medium`} role="alert">
        <Icon name="circle-alert" size="md" />
        <span>{nErr > 1 ? `${nErr} champs sont à corriger.` : '1 champ est à corriger.'}</span>
      </div>
    ) : null;

  const field = (name: string, label: string, extra: Partial<ComponentProps<typeof TextInput>> = {}, full = false) => (
    <div className={full ? styles.full : undefined}>
      <TextInput name={name} label={label} value={vals[name]} onChange={(e) => set(name, e.target.value)} error={errs[name]} required {...extra} />
    </div>
  );

  const empty = lines.length === 0 && !confirmed;

  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h1 className={`${styles.title} h2`}>Paiement</h1>
        {empty ? (
          <EmptyState
            kind="cart"
            text="Ajoutez des articles avant de passer à la livraison et au paiement."
            action={{ label: 'Découvrir la collection', href: productsHref }}
          />
        ) : (
          <>
            <CheckoutProgress className={styles.progress} current={step} onStepClick={step === 1 ? goTo : undefined} />
            <div className={styles.layout}>
              <div className={styles.mobileSummary}>
                <OrderSummary context="paiement" collapsible lines={summaryLines} shipping={shippingCost} />
              </div>
              <div className={styles.panel}>
                {step === 0 ? (
                  <form ref={formRef} noValidate onSubmit={submitDelivery} className={styles.form}>
                    <h2 ref={titleRef} tabIndex={-1} className={`${styles.stepTitle} h3`}>
                      Livraison
                    </h2>
                    {alert}
                    <fieldset className={styles.group}>
                      <legend className="h5">Contact</legend>
                      <div className={styles.grid}>
                        {field('email', 'Adresse e-mail', { type: 'email', autoComplete: 'email' })}
                        {field('phone', 'Téléphone', { type: 'tel', autoComplete: 'tel', hint: 'Pour le suivi de la livraison.' })}
                      </div>
                    </fieldset>
                    <fieldset className={styles.group}>
                      <legend className="h5">Adresse de livraison</legend>
                      <div className={styles.grid}>
                        {field('firstName', 'Prénom', { autoComplete: 'given-name' })}
                        {field('lastName', 'Nom', { autoComplete: 'family-name' })}
                        {field('address', 'Adresse', { autoComplete: 'address-line1' }, true)}
                        {field('address2', 'Complément d’adresse', { autoComplete: 'address-line2', optional: true, required: false }, true)}
                        {field('postalCode', 'Code postal', { type: 'numeric', autoComplete: 'postal-code' })}
                        {field('city', 'Ville', { autoComplete: 'address-level2' })}
                        {field('country', 'Pays', { autoComplete: 'country-name' }, true)}
                      </div>
                    </fieldset>
                    <fieldset className={styles.group}>
                      <legend className="h5">Mode de livraison</legend>
                      {(Object.keys(SHIPPING) as ShippingId[]).map((id) => (
                        <Radio
                          key={id}
                          name="shipping"
                          value={id}
                          label={`${SHIPPING[id].label} · ${SHIPPING[id].price === 0 ? 'gratuit' : formatPrice(SHIPPING[id].price)}`}
                          checked={shipping === id}
                          onChange={() => setShipping(id)}
                        />
                      ))}
                    </fieldset>
                    <div className={styles.actions}>
                      <Button type="ghost" href={cartHref}>
                        Retour au panier
                      </Button>
                      <Button htmlType="submit">Continuer vers le paiement</Button>
                    </div>
                  </form>
                ) : null}

                {step === 1 ? (
                  <form ref={formRef} noValidate onSubmit={submitPayment} className={styles.form}>
                    <h2 ref={titleRef} tabIndex={-1} className={`${styles.stepTitle} h3`}>
                      Paiement
                    </h2>
                    <p className={`${styles.note} body-medium`}>
                      <Icon name="lock" size="md" />
                      <span>
                        Paiement de démonstration : aucune somme ne sera débitée et vos données ne sont pas envoyées. Carte de test : 4242 4242 4242 4242, date
                        future et code au choix.
                      </span>
                    </p>
                    {alert}
                    <fieldset className={styles.group}>
                      <legend className="h5">Carte bancaire</legend>
                      <div className={styles.grid}>
                        {field(
                          'cardNumber',
                          'Numéro de carte',
                          { type: 'numeric', autoComplete: 'cc-number', onChange: (e) => set('cardNumber', formatCardNumber(e.target.value)) },
                          true,
                        )}
                        {field('cardName', 'Nom sur la carte', { autoComplete: 'cc-name' }, true)}
                        {field('cardExpiry', 'Date d’expiration', {
                          type: 'numeric',
                          autoComplete: 'cc-exp',
                          placeholder: 'MM/AA',
                          onChange: (e) => set('cardExpiry', formatExpiry(e.target.value)),
                        })}
                        {field('cardCode', 'Code de sécurité', { type: 'numeric', autoComplete: 'cc-csc', hint: '3 ou 4 chiffres au dos de la carte.' })}
                      </div>
                    </fieldset>
                    <Checkbox
                      label="Adresse de facturation identique à l’adresse de livraison"
                      checked={billingSame}
                      onChange={(e) => setBillingSame(e.target.checked)}
                    />
                    <div className={styles.actions}>
                      <Button type="ghost" onClick={() => goTo(0)}>
                        Retour
                      </Button>
                      <Button htmlType="submit" loading={paying} loadingLabel="Paiement en cours">
                        {`Payer ${formatPrice(total)}`}
                      </Button>
                    </div>
                  </form>
                ) : null}

                {step === 2 && confirmed ? (
                  <div className={styles.form}>
                    <h2 ref={titleRef} tabIndex={-1} className={`${styles.stepTitle} h3`}>
                      Merci, votre commande est confirmée
                    </h2>
                    <p className={`${styles.order} body-large`} role="status">
                      Numéro de commande : <strong>{confirmed.number}</strong>
                    </p>
                    <p className="body-medium">{`Un e-mail de confirmation serait envoyé à ${confirmed.email}. Il s’agit d’une démonstration : aucune commande réelle n’a été créée.`}</p>
                    <ul className={`${styles.recap} body-medium`}>
                      {confirmed.lines.map((l) => (
                        <li key={l.id}>{`${l.name}${l.quantity > 1 ? ` × ${l.quantity}` : ''} · ${formatPrice(l.unitPrice * l.quantity)}`}</li>
                      ))}
                      <li>
                        <strong>{`Total payé : ${formatPrice(confirmed.total)}`}</strong>
                      </li>
                    </ul>
                    <div>
                      <Button href={productsHref}>Continuer mes achats</Button>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className={styles.aside}>
                <OrderSummary context="paiement" lines={summaryLines} shipping={shippingCost} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

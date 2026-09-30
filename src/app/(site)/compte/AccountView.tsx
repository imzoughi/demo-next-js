'use client';

// Vue client du compte : connexion simulée (démo, aucune vraie authentification), puis espace client.
import { useEffect, useRef, useState } from 'react';
import { AccountMenu, type AccountMenuItem } from '@/components/blocks/AccountMenu/AccountMenu';
import { AuthForm } from '@/components/blocks/AuthForm/AuthForm';
import { OrderList } from '@/components/blocks/OrderList/OrderList';
import type { AccountData } from '@/lib/api';
import styles from './AccountView.module.scss';

type SectionId = 'commandes' | 'adresses' | 'informations';

const MENU: AccountMenuItem[] = [
  { id: 'commandes', label: 'Commandes', icon: 'package' },
  { id: 'adresses', label: 'Adresses', icon: 'map-pin' },
  { id: 'informations', label: 'Informations', icon: 'circle-user' },
];

const TITLES: Record<SectionId, string> = { commandes: 'Mes commandes', adresses: 'Mes adresses', informations: 'Mes informations' };

export function AccountView({ account, collectionHref }: { account: AccountData; collectionHref: string }) {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState(account.profile.email);
  const [firstName, setFirstName] = useState(account.profile.firstName);
  const [section, setSection] = useState<SectionId>('commandes');
  const [notice, setNotice] = useState('');
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const moveFocus = useRef<'h1' | 'h2' | null>(null);

  // Après un changement d'état ou de section, le focus rejoint le titre (sinon il tomberait sur <body>).
  useEffect(() => {
    const target = moveFocus.current;
    moveFocus.current = null;
    if (target === 'h1') h1Ref.current?.focus();
    if (target === 'h2') h2Ref.current?.focus();
  }, [signedIn, section]);

  async function handleAuth(mode: 'login' | 'register', values: Record<string, string | boolean>) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const typedEmail = typeof values.email === 'string' ? values.email.trim() : account.profile.email;
    const typedName = typeof values.firstName === 'string' && values.firstName.trim() ? values.firstName.trim() : account.profile.firstName;
    setEmail(typedEmail);
    setFirstName(mode === 'register' ? typedName : account.profile.firstName);
    setSection('commandes');
    setNotice('');
    moveFocus.current = 'h1';
    setSignedIn(true);
  }

  function handleLogout() {
    moveFocus.current = 'h1';
    setNotice('');
    setSignedIn(false);
  }

  function handleSelect(id: string) {
    moveFocus.current = 'h2';
    setNotice('');
    setSection(id as SectionId);
  }

  if (!signedIn) {
    return (
      <div className={styles.page}>
        <header className={styles.head}>
          <h1 className="h1" ref={h1Ref} tabIndex={-1}>
            Mon compte
          </h1>
          <p className="body-large">Connectez-vous ou créez un compte pour suivre vos commandes. Cette démo n’enregistre aucune donnée.</p>
        </header>
        <AuthForm mode="login" onSubmit={handleAuth} />
      </div>
    );
  }

  const { profile, orders, addresses } = account;
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <h1 className="h1" ref={h1Ref} tabIndex={-1}>
          {`Bonjour ${firstName}`}
        </h1>
        <p className="body-large">Retrouvez vos commandes, vos adresses et vos informations.</p>
      </header>
      <div className={styles.layout}>
        <AccountMenu items={MENU} active={section} onSelect={handleSelect} onLogout={handleLogout} />
        <section className={styles.content} aria-labelledby="compte-section">
          <h2 className="h3" id="compte-section" ref={h2Ref} tabIndex={-1}>
            {TITLES[section]}
          </h2>
          {section === 'commandes' ? (
            <>
              <OrderList
                orders={orders}
                collectionHref={collectionHref}
                onOpen={(o) => setNotice(`Le détail de la commande N° ${o.number} n’est pas disponible dans cette démo.`)}
              />
              <p className="body-medium" role="status">
                {notice}
              </p>
            </>
          ) : null}
          {section === 'adresses' ? (
            <ul className={styles.addresses}>
              {addresses.map((a) => (
                <li key={a.id} className={styles.card}>
                  <p className="h5">
                    {a.label}
                    {a.isDefault ? ' (par défaut)' : ''}
                  </p>
                  <address className="body-medium">
                    {a.name}
                    {a.lines.map((l) => (
                      <span key={l} className={styles.line}>
                        {l}
                      </span>
                    ))}
                  </address>
                </li>
              ))}
            </ul>
          ) : null}
          {section === 'informations' ? (
            <dl className={styles.infos}>
              {[
                ['Prénom', profile.firstName],
                ['Nom', profile.lastName],
                ['Adresse e-mail', email],
                ['Téléphone', profile.phone],
              ].map(([k, v]) => (
                <div key={k} className={styles.info}>
                  <dt className="body-small">{k}</dt>
                  <dd className="body-medium">{v}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </section>
      </div>
    </div>
  );
}

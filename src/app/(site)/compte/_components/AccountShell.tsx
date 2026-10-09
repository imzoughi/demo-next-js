'use client';

// Coque de l'espace client : tant que la session n'est pas lue, un squelette ; hors connexion, le formulaire de connexion
// (quelle que soit la rubrique demandée, l'adresse ne change pas) ; connecté, le menu et la rubrique.
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AccountMenu, type AccountMenuItem } from '@/components/blocks/AccountMenu/AccountMenu';
import { AuthForm } from '@/components/blocks/AuthForm/AuthForm';
import { Icon } from '@/components/ui/Icon/Icon';
import { Skeleton } from '@/components/ui/Skeleton/Skeleton';
import { cx } from '@/lib/cx';
import { routes } from '@/mocks/site';
import { useAccount } from './AccountProvider';
import { PageTitle } from './PageTitle';
import styles from './compte.module.scss';

const MENU: AccountMenuItem[] = [
  { id: 'accueil', label: 'Accueil', icon: 'circle-user', href: routes.account },
  { id: 'commandes', label: 'Commandes', icon: 'package', href: routes.accountOrders },
  { id: 'informations', label: 'Informations', icon: 'lock', href: routes.accountInfo },
  { id: 'magasin', label: 'Magasin', icon: 'map-pin', href: routes.accountStore },
];

/** Entrée de menu active selon l'adresse (la fiche d'une commande reste sous « Commandes »). */
function activeId(pathname: string): string {
  if (pathname.startsWith(routes.accountOrders.slice(0, -1))) return 'commandes';
  if (pathname.startsWith(routes.accountInfo.slice(0, -1))) return 'informations';
  if (pathname.startsWith(routes.accountStore.slice(0, -1))) return 'magasin';
  return 'accueil';
}

export function AccountShell({ children }: { children: ReactNode }) {
  const { ready, signedIn, signIn, signOut } = useAccount();
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const focusTitle = useRef(false);
  // Menu replié sous 768 px : ouvert pour une adresse donnée, il se referme tout seul quand la page change.
  const [openFor, setOpenFor] = useState<string | null>(null);
  const menuOpen = openFor === pathname;
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Changement de rubrique : le focus rejoint le h1 de la nouvelle page (le lien activé a pu disparaître avec le menu replié).
  // Rien au premier chargement : la page garde son comportement natif.
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    if (focusTitle.current || !signedIn) return;
    rootRef.current?.querySelector<HTMLElement>('h1')?.focus();
  }, [pathname, signedIn]);

  // Après connexion ou déconnexion, le focus rejoint le titre de ce qui s'affiche (sinon il tomberait sur <body>).
  useEffect(() => {
    if (!focusTitle.current || !ready) return;
    focusTitle.current = false;
    rootRef.current?.querySelector<HTMLElement>('h1')?.focus();
  }, [signedIn, ready]);

  async function handleAuth(mode: 'login' | 'register', values: Record<string, string | boolean>) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    focusTitle.current = true;
    signIn(mode, values);
  }

  function handleLogout() {
    focusTitle.current = true;
    signOut();
    router.push(routes.account);
  }

  if (!ready) {
    return (
      <div className={styles.page} ref={rootRef} aria-busy="true">
        <PageTitle title="Mon compte" />
        <p className="av-visually-hidden" role="status">
          Chargement de votre espace client
        </p>
        <div className="body-large">
          <Skeleton shape="line" lines={4} />
        </div>
      </div>
    );
  }

  if (!signedIn) {
    return (
      <div className={styles.page} ref={rootRef}>
        <PageTitle title="Mon compte">Connectez-vous ou créez un compte pour suivre vos commandes. Cette démo n’enregistre aucune donnée.</PageTitle>
        <AuthForm mode="login" onSubmit={handleAuth} />
      </div>
    );
  }

  return (
    <div className={styles.page} ref={rootRef}>
      <div className={styles.layout}>
        <div
          onKeyDown={(e) => {
            if (e.key === 'Escape' && menuOpen) {
              setOpenFor(null);
              toggleRef.current?.focus();
            }
          }}
        >
          <button
            ref={toggleRef}
            type="button"
            className={cx(styles.menuToggle, 'body-medium')}
            aria-expanded={menuOpen}
            aria-controls="compte-menu"
            onClick={() => setOpenFor(menuOpen ? null : pathname)}
          >
            <span>{`Menu du compte : ${MENU.find((m) => m.id === activeId(pathname))?.label ?? ''}`}</span>
            <Icon name="chevron-down" size="sm" />
          </button>
          <div id="compte-menu" className={styles.menuWrap} data-open={menuOpen ? '' : undefined}>
            <AccountMenu items={MENU} active={activeId(pathname)} onLogout={handleLogout} />
          </div>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

'use client';

// Session simulée de l'espace client (démo, aucune vraie authentification) : connexion, profil modifié et magasin favori,
// gardés dans sessionStorage pour la durée de l'onglet. Lecture via useSyncExternalStore : le rendu serveur dit « pas encore
// lu » (ready = false), le navigateur lit ensuite le stockage sans écart d'hydratation.
import { createContext, use, useCallback, useMemo, useSyncExternalStore, type ReactNode } from 'react';
import type { AccountAddress, AccountProfile, Order, Store } from '@/lib/api';

interface Session {
  profile: AccountProfile;
  favoriteStoreId: string | null;
}

interface AccountContextValue {
  /** false tant que le navigateur n'a pas lu la session (rendu serveur et hydratation). */
  ready: boolean;
  signedIn: boolean;
  profile: AccountProfile;
  favoriteStoreId: string | null;
  orders: Order[];
  addresses: AccountAddress[];
  stores: Store[];
  signIn: (mode: 'login' | 'register', values: Record<string, string | boolean>) => void;
  signOut: () => void;
  updateProfile: (profile: AccountProfile) => void;
  setFavoriteStore: (id: string | null) => void;
}

const STORAGE_KEY = 'boutique-demo:compte:v1';
const PENDING = '__pending__';

let memory = '';
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
function getSnapshot(): string {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return memory;
  }
}
function getServerSnapshot(): string {
  return PENDING;
}
function write(session: Session | null) {
  memory = session ? JSON.stringify(session) : '';
  try {
    if (session) window.sessionStorage.setItem(STORAGE_KEY, memory);
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* stockage refusé : la session reste en mémoire pour cet onglet */
  }
  listeners.forEach((l) => l());
}

function parse(raw: string): Session | null {
  if (!raw || raw === PENDING) return null;
  try {
    const s = JSON.parse(raw) as Session;
    const p = s?.profile;
    if (p && typeof p.firstName === 'string' && typeof p.lastName === 'string' && typeof p.email === 'string' && typeof p.phone === 'string') {
      return { profile: p, favoriteStoreId: typeof s.favoriteStoreId === 'string' ? s.favoriteStoreId : null };
    }
  } catch {
    /* contenu illisible : on repart déconnecté */
  }
  return null;
}

const AccountContext = createContext<AccountContextValue | null>(null);

export interface AccountProviderProps {
  defaultProfile: AccountProfile;
  orders: Order[];
  addresses: AccountAddress[];
  stores: Store[];
  children: ReactNode;
}

export function AccountProvider({ defaultProfile, orders, addresses, stores, children }: AccountProviderProps) {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const session = useMemo(() => parse(raw), [raw]);

  const signIn = useCallback<AccountContextValue['signIn']>(
    (mode, values) => {
      const text = (k: string) => (typeof values[k] === 'string' ? (values[k] as string).trim() : '');
      write({
        profile: {
          ...defaultProfile,
          email: text('email') || defaultProfile.email,
          ...(mode === 'register' ? { firstName: text('firstName') || defaultProfile.firstName, lastName: text('lastName') || defaultProfile.lastName } : {}),
        },
        favoriteStoreId: null,
      });
    },
    [defaultProfile],
  );
  const signOut = useCallback(() => write(null), []);
  const updateProfile = useCallback((profile: AccountProfile) => {
    const current = parse(getSnapshot());
    if (current) write({ ...current, profile });
  }, []);
  const setFavoriteStore = useCallback((id: string | null) => {
    const current = parse(getSnapshot());
    if (current) write({ ...current, favoriteStoreId: id });
  }, []);

  const value = useMemo<AccountContextValue>(
    () => ({
      ready: raw !== PENDING,
      signedIn: session !== null,
      profile: session?.profile ?? defaultProfile,
      favoriteStoreId: session?.favoriteStoreId ?? null,
      orders,
      addresses,
      stores,
      signIn,
      signOut,
      updateProfile,
      setFavoriteStore,
    }),
    [raw, session, defaultProfile, orders, addresses, stores, signIn, signOut, updateProfile, setFavoriteStore],
  );
  return <AccountContext value={value}>{children}</AccountContext>;
}

export function useAccount(): AccountContextValue {
  const ctx = use(AccountContext);
  if (!ctx) throw new Error('useAccount doit être utilisé dans <AccountProvider>.');
  return ctx;
}

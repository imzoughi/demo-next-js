// Gabarit commun de l'espace client : session simulée + navigation (AccountMenu) + connexion si besoin.
// Une seule <main> pour toutes les rubriques ; chaque page fournit son <h1>.
import type { ReactNode } from 'react';
import { getAccount, getStores } from '@/lib/api';
import { AccountProvider } from './_components/AccountProvider';
import { AccountShell } from './_components/AccountShell';

export default async function CompteLayout({ children }: { children: ReactNode }) {
  const [account, stores] = await Promise.all([getAccount(), getStores()]);
  return (
    <AccountProvider defaultProfile={account.profile} orders={account.orders} addresses={account.addresses} stores={stores}>
      <main id="contenu">
        <AccountShell>{children}</AccountShell>
      </main>
    </AccountProvider>
  );
}

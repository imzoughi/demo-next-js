import type { Metadata } from 'next';
import { getAccount } from '@/lib/api';
import { routes } from '@/mocks/site';
import { AccountView } from './AccountView';

export const metadata: Metadata = {
  title: 'Mon compte · Avion',
  description: 'Connectez-vous ou créez votre compte pour suivre vos commandes, gérer vos adresses et vos informations.',
};

export default async function ComptePage() {
  const account = await getAccount();
  return (
    <main id="contenu">
      <AccountView account={account} collectionHref={routes.products} />
    </main>
  );
}

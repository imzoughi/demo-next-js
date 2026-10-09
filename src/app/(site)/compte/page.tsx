import type { Metadata } from 'next';
import { AccountHome } from './_components/AccountHome';

export const metadata: Metadata = {
  title: 'Mon compte · Avion',
  description: 'Connectez-vous ou créez votre compte, puis retrouvez vos commandes, votre magasin favori et vos informations.',
};

export default function ComptePage() {
  return <AccountHome />;
}

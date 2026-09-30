import type { Metadata } from 'next';
import { routes } from '@/mocks/site';
import { CheckoutView } from './CheckoutView';

export const metadata: Metadata = {
  title: 'Paiement · Avion',
  description: 'Finalisez votre commande en trois étapes : livraison, paiement, confirmation. Paiement de démonstration, aucun débit réel.',
};

export default function PaiementPage() {
  return (
    <main id="contenu">
      <CheckoutView productsHref={routes.products} cartHref={routes.cart} />
    </main>
  );
}

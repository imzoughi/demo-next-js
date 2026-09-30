import type { Metadata } from 'next';
import { routes } from '@/mocks/site';
import { BasketView } from './BasketView';

export const metadata: Metadata = {
  title: 'Votre panier · Avion',
  description: 'Vérifiez vos articles, ajustez les quantités et passez la commande. Taxes et livraison calculées au paiement.',
};

export default function PanierPage() {
  return (
    <main id="contenu">
      <BasketView continueHref={routes.products} checkoutHref={routes.checkout} />
    </main>
  );
}

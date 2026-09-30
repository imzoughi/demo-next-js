// Mise en page commune aux pages du site (accueil, liste-produits, fiche-produit, panier, paiement, compte).
// Le portail (/) et la documentation (/docs) restent hors de ce groupe. Chaque page fournit son <main>.
import type { ReactNode } from 'react';
import { Footer } from '@/components/blocks/Footer/Footer';
import { getCart, getCategories } from '@/lib/api';
import { announcement, footerColumns, routes } from '@/mocks/site';
import { CartProvider } from './_components/CartProvider';
import { SiteHeader } from './_components/SiteHeader';

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const [categories, cart] = await Promise.all([getCategories(), getCart()]);
  return (
    <CartProvider initialCart={cart}>
      <SiteHeader
        categories={categories.map((c) => ({ ...c, href: routes.products }))}
        announcement={announcement}
        homeHref={routes.home}
        cartHref={routes.cart}
        accountHref={routes.account}
        collectionHref={routes.products}
        checkoutHref={routes.checkout}
      />
      {children}
      <Footer columns={footerColumns} />
    </CartProvider>
  );
}

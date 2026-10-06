'use client';

// En-tête commun aux pages du site : bandeau d'annonce, TopNav et MiniCart (état du panier local à la démo).
import { Banner } from '@/components/blocks/Banner/Banner';
import { MiniCart } from '@/components/blocks/MiniCart/MiniCart';
import { TopNav } from '@/components/blocks/TopNav/TopNav';
import type { Category } from '@/lib/api';
import { useCart } from './CartProvider';

export interface SiteHeaderProps {
  categories: Category[];
  announcement?: string;
  activeCategory?: string;
  current?: 'home';
  homeHref: string;
  cartHref: string;
  accountHref: string;
  collectionHref: string;
  checkoutHref: string;
}

export function SiteHeader({ categories, announcement, activeCategory, current, homeHref, cartHref, accountHref, collectionHref, checkoutHref }: SiteHeaderProps) {
  const { lines, open, restoreFocus, openCart, closeCart, closeForNavigation, setQuantity, removeLine } = useCart();
  const count = lines.reduce((n, l) => n + l.quantity, 0);

  return (
    <>
      {announcement ? <Banner>{announcement}</Banner> : null}
      <TopNav
        categories={categories}
        activeCategory={activeCategory}
        current={current}
        cartCount={count}
        cartExpanded={open}
        homeHref={homeHref}
        cartHref={cartHref}
        accountHref={accountHref}
        onCart={openCart}
      />
      <MiniCart
        open={open}
        items={lines}
        cartHref={cartHref}
        checkoutHref={checkoutHref}
        collectionHref={collectionHref}
        restoreFocus={restoreFocus}
        onNavigate={closeForNavigation}
        onClose={closeCart}
        onQuantityChange={setQuantity}
        onRemove={removeLine}
      />
    </>
  );
}

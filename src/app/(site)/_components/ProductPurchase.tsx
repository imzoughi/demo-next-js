'use client';

// Fiche produit interactive : ajout au panier (chargement simulé), puis ouverture du MiniCart.
import { ProductDetails, type ProductDetailsProps } from '@/components/blocks/ProductDetails/ProductDetails';
import type { Product } from '@/lib/api';
import { useCart } from './CartProvider';

const ADD_DELAY_MS = 700;

export function ProductPurchase({ product, breadcrumb }: { product: Product; breadcrumb: ProductDetailsProps['breadcrumb'] }) {
  const { addLine, openCart } = useCart();

  async function onAdd(quantity: number) {
    await new Promise((resolve) => setTimeout(resolve, ADD_DELAY_MS));
    addLine({
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      max: product.max,
      image: product.image,
      imageAlt: product.imageAlt,
      href: product.href,
    });
    openCart();
  }

  return <ProductDetails product={product} breadcrumb={breadcrumb} onAdd={onAdd} />;
}

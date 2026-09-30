import type { Metadata } from 'next';
import { EmailSignup } from '@/components/blocks/EmailSignup/EmailSignup';
import { Features } from '@/components/blocks/Features/Features';
import { Listings } from '@/components/blocks/Listings/Listings';
import { getHomeContent, getProductPage } from '@/lib/api';
import { routes } from '@/mocks/site';
import { ProductPurchase } from '../_components/ProductPurchase';

export const metadata: Metadata = {
  title: 'Chaise Dandy · Avion',
  description: 'La chaise Dandy : un design intemporel, des pieds en hêtre et une assise en cuir d’agneau. Ajoutez-la à votre panier.',
};

export default async function FicheProduitPage() {
  const [{ product, related, relatedTitle, breadcrumbHome }, home] = await Promise.all([getProductPage(), getHomeContent()]);
  const { newsletter } = home;
  return (
    <main id="contenu">
      <ProductPurchase
        product={product}
        breadcrumb={[
          { label: breadcrumbHome, href: routes.home },
          { label: product.category, href: routes.products },
          { label: product.name },
        ]}
      />
      <Listings title={relatedTitle} products={related} columns={3} action={{ href: routes.products }} />
      <Features title={home.featuresTitle} />
      <EmailSignup title={newsletter.title} text={newsletter.text} benefits={newsletter.benefits} />
    </main>
  );
}

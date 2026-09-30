import type { Metadata } from 'next';
import { EmailSignup } from '@/components/blocks/EmailSignup/EmailSignup';
import { Features } from '@/components/blocks/Features/Features';
import { HeroBlocks } from '@/components/blocks/HeroBlocks/HeroBlocks';
import { Listings } from '@/components/blocks/Listings/Listings';
import { getFeaturedProducts, getHomeContent } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Accueil · Avion',
  description: 'Mobilier et décoration de qualité, faits par de vrais artisans. Découvrez la nouvelle collection de printemps.',
};

export default async function AccueilPage() {
  const [content, products] = await Promise.all([getHomeContent(), getFeaturedProducts()]);
  const { hero, story, newsletter } = content;
  return (
    <main id="contenu">
      <HeroBlocks
        variant="card"
        title={hero.title}
        text={hero.text}
        image={hero.image}
        imageAlt={hero.imageAlt}
        action={{ label: hero.actionLabel, href: hero.actionHref }}
      />
      <Features title={content.featuresTitle} />
      <Listings title={content.featuredTitle} products={products} mobileColumns={2} action={{ href: hero.actionHref }} />
      <HeroBlocks
        variant="dark"
        headingLevel={2}
        priority={false}
        title={story.title}
        text={story.text}
        image={story.image}
        imageAlt={story.imageAlt}
        action={{ label: story.actionLabel, href: story.actionHref }}
      />
      <EmailSignup title={newsletter.title} text={newsletter.text} benefits={newsletter.benefits} />
    </main>
  );
}

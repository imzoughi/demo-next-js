import type { Metadata } from 'next';
import { StoreFinder } from '../_components/StoreFinder';

export const metadata: Metadata = {
  title: 'Mon magasin · Avion',
  description: 'Trouvez un magasin par ville ou code postal et choisissez votre magasin favori.',
};

export default function MagasinPage() {
  return <StoreFinder />;
}

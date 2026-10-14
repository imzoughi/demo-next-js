import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { stores } from '@/mocks/stores';
import { StoreMap } from './StoreMap';

// Les tuiles viennent d'OpenStreetMap (réseau requis). L'heure est fixée (mercredi 14 octobre 2026, 12 h à Paris)
// pour que le statut des bulles soit le même à chaque affichage.
const NOW = Date.parse('2026-10-14T10:00:00Z');
const one = [stores[0]];

const meta = {
  title: 'Sections de page/Compte/StoreMap',
  component: StoreMap,
  tags: ['autodocs'],
  args: { stores, favoriteId: null, selectedId: null, focusRequest: null, now: NOW, onSelect: () => {}, onChoose: () => {} },
  decorators: [(Story) => <div style={{ padding: 'var(--space-5)', maxWidth: 800 }}><Story /></div>],
} satisfies Meta<typeof StoreMap>;
export default meta;
type Story = StoryObj<typeof meta>;

export const AllStores: Story = {};
export const WithFavorite: Story = { args: { favoriteId: 'paris-marais' } };
export const SingleResult: Story = { args: { stores: one } };

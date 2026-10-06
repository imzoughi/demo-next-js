import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OnInverse, Pad } from '@/lib/story-helpers';
import { Badge } from '../Badge/Badge';
import { IconButton } from './IconButton';

const meta = {
  title: 'Actions/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { icon: 'search', label: 'Rechercher' },
  decorators: [Pad],
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Par défaut' };
export const AsLink: Story = { name: 'Lien', args: { icon: 'circle-user', label: 'Mon compte', href: '/compte/' } };
export const Expanded: Story = { name: 'Ouvert', args: { icon: 'menu', label: 'Ouvrir le menu', expanded: true } };
export const Pressed: Story = { name: 'Pressé', args: { pressed: true } };
export const SizeSm: Story = { name: 'Taille petite (16 px)', args: { size: 'sm' } };
export const SizeMd: Story = { name: 'Taille moyenne (20 px)', args: { size: 'md' } };
export const SizeLg: Story = { name: 'Taille grande (24 px)', args: { size: 'lg' } };
export const WithBadge: Story = {
  name: 'Avec pastille',
  args: { icon: 'shopping-cart', label: 'Panier, 2 articles', children: <Badge count={2} /> },
};
export const Disabled: Story = { name: 'Désactivé', args: { disabled: true } };
export const DisabledLink: Story = {
  name: 'Lien désactivé',
  args: { icon: 'circle-user', label: 'Mon compte', href: '/compte/', disabled: true },
};
export const Inverse: Story = { name: 'Inverse', args: { tone: 'inverse' }, decorators: [OnInverse] };
export const InverseExpanded: Story = {
  name: 'Inverse ouvert',
  args: { tone: 'inverse', icon: 'x', label: 'Fermer', expanded: true },
  decorators: [OnInverse],
};
export const InversePressed: Story = { name: 'Inverse pressé', args: { tone: 'inverse', pressed: true }, decorators: [OnInverse] };
export const InverseDisabled: Story = { name: 'Inverse désactivé', args: { tone: 'inverse', disabled: true }, decorators: [OnInverse] };
export const InverseWithBadge: Story = {
  name: 'Inverse avec pastille',
  args: { tone: 'inverse', icon: 'shopping-cart', label: 'Panier, 2 articles', children: <Badge count={2} tone="inverse" /> },
  decorators: [OnInverse],
};

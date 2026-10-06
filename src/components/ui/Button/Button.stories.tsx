import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OnInverse, Pad } from '@/lib/story-helpers';
import { Button } from './Button';

const meta = {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Ajouter au panier' },
  decorators: [Pad],
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { type: 'secondary', children: 'Voir le panier' } };
export const Ghost: Story = { args: { type: 'ghost', children: 'Tout effacer' } };
export const White: Story = { args: { type: 'white', children: 'Voir la collection' }, decorators: [OnInverse] };
export const Opaque: Story = { args: { type: 'opaque', children: 'Voir la collection' }, decorators: [OnInverse] };
export const Small: Story = { args: { size: 'sm' } };
export const WithIcon: Story = { args: { iconRight: true, children: 'Catégorie' } };
export const AsLink: Story = { args: { href: '/panier/', type: 'secondary', children: 'Voir le panier' } };
export const FullWidth: Story = { args: { fullWidth: true } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true, loadingLabel: 'Ajout en cours' } };

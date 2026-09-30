import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Retours et états/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Cart: Story = { args: { kind: 'cart', action: { label: 'Découvrir la collection', href: '/collection' } } };
export const Results: Story = { args: { kind: 'results' } };
export const Custom: Story = {
  args: { icon: 'package', title: 'Aucune commande pour l’instant', text: 'Vos commandes apparaîtront ici, avec leur suivi.' },
};

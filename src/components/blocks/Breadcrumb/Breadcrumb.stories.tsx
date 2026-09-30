import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Accueil', href: '/' },
      { label: 'Chaises', href: '/chaises' },
      { label: 'Fauteuil Dandy' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const LongName: Story = {
  args: {
    items: [
      { label: 'Accueil', href: '/' },
      { label: 'Tables', href: '/tables' },
      { label: 'Table basse en chêne massif avec plateau amovible et rangement intégré' },
    ],
  },
};
export const TwoLevels: Story = { args: { items: [{ label: 'Accueil', href: '/' }, { label: 'Panier' }] } };

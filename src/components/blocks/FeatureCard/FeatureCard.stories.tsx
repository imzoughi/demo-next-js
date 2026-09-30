import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { FeatureCard } from './FeatureCard';

const meta = {
  title: 'Cartes/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  args: {
    icon: 'truck',
    title: 'Livraison le lendemain',
    text: 'Commandez avant 15 h et recevez votre commande dès le lendemain.',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)', maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeatureCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};
export const Plain: Story = { args: { filled: false } };
export const WithoutIcon: Story = { args: { icon: undefined } };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OrderSummary } from './OrderSummary';

const lines = [
  { name: 'Fauteuil Dandy', price: 250, quantity: 1 },
  { name: 'Vase Graystone', price: 85, quantity: 2 },
];

const meta = {
  title: 'Sections de page/OrderSummary',
  component: OrderSummary,
  tags: ['autodocs'],
  args: { lines },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)', maxWidth: 'var(--size-content-narrow)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OrderSummary>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Cart: Story = { args: { context: 'panier', action: { label: 'Passer la commande', href: '/paiement' } } };
export const Payment: Story = { args: { context: 'paiement', shipping: 0 } };
export const ShippingNotComputed: Story = { args: { context: 'paiement' } };
export const Collapsible: Story = { args: { context: 'paiement', shipping: 15, collapsible: true } };
export const Loading: Story = { args: { loading: true } };

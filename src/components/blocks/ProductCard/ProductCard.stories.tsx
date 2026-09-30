import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { products } from '@/mocks/catalog';
import { ProductCard } from './ProductCard';

const [dandy, , , , table] = products;

const meta = {
  title: 'Cartes/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  args: { name: dandy.name, price: dandy.price, image: dandy.image, imageAlt: dandy.imageAlt, href: dandy.href },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)', maxWidth: '360px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {};
export const Large: Story = { args: { size: 'lg' } };
export const LongName: Story = { args: { name: table.name, price: table.price, image: table.image, imageAlt: table.imageAlt } };
export const Priority: Story = { args: { priority: true } };
export const Loading: Story = { args: { loading: true } };

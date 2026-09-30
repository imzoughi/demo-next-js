import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { cartLines } from '@/mocks/catalog';
import { CartItem } from './CartItem';

const line = cartLines[0];

const meta = {
  title: 'Cartes/CartItem',
  component: CartItem,
  tags: ['autodocs'],
  args: {
    name: line.name,
    description: line.description,
    unitPrice: line.unitPrice,
    quantity: 1,
    max: line.max,
    image: line.image,
    imageAlt: line.imageAlt,
    href: line.href,
  },
  decorators: [
    (Story, context) => (
      <ul
        style={{
          margin: 0,
          padding: 'var(--space-5)',
          maxWidth: context.args.context === 'drawer' ? 'var(--size-drawer)' : undefined,
        }}
      >
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof CartItem>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = { name: 'Page panier' };
export const Drawer: Story = {
  name: 'Tiroir',
  args: { context: 'drawer' },
};
export const AtMaxStock: Story = { name: 'Stock maximum atteint', args: { quantity: 12 } };
export const Removing: Story = { name: 'Retrait en cours', args: { removing: true } };
export const WithoutLink: Story = { name: 'Sans lien', args: { href: undefined } };

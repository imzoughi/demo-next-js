import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { cartLines } from '@/mocks/catalog';
import { ShoppingBasket } from './ShoppingBasket';

const meta = {
  title: 'Sections de page/ShoppingBasket',
  component: ShoppingBasket,
  tags: ['autodocs'],
  args: { headingLevel: 3, items: cartLines },
} satisfies Meta<typeof ShoppingBasket>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};
export const Empty: Story = { args: { items: [] } };
export const ItemRemoving: Story = { args: { items: [{ ...cartLines[0], removing: true }, cartLines[1]] } };

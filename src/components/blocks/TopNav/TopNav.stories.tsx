import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TopNav } from './TopNav';

const meta = {
  title: 'Navigation/TopNav',
  component: TopNav,
  tags: ['autodocs'],
  args: { cartCount: 0 },
} satisfies Meta<typeof TopNav>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithItemsInCart: Story = { args: { cartCount: 2 } };
export const ActiveCategory: Story = { args: { activeCategory: 'Céramiques', cartCount: 1 } };
export const Sticky: Story = { args: { sticky: true } };
export const Mobile: Story = {
  args: { cartCount: 3 },
  globals: { viewport: { value: 'mobile', isRotated: false } },
};

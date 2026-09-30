import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { cartLines } from '@/mocks/catalog';
import { MiniCart } from './MiniCart';

const meta = {
  title: 'Couches/MiniCart',
  component: MiniCart,
  tags: ['autodocs'],
  args: { open: true, static: true, items: cartLines, onClose: () => {} },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '720px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MiniCart>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};
export const Empty: Story = { args: { items: [] } };
export const Loading: Story = { args: { loading: true } };
export const ItemRemoved: Story = {
  args: { notice: { message: 'Article retiré', actionLabel: 'Annuler', duration: 0 }, items: [cartLines[0]] },
};

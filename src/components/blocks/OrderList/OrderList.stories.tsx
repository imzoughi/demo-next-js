import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { orders } from '@/mocks/catalog';
import { OrderList } from './OrderList';

const meta = {
  title: 'Sections de page/OrderList',
  component: OrderList,
  tags: ['autodocs'],
  args: { orders },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OrderList>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};
export const Empty: Story = { args: { orders: [] } };
export const Loading: Story = { args: { loading: true } };

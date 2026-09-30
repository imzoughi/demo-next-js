import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { products } from '@/mocks/catalog';
import { Listings } from './Listings';

const meta = {
  title: 'Sections de page/Listings',
  component: Listings,
  tags: ['autodocs'],
  args: { title: 'Nos nouveautés', products: products.slice(0, 4) },
} satisfies Meta<typeof Listings>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TwoColumnsMobile: Story = { args: { mobileColumns: 2 } };
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { products: [] } };
export const WithoutAction: Story = { args: { action: false } };

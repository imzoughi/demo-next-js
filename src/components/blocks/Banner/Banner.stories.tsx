import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Banner } from './Banner';

const meta = {
  title: 'Navigation/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: { children: 'Livraison le lendemain — commandez avant 15 h et recevez votre commande le lendemain' },
} satisfies Meta<typeof Banner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NotDismissible: Story = { args: { dismissible: false } };
export const WithoutIcon: Story = { args: { icon: false } };
export const Dismissed: Story = { args: { open: false } };

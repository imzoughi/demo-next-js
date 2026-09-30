import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Logo } from './Logo';
import { OnInverse, Pad } from '@/lib/story-helpers';

const meta = {
  title: 'Fondations/Logo',
  component: Logo,
  tags: ['autodocs'],
  decorators: [Pad],
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Inverse: Story = { args: { tone: 'inverse' }, decorators: [OnInverse] };
export const Current: Story = { args: { current: true } };

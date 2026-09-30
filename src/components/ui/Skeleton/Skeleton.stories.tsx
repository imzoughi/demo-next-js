import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Retours et états/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)', maxWidth: 'var(--size-content-narrow)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = { args: { shape: 'line', lines: 3 } };
export const Image: Story = { args: { shape: 'image', ratio: '4 / 5' } };
export const Card: Story = { args: { shape: 'card' } };
export const LargeCard: Story = { args: { shape: 'card', ratio: '5 / 3' } };

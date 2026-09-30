import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pad } from '@/lib/story-helpers';
import { FilterChip } from './FilterChip';

const meta = {
  title: 'Retours et états/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  args: { label: 'Céramiques' },
  decorators: [Pad],
} satisfies Meta<typeof FilterChip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };

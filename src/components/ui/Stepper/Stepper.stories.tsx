import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pad } from '@/lib/story-helpers';
import { Stepper } from './Stepper';

const meta = {
  title: 'Formulaires/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: { defaultValue: 2, max: 5 },
  decorators: [Pad],
} satisfies Meta<typeof Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AtMinimum: Story = { args: { defaultValue: 1 } };
export const AtMaximum: Story = { args: { defaultValue: 5 } };
export const Disabled: Story = { args: { disabled: true } };

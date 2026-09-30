import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CheckoutProgress } from './CheckoutProgress';

const meta = {
  title: 'Sections de page/CheckoutProgress',
  component: CheckoutProgress,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)', maxWidth: 'var(--size-content-form)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CheckoutProgress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Delivery: Story = { args: { current: 0 } };
export const Payment: Story = { args: { current: 1 } };
export const Confirmation: Story = { args: { current: 2 } };
export const ClickableDoneSteps: Story = { args: { current: 2, onStepClick: () => {} } };

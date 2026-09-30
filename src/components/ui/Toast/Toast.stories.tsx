import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Toast } from './Toast';

const meta = {
  title: 'Retours et états/Toast',
  component: Toast,
  tags: ['autodocs'],
  args: { open: true, position: 'static', duration: 0, message: 'Article retiré' },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const WithUndo: Story = { args: { message: 'Article retiré', action: { label: 'Annuler' } } };
export const Success: Story = { args: { tone: 'success', message: 'Ajouté au panier' } };
export const Error: Story = { args: { tone: 'error', message: 'L’ajout au panier n’a pas abouti' } };
export const Closed: Story = { args: { open: false } };

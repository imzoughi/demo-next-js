import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OnInverse } from '@/lib/story-helpers';
import { IconButton } from '../IconButton/IconButton';
import { Badge } from './Badge';
import { cartLabel } from '@/lib/format';

const meta = {
  title: 'Retours et états/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { count: 2 },
  render: (args) => (
    <div style={{ padding: 'var(--space-5)' }}>
      <IconButton icon="shopping-cart" label={cartLabel(args.count)}>
        <Badge {...args} />
      </IconButton>
    </div>
  ),
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Few: Story = { name: 'Quelques articles' };
export const Many: Story = { name: 'Plus de 99', args: { count: 120 } };
export const Empty: Story = { name: 'Vide (masqué)', args: { count: 0 } };
export const Inverse: Story = {
  name: 'Inverse',
  args: { tone: 'inverse' },
  render: (args) => (
    <IconButton icon="shopping-cart" label={cartLabel(args.count)} tone="inverse">
      <Badge {...args} />
    </IconButton>
  ),
  decorators: [OnInverse],
};

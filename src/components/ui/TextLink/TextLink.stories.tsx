import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OnInverse, Pad } from '@/lib/story-helpers';
import { TextLink } from './TextLink';

const meta = {
  title: 'Actions/TextLink',
  component: TextLink,
  tags: ['autodocs'],
  args: { href: '/collection', children: 'Continuer mes achats' },
  decorators: [Pad],
} satisfies Meta<typeof TextLink>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Brand: Story = { args: { tone: 'brand', iconLeft: 'arrow-left' } };
export const AsButton: Story = { args: { href: undefined, iconLeft: 'trash-2', children: 'Retirer' } };
export const Inline: Story = {
  render: () => (
    <p className="body-medium">
      Consultez notre{' '}
      <TextLink href="/retours" inline tone="brand">
        politique de retour
      </TextLink>{' '}
      avant de commander.
    </p>
  ),
};
export const Inverse: Story = { args: { tone: 'inverse' }, decorators: [OnInverse] };

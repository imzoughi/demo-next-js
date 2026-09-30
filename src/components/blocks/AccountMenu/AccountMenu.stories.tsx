import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AccountMenu } from './AccountMenu';

const meta = {
  title: 'Sections de page/AccountMenu',
  component: AccountMenu,
  tags: ['autodocs'],
  args: { active: 'profil' },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AccountMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Profile: Story = {};
export const Orders: Story = { args: { active: 'commandes' } };
export const NoActive: Story = { args: { active: undefined } };

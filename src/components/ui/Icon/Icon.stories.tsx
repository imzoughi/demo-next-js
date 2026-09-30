import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Icon, iconNames, socialIconNames } from './Icon';

const meta = {
  title: 'Fondations/Icon',
  component: Icon,
  tags: ['autodocs'],
  args: { name: 'truck', size: 'lg' },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Medium: Story = { args: { size: 'md' } };
export const Named: Story = { args: { label: 'Livraison' } };
export const Spinning: Story = { args: { name: 'loader-circle', spin: true } };

export const AllLucide: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-5)', padding: 'var(--space-5)' }}>
      {iconNames.map((n) => (
        <Icon key={n} name={n} label={n} />
      ))}
    </div>
  ),
};

export const SocialLogos: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--space-5)', padding: 'var(--space-5)' }}>
      {socialIconNames.map((n) => (
        <Icon key={n} name={n} label={n} />
      ))}
    </div>
  ),
};

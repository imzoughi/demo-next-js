import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pad } from '@/lib/story-helpers';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Formulaires/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Céramiques' },
  decorators: [Pad],
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const WithCount: Story = { args: { count: 24 } };
export const WithHint: Story = { args: { label: 'Recevoir la lettre d’information', hint: 'Facultatif. Désinscription en un clic.' } };
export const Disabled: Story = { args: { disabled: true } };
export const Error: Story = { args: { label: 'J’accepte les conditions', error: 'Ce champ est obligatoire' } };

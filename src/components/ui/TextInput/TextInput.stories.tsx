import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { OnInverse } from '@/lib/story-helpers';
import { TextInput } from './TextInput';

const meta = {
  title: 'Formulaires/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  args: { label: 'Adresse e-mail', type: 'email', autoComplete: 'email', placeholder: 'vous@exemple.fr' },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)', maxWidth: 'var(--size-content-form)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextInput>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Filled: Story = { args: { defaultValue: 'marie@exemple.fr' } };
export const WithHint: Story = { args: { label: 'Mot de passe', type: 'password', hint: '8 caractères minimum.', placeholder: undefined } };
export const Optional: Story = { args: { label: 'Complément d’adresse', type: 'text', optional: true, placeholder: undefined } };
export const Error: Story = { args: { defaultValue: 'marie@', error: 'Adresse e-mail invalide' } };
export const Success: Story = { args: { defaultValue: 'marie@exemple.fr', success: 'Merci, vous êtes inscrit' } };
export const Disabled: Story = { args: { disabled: true } };
export const HiddenLabel: Story = { args: { hideLabel: true } };
export const Opaque: Story = { args: { variant: 'opaque' }, decorators: [OnInverse] };
export const OpaqueError: Story = { args: { variant: 'opaque', error: 'Adresse e-mail invalide' }, decorators: [OnInverse] };

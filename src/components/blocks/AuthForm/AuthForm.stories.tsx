import { expect, userEvent, within } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AuthForm } from './AuthForm';

const meta = {
  title: 'Sections de page/AuthForm',
  component: AuthForm,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AuthForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {};
export const Register: Story = { args: { mode: 'register' } };

export const FieldErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Se connecter' }));
    await expect(await canvas.findByRole('alert')).toBeInTheDocument();
  },
};

export const GlobalError: Story = {
  args: { onSubmit: () => Promise.reject(new Error('Adresse e-mail ou mot de passe incorrect.')) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Adresse e-mail'), 'marie@exemple.fr');
    await userEvent.type(canvas.getByLabelText('Mot de passe'), 'motdepasse');
    await userEvent.click(canvas.getByRole('button', { name: 'Se connecter' }));
    await expect(await canvas.findByRole('alert')).toHaveTextContent('incorrect');
  },
};

export const Loading: Story = {
  args: { onSubmit: () => new Promise(() => {}) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText('Adresse e-mail'), 'marie@exemple.fr');
    await userEvent.type(canvas.getByLabelText('Mot de passe'), 'motdepasse');
    await userEvent.click(canvas.getByRole('button', { name: 'Se connecter' }));
  },
};

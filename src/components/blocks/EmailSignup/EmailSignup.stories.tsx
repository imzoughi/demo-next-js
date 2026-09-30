import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { EmailSignup } from './EmailSignup';

const meta = {
  title: 'Sections de page/EmailSignup',
  component: EmailSignup,
  tags: ['autodocs'],
} satisfies Meta<typeof EmailSignup>;
export default meta;
type Story = StoryObj<typeof meta>;

async function subscribe(canvasElement: HTMLElement, email: string) {
  const c = within(canvasElement);
  await userEvent.type(c.getByLabelText('Adresse e-mail'), email);
  await userEvent.click(c.getByRole('button', { name: 'S’inscrire' }));
  return c;
}

export const Light: Story = { name: 'Clair' };
export const Dark: Story = { name: 'Sombre', args: { tone: 'dark' } };
export const Compact: Story = {
  name: 'Compact',
  args: { compact: true, title: 'Inscrivez-vous à notre lettre d’information' },
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--space-5)', maxWidth: '480px' }}>
        <Story />
      </div>
    ),
  ],
};
export const WithBenefits: Story = { name: 'Avec avantages', args: { benefits: ['Offres exclusives', 'Ventes privées'] } };
export const Loading: Story = {
  name: 'Chargement',
  args: { onSubscribe: () => new Promise(() => {}) },
  play: async ({ canvasElement }) => {
    await subscribe(canvasElement, 'claire@exemple.fr');
  },
};
export const ErrorState: Story = {
  name: 'Erreur',
  play: async ({ canvasElement }) => {
    const c = await subscribe(canvasElement, 'adresse-invalide');
    await expect(await c.findByText('Adresse e-mail invalide')).toBeInTheDocument();
  },
};
export const Success: Story = {
  name: 'Succès',
  play: async ({ canvasElement }) => {
    const c = await subscribe(canvasElement, 'claire@exemple.fr');
    await expect(await c.findByText('Merci, vous êtes inscrit')).toBeInTheDocument();
  },
};
export const ServerFailure: Story = {
  name: 'Échec serveur',
  args: { onSubscribe: () => Promise.reject(new Error('Serveur indisponible')) },
  play: async ({ canvasElement }) => {
    const c = await subscribe(canvasElement, 'claire@exemple.fr');
    await expect(await c.findByText('L’inscription n’a pas abouti. Réessayez.')).toBeInTheDocument();
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Footer } from './Footer';

const meta = {
  title: 'Navigation/Footer',
  component: Footer,
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

async function subscribe(canvasElement: HTMLElement, email: string) {
  const c = within(canvasElement);
  await userEvent.type(c.getByLabelText('Adresse e-mail'), email);
  await userEvent.click(c.getByRole('button', { name: 'S’inscrire' }));
  return c;
}

export const Default: Story = { name: 'Par défaut' };
export const CustomCopyright: Story = { name: 'Copyright personnalisé', args: { copyright: '© 2026 Avion · Tous droits réservés' } };
export const SignupError: Story = {
  name: 'Inscription : erreur',
  play: async ({ canvasElement }) => {
    const c = await subscribe(canvasElement, 'adresse-invalide');
    await expect(await c.findByText('Adresse e-mail invalide')).toBeInTheDocument();
  },
};
export const SignupLoading: Story = {
  name: 'Inscription : chargement',
  args: { onSubscribe: () => new Promise(() => {}) },
  play: async ({ canvasElement }) => {
    await subscribe(canvasElement, 'claire@exemple.fr');
  },
};
export const SignupSuccess: Story = {
  name: 'Inscription : succès',
  play: async ({ canvasElement }) => {
    const c = await subscribe(canvasElement, 'claire@exemple.fr');
    await expect(await c.findByText('Merci, vous êtes inscrit')).toBeInTheDocument();
  },
};
export const SignupFailure: Story = {
  name: 'Inscription : échec serveur',
  args: { onSubscribe: () => Promise.reject(new Error('Serveur indisponible')) },
  play: async ({ canvasElement }) => {
    const c = await subscribe(canvasElement, 'claire@exemple.fr');
    await expect(await c.findByText('L’inscription n’a pas abouti. Réessayez.')).toBeInTheDocument();
  },
};

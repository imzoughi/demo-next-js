import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AddressesForm } from './AddressesForm';
import { WithAccount } from './storyDecorators';

const meta = {
  title: 'Sections de page/Compte/AddressesForm',
  component: AddressesForm,
  tags: ['autodocs'],
  args: { onSaved: () => {} },
  decorators: [WithAccount],
} satisfies Meta<typeof AddressesForm>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Facturation identique à la livraison : seul le formulaire de livraison est affiché. */
export const Default: Story = {};

/** Décocher la case fait apparaître les champs de facturation. */
export const SeparateBilling: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('checkbox', { name: /identique/i }));
    await expect(canvas.getByText('Adresse de facturation')).toBeVisible();
  },
};

/** Facturation séparée, prénom et nom vidés : l'envoi affiche le résumé d'erreurs (affiché dès 2 erreurs). */
export const WithErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('checkbox', { name: /identique/i }));
    await userEvent.clear(canvas.getAllByLabelText(/^Prénom/)[1]);
    await userEvent.clear(canvas.getAllByLabelText(/^Nom/)[1]);
    await userEvent.click(canvas.getByRole('button', { name: /Enregistrer mes adresses/ }));
    await expect(await canvas.findByRole('alert')).toBeVisible();
  },
};

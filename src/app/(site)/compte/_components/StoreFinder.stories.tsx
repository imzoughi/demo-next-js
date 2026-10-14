import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { StoreFinder } from './StoreFinder';
import { WithAccount } from './storyDecorators';

// Page « Mon magasin » complète : recherche, carte, liste. Les tuiles de la carte viennent d'OpenStreetMap.
const meta = {
  title: 'Sections de page/Compte/StoreFinder',
  component: StoreFinder,
  tags: ['autodocs'],
  decorators: [WithAccount],
} satisfies Meta<typeof StoreFinder>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};

/** « Voir sur la carte » centre la carte, ouvre la bulle du magasin et l'annonce vocalement. */
export const ShowOnMap: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click((await canvas.findAllByRole('button', { name: /Voir sur la carte/ }))[0]);
    await expect(await canvas.findByText(/La carte est centrée sur/)).toBeInTheDocument();
    await waitFor(() => expect(canvasElement.querySelector('.leaflet-popup')).not.toBeNull(), { timeout: 5000 });
  },
};

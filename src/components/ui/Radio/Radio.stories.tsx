import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Pad } from '@/lib/story-helpers';
import { Radio } from './Radio';

const meta = {
  title: 'Formulaires/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: { label: 'Livraison standard', name: 'livraison', value: 'standard' },
  decorators: [Pad],
} satisfies Meta<typeof Radio>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'Par défaut' };
export const Selected: Story = { name: 'Sélectionné', args: { defaultChecked: true, hint: 'Gratuite, 3 à 5 jours ouvrés' } };
export const Disabled: Story = { name: 'Désactivé', args: { disabled: true } };
export const ErrorState: Story = { name: 'Erreur', args: { error: 'Choisissez un mode de livraison' } };
export const Group: Story = {
  name: 'Groupe',
  render: () => (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend className="h5">Mode de livraison</legend>
      <Radio name="mode" value="standard" label="Livraison standard" hint="Gratuite, 3 à 5 jours ouvrés" defaultChecked />
      <Radio name="mode" value="express" label="Livraison express" hint="15 €, le lendemain" />
    </fieldset>
  ),
};

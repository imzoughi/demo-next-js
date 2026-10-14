import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { stores } from '@/mocks/stores';
import { getStoreStatus } from '@/lib/storeHours';
import { StoreStatus } from './StoreStatus';

// Le composant reçoit déjà un statut calculé : les stories le calculent avec une date fixe (heure de Paris, mercredi
// 14 octobre 2026, CEST = UTC+2) au lieu de l'horloge réelle. Aucun changement dans le composant.
const [lyon, , , nantes] = stores;
const at = (iso: string) => new Date(iso);

const meta = {
  title: 'Sections de page/Compte/StoreStatus',
  component: StoreStatus,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ padding: 'var(--space-5)' }}><Story /></div>],
} satisfies Meta<typeof StoreStatus>;
export default meta;
type Story = StoryObj<typeof meta>;

/** Mercredi 12 h à Paris. */
export const Open: Story = { args: { status: getStoreStatus(lyon.openingHours, at('2026-10-14T10:00:00Z')) } };
/** Mercredi 8 h à Paris, avant l'ouverture de 10 h. */
export const ClosedBeforeOpening: Story = { args: { status: getStoreStatus(lyon.openingHours, at('2026-10-14T06:00:00Z')) } };
/** Lundi 12 h à Paris : Nantes ne reçoit pas le lundi, prochaine ouverture mardi. */
export const ClosedNoHoursToday: Story = { args: { status: getStoreStatus(nantes.openingHours, at('2026-10-12T10:00:00Z')) } };
/** Heure pas encore connue (rendu serveur) : la place reste réservée, rien n'est affiché. */
export const Pending: Story = { args: { status: null } };

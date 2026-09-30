import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { filterGroups, sortOptions } from '@/mocks/catalog';
import { FiltersSheet } from './FiltersSheet';

const meta = {
  title: 'Couches/FiltersSheet',
  component: FiltersSheet,
  tags: ['autodocs'],
  args: {
    open: true,
    static: true,
    groups: filterGroups,
    sortOptions,
    sort: 'nouveautes',
    resultCount: 42,
    selected: {},
    onClose: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '720px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FiltersSheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const WithSelection: Story = { args: { selected: { categorie: ['ceramiques'] }, resultCount: 24 } };
export const NoResult: Story = { args: { selected: { categorie: ['ceramiques'], matiere: ['chene'] }, resultCount: 0 } };

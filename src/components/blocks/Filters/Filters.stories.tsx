import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { filterGroups, sortOptions } from '@/mocks/catalog';
import { Filters } from './Filters';
import { FiltersDemo } from './FiltersDemo';

const meta = {
  title: 'Sections de page/Filters',
  component: Filters,
  tags: ['autodocs'],
  args: { groups: filterGroups, sortOptions, sort: 'nouveautes', resultCount: 42, selected: {} },
} satisfies Meta<typeof Filters>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ActiveFilters: Story = {
  render: () => <FiltersDemo />,
};

export const NoResult: Story = { args: { resultCount: 0, selected: { categorie: ['ceramiques'] } } };

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { filterGroups, sortOptions } from '@/mocks/catalog';
import { Filters } from './Filters';
import type { FilterSelection } from '../FiltersSheet/FiltersSheet';

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
  render: function Render(args) {
    const [selected, setSelected] = useState<FilterSelection>({ categorie: ['ceramiques'], matiere: ['gres'] });
    return <Filters {...args} selected={selected} onChange={setSelected} onClear={() => setSelected({})} resultCount={14} />;
  },
};

export const NoResult: Story = { args: { resultCount: 0, selected: { categorie: ['ceramiques'] } } };

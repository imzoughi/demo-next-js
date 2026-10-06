import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { PageHeader } from './PageHeader';

const meta = {
  title: 'Sections de page/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  args: { headingLevel: 3, title: 'Tous les produits', text: 'Du petit objet au grand mobilier, fabriqués avec soin.' },
} satisfies Meta<typeof PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {};
export const OnImage: Story = { args: { image: '/images/img-02.jpg' } };

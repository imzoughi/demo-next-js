import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { products } from '@/mocks/catalog';
import { ProductDetails } from './ProductDetails';

const [dandy] = products;

const meta = {
  title: 'Sections de page/ProductDetails',
  component: ProductDetails,
  tags: ['autodocs'],
  args: {
    // Titre rétrogradé : un seul H1 par fiche du portail.
    headingLevel: 3,
    product: dandy,
    breadcrumb: [{ label: 'Accueil', href: '/' }, { label: 'Chaises', href: '#' }, { label: dandy.name }],
  },
} satisfies Meta<typeof ProductDetails>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithFavorite: Story = { args: { onFavorite: () => {} } };
export const AddingToCart: Story = { args: { onAdd: () => new Promise(() => {}) } };
export const LimitedStock: Story = { args: { product: { ...dandy, max: 1 } } };
export const LongName: Story = { args: { product: products[4] } };

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { HeroBlocks } from './HeroBlocks';

const meta = {
  title: 'Sections de page/HeroBlocks',
  component: HeroBlocks,
  tags: ['autodocs'],
  args: {
    title: 'Du mobilier pensé pour durer',
    text: 'Découvrez plus de 400 pièces uniques, du petit objet au grand mobilier.',
    image: '/images/img-02.jpg',
    imageAlt: 'Salon lumineux avec fauteuil et table basse en chêne',
  },
} satisfies Meta<typeof HeroBlocks>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Dark: Story = {};
export const Card: Story = { args: { variant: 'card' } };
export const WithoutText: Story = { args: { text: undefined } };

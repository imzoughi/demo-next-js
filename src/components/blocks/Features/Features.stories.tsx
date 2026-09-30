import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Features } from './Features';

const meta = { title: 'Sections de page/Features', component: Features, tags: ['autodocs'] } satisfies Meta<typeof Features>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Plain: Story = { args: { filled: false } };
export const WithoutTitle: Story = { args: { title: false } };

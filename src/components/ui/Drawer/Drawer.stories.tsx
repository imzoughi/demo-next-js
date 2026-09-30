import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

const meta = {
  title: 'Couches/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  args: { open: true, static: true, title: 'Menu', onClose: () => {} },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '480px' }}>
        <Story />
      </div>
    ),
  ],
  render: (args) => (
    <Drawer {...args}>
      <p className="body-medium">Contenu du panneau.</p>
    </Drawer>
  ),
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Right: Story = {};
export const Left: Story = { args: { side: 'left' } };
export const Bottom: Story = { args: { side: 'bottom' } };
export const Sheet: Story = { args: { side: 'sheet', title: 'Filtres et tri' } };
export const WithFooter: Story = { args: { footer: <Button fullWidth>Appliquer</Button> } };
export const Busy: Story = { args: { busy: true } };
export const Closed: Story = { args: { open: false } };

/** Ouverture réelle : focus piégé, Échap, retour du focus au déclencheur. */
export const Interactive: Story = {
  args: { static: false, open: false },
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 'var(--space-5)' }}>
        <Button onClick={() => setOpen(true)}>Ouvrir le panneau</Button>
        <Drawer {...args} open={open} onClose={() => setOpen(false)}>
          <p className="body-medium">Contenu du panneau.</p>
        </Drawer>
      </div>
    );
  },
};

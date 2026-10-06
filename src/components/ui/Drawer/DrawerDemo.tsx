'use client';
// Exemple d’ouverture réelle du panneau (état local), utilisé par la story Interactive : le « use client » est ici
// pour que le fichier de stories reste importable par le catalogue de la documentation (composant serveur).
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ padding: 'var(--space-5)' }}>
      <Button onClick={() => setOpen(true)}>Ouvrir le panneau</Button>
      <Drawer title="Menu" open={open} onClose={() => setOpen(false)}>
        <p className="body-medium">Contenu du panneau.</p>
      </Drawer>
    </div>
  );
}

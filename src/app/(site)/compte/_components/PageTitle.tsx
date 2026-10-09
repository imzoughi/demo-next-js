import type { ReactNode } from 'react';
import styles from './compte.module.scss';

/** Titre de rubrique : le seul h1 de la page. Focalisable par programme (tabIndex -1) pour le focus après connexion ou déconnexion. */
export function PageTitle({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className={styles.head}>
      <h1 className="h1" tabIndex={-1}>
        {title}
      </h1>
      {children ? <p className="body-large">{children}</p> : null}
    </header>
  );
}

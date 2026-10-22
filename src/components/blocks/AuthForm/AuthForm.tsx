'use client';

// BANC D'ESSAI (phase 0) : implémentation retirée, à reconstruire par la boucle /decade-front:ds-component.
// Les props et les stories sont conservées : elles servent de cahier des charges et de tests.


type Mode = 'login' | 'register';
type Values = Record<string, string | boolean>;

export interface AuthFormProps {
  mode?: Mode;
  forgotHref?: string;
  className?: string;
  /** Rejette avec une Error pour afficher son message en haut du formulaire. */
  onSubmit?: (mode: Mode, values: Values) => Promise<unknown> | void;
  onForgot?: () => void;
}

/** Connexion et création de compte : validation à l'envoi, résumé d'erreurs, focus sur le premier champ en erreur. */
export function AuthForm({ mode = 'login', className }: AuthFormProps) {
  return (
    <div className={className} data-bench="a-reconstruire">
      <h2>{mode === 'login' ? 'Se connecter' : 'Créer un compte'}</h2>
    </div>
  );
}

'use client';

// Lien interne injectable. Le kit ne dépend pas de next/link : par défaut il rend un <a> (Storybook, portail, doc) ;
// le site fournit next/link via <LinkProvider> pour une navigation douce (l'état du panier survit entre les pages).
import { createContext, use, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { withBase } from '@/lib/paths';

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
/** Fonction de rendu d'un lien interne (et non un composant : elle est fournie par le contexte). */
export type RenderLink = (props: LinkProps) => ReactNode;

const defaultRender: RenderLink = ({ href, ...rest }) => <a href={withBase(href)} {...rest} />;

const LinkContext = createContext<RenderLink>(defaultRender);

/** Fournit le rendu de lien utilisé par tous les composants du kit sous ce nœud. */
export function LinkProvider({ render, children }: { render: RenderLink; children: ReactNode }) {
  return <LinkContext value={render}>{children}</LinkContext>;
}

/** Remplace `<a>` dans les composants : sans href, rend un <a> simple. */
export function AppLink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const render = use(LinkContext);
  if (href === undefined) return <a {...rest} />;
  return render({ href, ...rest });
}

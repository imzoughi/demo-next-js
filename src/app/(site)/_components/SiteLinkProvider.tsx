'use client';

// Branche next/link sur tous les liens du kit : navigation douce, basePath géré par Next.
import Link from 'next/link';
import type { ReactNode } from 'react';
import { LinkProvider, type RenderLink } from '@/components/ui/AppLink/AppLink';

const renderLink: RenderLink = (props) => <Link {...props} />;

export function SiteLinkProvider({ children }: { children: ReactNode }) {
  return <LinkProvider render={renderLink}>{children}</LinkProvider>;
}

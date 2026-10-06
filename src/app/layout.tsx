import type { Metadata } from 'next';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Avion — boutique démo',
  description: 'Maquettes Next.js de la boutique démo',
};

// suppressHydrationWarning : les extensions du navigateur (LanguageTool, QuillBot…) et le thème de la doc changent les attributs de <html>/<body> avant React.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}

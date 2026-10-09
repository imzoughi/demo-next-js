import type { Metadata } from 'next';
import { InformationsForms } from '../_components/InformationsForms';

export const metadata: Metadata = {
  title: 'Mes informations · Avion',
  description: 'Modifiez votre prénom, votre nom, votre adresse e-mail, votre téléphone et votre mot de passe.',
};

export default function InformationsPage() {
  return <InformationsForms />;
}

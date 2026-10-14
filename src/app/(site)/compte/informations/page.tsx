import type { Metadata } from 'next';
import { InformationsForms } from '../_components/InformationsForms';

export const metadata: Metadata = {
  title: 'Mes informations · Avion',
  description: 'Modifiez vos coordonnées, vos adresses de livraison et de facturation, et votre mot de passe.',
};

export default function InformationsPage() {
  return <InformationsForms />;
}

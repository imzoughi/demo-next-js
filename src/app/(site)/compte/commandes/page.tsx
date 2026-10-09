import type { Metadata } from 'next';
import { OrderList } from '@/components/blocks/OrderList/OrderList';
import { getAccount } from '@/lib/api';
import { orderHref, routes } from '@/mocks/site';
import { PageTitle } from '../_components/PageTitle';

export const metadata: Metadata = {
  title: 'Mes commandes · Avion',
  description: 'Retrouvez la liste de vos commandes et ouvrez la fiche de chacune pour suivre son avancement.',
};

export default async function CommandesPage() {
  const { orders } = await getAccount();
  return (
    <>
      <PageTitle title="Mes commandes">Ouvrez une commande pour voir son suivi, ses articles et son récapitulatif.</PageTitle>
      <OrderList orders={orders.map((o) => ({ ...o, href: orderHref(o.number) }))} collectionHref={routes.products} />
    </>
  );
}

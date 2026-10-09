import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/blocks/Breadcrumb/Breadcrumb';
import { getAccount, getOrder } from '@/lib/api';
import { routes } from '@/mocks/site';
import { OrderDetail } from '../../_components/OrderDetail';
import styles from '../../_components/compte.module.scss';

// Export statique : une page par commande des données, aucune autre adresse n'existe.
export const dynamicParams = false;

export async function generateStaticParams() {
  const { orders } = await getAccount();
  return orders.map((o) => ({ numero: o.number }));
}

export async function generateMetadata({ params }: PageProps<'/compte/commandes/[numero]'>): Promise<Metadata> {
  const { numero } = await params;
  return {
    title: `Commande N° ${numero} · Avion`,
    description: `Suivi, articles, adresse de livraison et récapitulatif de la commande N° ${numero}.`,
  };
}

export default async function CommandePage({ params }: PageProps<'/compte/commandes/[numero]'>) {
  const { numero } = await params;
  const order = await getOrder(numero);
  if (!order) notFound();
  return (
    <>
      <Breadcrumb
        className={styles.back}
        items={[
          { label: 'Mon compte', href: routes.account },
          { label: 'Mes commandes', href: routes.accountOrders },
          { label: `Commande N° ${order.number}` },
        ]}
      />
      <OrderDetail order={order} />
    </>
  );
}

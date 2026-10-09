'use client';

// Accueil de l'espace client : salutation, raccourcis (dernière commande, magasin favori, informations) et adresses en lecture seule.
import { TextLink } from '@/components/ui/TextLink/TextLink';
import { formatPrice } from '@/lib/format';
import { orderHref, routes } from '@/mocks/site';
import { useAccount } from './AccountProvider';
import { PageTitle } from './PageTitle';
import styles from './compte.module.scss';

export function AccountHome() {
  const { profile, orders, addresses, stores, favoriteStoreId } = useAccount();
  // Les commandes sont triées de la plus récente à la plus ancienne.
  const lastOrder = orders[0];
  const favorite = stores.find((s) => s.id === favoriteStoreId);
  return (
    <>
      <PageTitle title={`Bonjour ${profile.firstName}`}>Retrouvez vos commandes, votre magasin favori et vos informations.</PageTitle>
      <ul className={`${styles.cards} ${styles.cardsThree}`}>
        <li className={styles.card}>
          <h2 className="h4">Dernière commande</h2>
          {lastOrder ? (
            <>
              <p className="body-medium">{`N° ${lastOrder.number} · ${lastOrder.date}`}</p>
              <p className="body-medium">{`${lastOrder.status} · ${formatPrice(lastOrder.total)}`}</p>
              <div className={styles.cardAction}>
                <TextLink tone="brand" href={orderHref(lastOrder.number)} iconRight="chevron-right">
                  Voir la commande
                </TextLink>
              </div>
            </>
          ) : (
            <>
              <p className="body-medium">Vous n’avez pas encore passé de commande.</p>
              <div className={styles.cardAction}>
                <TextLink tone="brand" href={routes.products} iconRight="chevron-right">
                  Découvrir la collection
                </TextLink>
              </div>
            </>
          )}
        </li>
        <li className={styles.card}>
          <h2 className="h4">Magasin favori</h2>
          {favorite ? (
            <>
              <p className="body-medium">{favorite.name}</p>
              <p className="body-medium">{`${favorite.address}, ${favorite.postalCode} ${favorite.city}`}</p>
            </>
          ) : (
            <p className="body-medium">Vous n’avez pas encore choisi de magasin favori.</p>
          )}
          <div className={styles.cardAction}>
            <TextLink tone="brand" href={routes.accountStore} iconRight="chevron-right">
              {favorite ? 'Changer de magasin' : 'Choisir un magasin'}
            </TextLink>
          </div>
        </li>
        <li className={styles.card}>
          <h2 className="h4">Mes informations</h2>
          <p className="body-medium">{`${profile.firstName} ${profile.lastName}`}</p>
          <p className="body-medium">{profile.email}</p>
          <div className={styles.cardAction}>
            <TextLink tone="brand" href={routes.accountInfo} iconRight="chevron-right">
              Modifier mes informations
            </TextLink>
          </div>
        </li>
      </ul>

      <section className={styles.section} aria-labelledby="compte-adresses">
        <h2 className="h3" id="compte-adresses">
          Mes adresses
        </h2>
        <ul className={styles.cards}>
          {addresses.map((a) => (
            <li key={a.id} className={styles.card}>
              <h3 className="h5">{a.isDefault ? `${a.label} (par défaut)` : a.label}</h3>
              <address className="body-medium">
                {a.name}
                {a.lines.map((l) => (
                  <span key={l} className={styles.line}>
                    {l}
                  </span>
                ))}
              </address>
            </li>
          ))}
        </ul>
        <p className={`${styles.muted} body-small`}>Les adresses sont en lecture seule dans cette démo.</p>
      </section>
    </>
  );
}

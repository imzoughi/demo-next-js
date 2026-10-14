// Aides des stories de l'espace client : fournit la session simulée (AccountProvider) avec les mocks de démo.
import type { ComponentType, JSX } from 'react';
import { accountData } from '@/mocks/account';
import { stores } from '@/mocks/stores';
import { AccountProvider } from './AccountProvider';

export function WithAccount(Story: ComponentType): JSX.Element {
  return (
    <AccountProvider defaultProfile={accountData.profile} defaultAddressBook={accountData.addressBook} orders={accountData.orders} addresses={accountData.addresses} stores={stores}>
      <div style={{ padding: 'var(--space-5)', maxWidth: 'var(--container-max, 1200px)', margin: '0 auto' }}>
        <Story />
      </div>
    </AccountProvider>
  );
}

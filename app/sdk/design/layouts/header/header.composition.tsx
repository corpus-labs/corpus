import React from 'react';
import { WalletProvider } from '@corpus/features.wallet.provider';
import { Header } from './header';

export const DefaultHeader = () => {
  return (
    <WalletProvider>
      <Header />
    </WalletProvider>
  );
};

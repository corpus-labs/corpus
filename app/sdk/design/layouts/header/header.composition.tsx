import React from 'react';
import { WalletProvider } from '@corpus/utils.contexts.wallet';
import { Header } from './header';

export const BasicHeader = () => {
  return (
    <WalletProvider>
      <div className="bg-zinc-900 h-screen">
        <Header />
      </div>
    </WalletProvider>
  );
};

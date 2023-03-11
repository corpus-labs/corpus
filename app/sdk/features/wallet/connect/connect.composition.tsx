import React from 'react';
import { WalletProvider } from '@corpus/features.wallet.provider';
import { Connect } from './connect';

export const ConnectButton = () => {
  return (
    <WalletProvider>
      <div className="p-4 bg-zinc-800">
        <Connect />
      </div>
    </WalletProvider>
  );
};

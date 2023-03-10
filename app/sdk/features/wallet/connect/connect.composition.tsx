import React from 'react';
import {WalletProvider} from '@corpus/utils.contexts.wallet';
import { Connect } from './connect';

export const BasicConnect = () => {
  return (
    <WalletProvider>
      <div className="p-4">
        <Connect />
      </div>
    </WalletProvider>
  );
};

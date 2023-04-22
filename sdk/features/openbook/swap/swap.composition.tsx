import React, { useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@openbook-dex/openbook';
import '@openbook-dex/tokens';
import { WalletProvider } from '@corpus/features.wallet.provider';
import { Shell } from '@corpus/design.layouts.shell';
import { OpenbookSwap } from './swap';

export const BasicSwap = () => {
  const connection = new Connection(
    'https://serene-fabled-pallet.solana-mainnet.discover.quiknode.pro/33bbe6f54900b7a54d92a67100e01289f457c997/'
  );
  const [market, setMarket] = useState<Market>();

  useEffect(() => {
    const getMarket = async () => {
      setMarket(
        await Market.load(
          connection,
          new PublicKey('8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6'), // SOL/USDC
          undefined,
          new PublicKey('srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX')
        )
      );
    };

    if (!market) {
      getMarket();
    }
  }, [market]);

  return (
    <WalletProvider>
      <Shell>
        <OpenbookSwap market={market} />
      </Shell>
    </WalletProvider>
  );
};

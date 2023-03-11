import React, { ReactNode } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider as WalletAdapterProvider,
} from '@solana/wallet-adapter-react';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

export type WalletProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function WalletProvider({ children }: WalletProps) {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint =
    'https://serene-fabled-pallet.solana-mainnet.discover.quiknode.pro/33bbe6f54900b7a54d92a67100e01289f457c997/';

  const wallets = React.useMemo(
    () => [new PhantomWalletAdapter()],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletAdapterProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletAdapterProvider>
    </ConnectionProvider>
  );
}

import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  WalletModalButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
// This function detects most providers injected at window.ethereum
// import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';

import './styles.css';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export type ConnectProps = {
  /**
   * a node to be rendered in the special component.
   */
  buttonText?: string;
};

export function Connect({ buttonText }: ConnectProps) {
  // const [ethereum, setEthereum] = useState<any>(null);
  const { publicKey, wallet, connecting, disconnect } = useWallet();
  <div></div>;
  return wallet ? <WalletDisconnectButton /> : <WalletModalButton />;
}

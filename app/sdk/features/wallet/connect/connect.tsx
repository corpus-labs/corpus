import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  WalletModalButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui';
import clsx from 'clsx';

import './styles.css';

const buttonStyles = clsx('bg-white', 'hover:bg-gray-100');

export type ConnectProps = {
  /**
   * a node to be rendered in the special component.
   */
  buttonText?: string;
};

export function WalletConnect({ buttonText }: ConnectProps) {
  // const [ethereum, setEthereum] = useState<any>(null);
  const { wallet } = useWallet();

  return wallet ? <WalletDisconnectButton className={buttonStyles} /> : <WalletModalButton className={buttonStyles} />;
}

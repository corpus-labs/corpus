import React, { useEffect, useState } from 'react';
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';

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
  const [ethereum, setEthereum] = useState<any>(null);
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== currentAccount) {
      setCurrentAccount(accounts[0]);
      // Do any other work!
    }
  };

  const handleConnect = async () => {
    await ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleAccountsChanged)
      .catch((err) => {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });
  };

  const handleDisconnect = async () => {
    await ethereum
      .request({
        method: 'eth_requestAccounts',
        params: [{ eth_accounts: {} }],
      })
      .then(() => {
        setCurrentAccount(null);
      });
  };

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider();

      // If the provider returned by detectEthereumProvider is not the same as
      // window.ethereum, something is overwriting it, perhaps another wallet.
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      } else {
        setEthereum(provider);
      }
    };

    if (!ethereum) {
      getProvider();
    }
  }, [ethereum]);

  console.log(currentAccount);

  return (
    <button
      type="button"
      onClick={currentAccount ? handleDisconnect : handleConnect}
      className="bg-slate-100 px-4 p-2 font-semibold rounded-lg text-sm overflow-hidden overflow-ellipsis ml-auto mr-4"
      data-testid="connect"
    >
      {currentAccount ? 'Disconnect' : buttonText ?? 'Connect Wallet'}
    </button>
  );
}

import React, { useState } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { Market } from '@openbook-dex/openbook';
import { WalletConnect } from '@corpus/features.wallet.connect';
import { Transaction } from '@solana/web3.js';
import { MoreIcon } from '@corpus/design.icons.more';
import { SwapIcon } from '@corpus/design.icons.swap';
import clsx from 'clsx';

import * as styles from './styles';

export type SwapProps = {
  /**
   * a node to be rendered in the special component.
   */
  market: Market;
};

export function OpenbookSwap({ market }: SwapProps) {
  const { publicKey, sendTransaction } = useWallet();
  const [side, setSide] = useState<'buy' | 'sell'>('sell');
  const { connection } = useConnection();

  const handleSwap = async () => {
    // Get accounts
    const [baseAccount] = await market.findBaseTokenAccountsForOwner(
      connection,
      publicKey,
      true
    );

    const [quoteAccount] = await market.findQuoteTokenAccountsForOwner(
      connection,
      publicKey,
      true
    );

    const openOrders = await market.findOpenOrdersAccountsForOwner(
      connection,
      publicKey
    );

    // Build transaction
    const transaction = new Transaction();

    const placeOrder = await market.makePlaceOrderTransaction(connection, {
      owner: publicKey,
      side: side,
      price: 20,
      size: 0.1,
      orderType: 'ioc',
      payer: side === 'buy' ? quoteAccount?.pubkey : baseAccount?.pubkey,
    });

    const settleOrder = await market.makeSettleFundsTransaction(
      connection,
      openOrders[0],
      baseAccount.pubkey,
      quoteAccount.pubkey
      // refAddress ? new PublicKey(refAddress) : undefined
    );

    transaction.add(placeOrder.transaction, settleOrder.transaction);

    // Send transaction
    try {
      await sendTransaction(transaction, connection, {
        signers: [...placeOrder.signers, ...settleOrder.signers],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return publicKey ? (
    <form className="hidden md:flex flex-col h-full w-1/4 min-w-[300px] border-r border-zinc-800" data-testid="swap-form">
      <div className="flex items-center justify-between px-4 w-full border-b border-zinc-800 h-[80px]">
        <div className="flex flex-col justify-center">
          <span className="text-gray-400 text-sm">Swap</span>
          <span className="text-white">Openbook</span>
        </div>
        <MoreIcon
          width={24}
          className="text-gray-400 hover:text-white cursor-pointer"
        />
      </div>
      <div className="flex-1">
        <div className={styles.swapGroup}>
          <div className={clsx(styles.swapInput, 'pb-8')}>
            <label className={styles.label}>You're paying</label>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="0" className={styles.textInput} />
              <div className={styles.coinInput}>
                <img
                  src="https://assets.coingecko.com/coins/images/4128/small/solana.png?1640133422"
                  className="h-5 rounded-full"
                />
                SOL
                <svg
                  height={14}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="text-gray-400 ml-auto"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="M112 184l144 144 144-144"
                  />
                </svg>
              </div>
            </div>
          </div>
          <SwapIcon className={styles.swapIcon} />
          <div className={styles.swapInput}>
            <label className={styles.label}>To recieve</label>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="0" className={styles.textInput} />
              <div className={styles.coinInput}>
                <img
                  src="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png?1547042389"
                  className="h-5"
                />
                USDC
                <svg
                  height={14}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="text-gray-400 ml-auto"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="48"
                    d="M112 184l144 144 144-144"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className={clsx('flex', 'flex-col', 'gap-4', 'p-4', 'text-sm')}>
          <div className={clsx('flex', 'justify-between', 'items-center')}>
            <div className={styles.label}>Rate</div>-
          </div>
          <div className={clsx('flex', 'justify-between', 'items-center')}>
            <div className={styles.label}>Price Impact</div>-
          </div>
          <div className={clsx('flex', 'justify-between', 'items-center')}>
            <div className={styles.label}>Platform Fee</div>-
          </div>
        </div>
      </div>
      <div className="w-full border-t border-zinc-800 p-4">
        <button
          onClick={handleSwap}
          className="w-full text-center justify-center flex items-center bg-white hover:bg-gray-100 rounded-lg text-zinc-900 font-bold px-6 py-3 whitespace-nowrap bg-gradient-to-r from-[#00DBDE] to-[#B721FF]"
        >
          Swap
        </button>
      </div>
    </form>
  ) : (
    <WalletConnect />
  );
}

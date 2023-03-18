import React, { useEffect, VFC, useState } from 'react'
import { Connection } from '@solana/web3.js'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { OpenOrders } from './OpenOrders'
import { TradeHistory } from './TradeHistory'
import clsx from 'clsx'

export const ManageTrades: VFC = () => {
  const [activeTab, setActiveTab] = useState<string>('openOrders')

  const tabStyles = clsx(
    'inline-flex items-center justify-center text-zinc-400 px-1 h-10',
    {}
  )
  return (
    <section className="w-full">
      <div className="flex items-start text-sm w-full border-b border-zinc-800 space-x-5 px-4 font-medium h-10">
        <div
          className={clsx(
            'inline-flex items-center justify-center px-1 h-10 cursor-pointer',
            {
              'border-b-2 border-white text-white': activeTab === 'openOrders',
              'text-zinc-400': activeTab !== 'openOrders',
            }
          )}
          onClick={() => setActiveTab('openOrders')}
        >
          Open Orders
        </div>
        <div
          className={clsx(
            'inline-flex items-center justify-center px-1 h-10 cursor-pointer',
            {
              'border-b-2 border-white text-white':
                activeTab === 'tradeHistory',
              'text-zinc-400': activeTab !== 'tradeHistory',
            }
          )}
          onClick={() => setActiveTab('tradeHistory')}
        >
          Trade History
        </div>
      </div>

      <div className="flex px-4 py-2">
        {/* {activeTab === 'openOrders' && <OpenOrders />} */}
        {activeTab === 'tradeHistory' && <TradeHistory />}
      </div>
    </section>
  )
}

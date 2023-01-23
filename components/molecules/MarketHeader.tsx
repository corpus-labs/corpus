// Modified version of @solana/wallet-adapter-react-ui/WalletMultiButton:
// Calls new onDisconnect function to close dropdown menu on disconnect

import React, { VFC } from 'react'
import { StarIcon, InformationCircleIcon } from '@heroicons/react/outline'
import clsx from 'clsx'
import { useMarketContext } from '../../contexts/market'

export const MarketHeader: VFC = () => {
  const { ohlcv, currentPrice }: any = useMarketContext()

  const currentPriceFormatter = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })

  const volume =
    ohlcv?.v.reduce((partialSum: number, a: number) => partialSum + a, 0) *
    currentPrice

  return (
    <div
      className={clsx(
        'flex',
        'items-center',
        'w-full',
        'h-16',
        'p-4',
        'border-b',
        'border-zinc-800'
      )}
    >
      <StarIcon className={clsx('w-6', 'h-6', 'mr-2', 'text-zinc-400')} />
      <div className={clsx('flex', 'items-center', 'mr-2')}>
        <img
          className={clsx(
            'w-[28px] h-[28px] rounded-full border-2 border-zinc-800 bg-zinc-800 ml-2 mr-2'
          )}
          src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
          alt="Solana"
        />
        SOL/USDC
      </div>
      <div className={clsx('flex', 'flex-col', 'ml-4')}>
        <div className={clsx('text-xs', 'text-gray-400')}>Protocol</div>
        <div className={clsx('text-sm', 'font-medium')}>Openbook</div>
      </div>
      <div className={clsx('flex', 'flex-col', 'ml-8')}>
        <div className={clsx('text-xs', 'text-gray-400')}>Price</div>
        <div className={clsx('text-emerald-500', 'text-sm', 'font-semibold')}>
          {ohlcv ? currentPriceFormatter.format(currentPrice) : '--'}
        </div>
      </div>
      <div className={clsx('flex', 'flex-col', 'ml-8')}>
        <div className={clsx('text-xs', 'text-gray-400')}>Volume (24h)</div>
        <div className={clsx('text-sm', 'font-medium')}>
          {ohlcv ? currentPriceFormatter.format(volume) : '--'}
        </div>
      </div>
      <InformationCircleIcon className="ml-auto w-6 h-6 text-gray-400" />
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useMarketContext } from '../../contexts/market'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import clsx from 'clsx'

export const TradeHistory: React.VFC = () => {
  const { market } = useMarketContext()
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [fills, setFills] = useState<any>(null)

  const getFills = async () => {
    if (market && publicKey) {
      const fills = await market.loadFills(connection, 10000)
      const openOrdersAccounts = await market.findOpenOrdersAccountsForOwner(
        connection,
        publicKey
      )
      setFills(
        fills.filter((fill) =>
          openOrdersAccounts.some((openOrdersAccount) =>
            fill.openOrders.equals(openOrdersAccount.publicKey)
          )
        )
      )
    }
  }

  useEffect(() => {
    if (!fills) {
      getFills()
    }
  }, [getFills, fills])

  return (
    <div className={clsx()}>
      {fills?.map((order) => {
        return (
          <div className={clsx('flex')}>
            SOL/USDC {order.side} {order.size} {order.price}{' '}
          </div>
        )
      })}
    </div>
  )
}

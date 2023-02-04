import { useEffect, useState } from 'react'
import { useMarketContext } from '../../contexts/market'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Order } from '@openbook-dex/openbook/lib/market'
import clsx from 'clsx'
import { Transaction } from '@solana/web3.js'

export const OpenOrders: React.VFC = () => {
  const { market } = useMarketContext()
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [openOrders, setOpenOrders] = useState<Order[] | null>(null)

  const getOpenOrders = async () => {
    if (market) {
      const orders = await market.loadOrdersForOwner(
        connection,
        publicKey,
        30000
      )
      const fills = await market.loadFills(connection, 10000)
      const openOrdersAccounts = await market.findOpenOrdersAccountsForOwner(
        connection,
        publicKey
      )
      setOpenOrders(orders)
    }
  }

  useEffect(() => {
    if (!openOrders) {
      getOpenOrders()
    }
  }, [getOpenOrders, openOrders])

  return (
    <div className={clsx('flex flex-col w-full')}>
      {openOrders?.map((order) => {
        const handleCancel = async () => {
          const { blockhash, lastValidBlockHeight } =
            await connection.getLatestBlockhash()

          const transaction = new Transaction({
            blockhash,
            lastValidBlockHeight,
            feePayer: publicKey,
          })

          const instruction = await market.makeCancelOrderInstruction(
            connection,
            publicKey,
            order
          )

          transaction.add(instruction)

          await sendTransaction(transaction, connection)
        }
        return (
          <div
            className={clsx(
              'flex space-x-8 w-full text-sm border-b border-zinc-800 py-4'
            )}
          >
            <div>SOL/USDC</div>
            <div
              className={clsx('uppercase', {
                'text-red-500': order.side === 'sell',
                'text-emerald-500': order.side === 'buy',
              })}
            >
              {order.side}
            </div>
            <div>{order.size}</div>
            <div>{order.price}</div>
            <button
              type="button"
              style={{ marginLeft: 'auto' }}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        )
      })}
    </div>
  )
}

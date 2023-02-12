import { useEffect, useState, useCallback } from 'react'
import { useMarketContext } from '../../contexts/market'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Order, OpenOrders } from '@openbook-dex/openbook/lib/market'
import { getTokenAccounts } from '../../utils/getTokenAccounts'
import clsx from 'clsx'
import { PublicKey } from '@solana/web3.js'

interface TokenAccountBalance {
  baseTokenFree: number
  baseTokenTotal: number
  quoteTokenFree: number
  quoteTokenTotal: number
}

export const Balances: React.FC = () => {
  const { market, usdcRefAddress } = useMarketContext()
  const { publicKey, sendTransaction } = useWallet()
  const wallet = useWallet()
  const { connection } = useConnection()
  const [balances, setBalances] = useState<TokenAccountBalance[] | undefined>()
  const [openOrders, setOpenOrders] = useState<OpenOrders[] | undefined>()
  const [baseTokenAccount, setBaseTokenAccount] = useState<
    PublicKey | undefined
  >()
  const [quoteTokenAccount, setQuoteTokenAccount] = useState<
    PublicKey | undefined
  >()
  console.log(usdcRefAddress)
  const getBalance = useCallback(
    async ({
      address,
      baseTokenFree,
      baseTokenTotal,
      quoteTokenFree,
      quoteTokenTotal,
    }: OpenOrders) => {
      return {
        address,
        baseTokenFree: await market.baseSplSizeToNumber(baseTokenFree),
        baseTokenTotal: await market.baseSplSizeToNumber(baseTokenTotal),
        quoteTokenFree: await market.baseSplSizeToNumber(quoteTokenFree),
        quoteTokenTotal: await market.baseSplSizeToNumber(quoteTokenTotal),
      }
    },
    [market]
  )

  const getBalances = useCallback(async () => {
    if (market && publicKey) {
      const openOrdersAccounts = await market.findOpenOrdersAccountsForOwner(
        connection,
        publicKey
      )
      setOpenOrders(openOrdersAccounts)

      const baseTokenAccounts = await market.findBaseTokenAccountsForOwner(
        connection,
        publicKey,
        true
      )
      setBaseTokenAccount(baseTokenAccounts[0].pubkey)

      const quoteTokenAccounts = await market.findQuoteTokenAccountsForOwner(
        connection,
        publicKey
      )
      setQuoteTokenAccount(quoteTokenAccounts[0].pubkey)

      const balances = await Promise.all(
        openOrdersAccounts.map(
          async (account: OpenOrders) => await getBalance(account)
        )
      )
      setBalances(balances)
    }
  }, [connection, getBalance, market, publicKey])

  useEffect(() => {
    if (!balances) {
      getBalances()
    }
  }, [connection, market, balances, publicKey, getBalances])

  return (
    <div className={clsx('flex flex-col w-full')}>
      {openOrders &&
        balances?.map((row, i) => {
          const settleBalance = async () => {
            const { transaction, signers } =
              await market.makeSettleFundsTransaction(
                connection,
                openOrders[i],
                baseTokenAccount,
                quoteTokenAccount,
                usdcRefAddress ? new PublicKey(usdcRefAddress) : undefined
              )

            // Send transaction
            try {
              await sendTransaction(transaction, connection, {
                signers,
              })
            } catch (err) {
              console.log(err)
            }
          }

          return (
            <div className="flex" key={'balance' + i}>
              {row.baseTokenFree}
              <button onClick={settleBalance}>Settle</button>
            </div>
          )
        })}
      {process.env.NEXT_PUBLIC_ANALYTICS_ID}
    </div>
  )
}

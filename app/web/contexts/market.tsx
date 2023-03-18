import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Market, Orderbook } from '@openbook-dex/openbook'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useAccountsContext } from './accounts'
import { useInterval } from '../hooks/useInterval'
import { getAssociatedTokenAccount } from '../utils/getAssociatedTokenAccount'
import ChartApi from '../utils/chartDataConnector'
import { PublicKey, Transaction } from '@solana/web3.js'
import getConfig from 'next/config'

export interface MarketContextState {
  ohlcv: {}
  currentPrice: number
  market: Market
  refAddress?: string
  placeOrder(side: string, size: number, price: number, orderType: string): void
}

const MarketContext = createContext<MarketContextState | null>(null)

export const MarketProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const { publicRuntimeConfig } = getConfig()
  const { connection } = useConnection()
  const wallet = useWallet()
  // const { getAccount } = useAccountsContext()
  const [ohlcv, setOhlcv] = useState<any>(null)
  const [market, setMarket] = useState<any>(null)

  console.log(market)

  // Hard-coding SOL/USDC values for now,
  // make dynamic later
  const getMarket = async () => {
    const market = await Market.load(
      connection,
      new PublicKey('8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6'),
      undefined,
      new PublicKey('srmqPvymJeFKQ4zGQed1GFppgkRHL9kaELCbyksJtPX')
    )
    setMarket(market)
  }

  const placeOrder = async (
    side: string,
    price: number,
    size: number,
    orderType: string
  ) => {
    if (!wallet.publicKey) {
      return
    }

    const [quoteToken] = await market.findQuoteTokenAccountsForOwner(
      connection,
      wallet.publicKey
    )

    // Create order
    const order = await market.makePlaceOrderTransaction(connection, {
      owner: wallet.publicKey,
      payer: side === 'buy' ? quoteToken?.pubkey : quoteToken?.account.owner,
      side,
      price,
      size,
      orderType, // 'limit', 'ioc', 'postOnly',
    })

    // Build transaction
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash()

    const transaction = new Transaction({
      blockhash,
      lastValidBlockHeight,
      feePayer: wallet.publicKey,
    })

    transaction.add(order.transaction)

    // Send transaction
    try {
      await wallet.sendTransaction(transaction, connection, {
        signers: order.signers,
      })
    } catch (err) {
      console.log(err)
    }
  }

  const fetchOhlcv = useCallback(async () => {
    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 1)

    // calculate from and to date (0:00UTC to 23:59:59UTC)
    const from = yesterday.getTime() / 1000
    const to = today.getTime() / 1000

    const ohlcv = await ChartApi.getOhlcv('SOL/USDC', '60', from, to)

    if (ohlcv) {
      setOhlcv(ohlcv)
    }
  }, [])

  useInterval(async () => {
    fetchOhlcv()
  }, 5000)

  useEffect(() => {
    fetchOhlcv()
    getMarket()
  }, [])

  return (
    <MarketContext.Provider
      value={{
        ohlcv,
        currentPrice: ohlcv?.c[ohlcv.c.length - 1],
        market,
        placeOrder,
        refAddress: publicRuntimeConfig.USDC_REF_ADDRESS ?? undefined,
      }}
    >
      {children}
    </MarketContext.Provider>
  )
}

export const useMarketContext = () => {
  const context = useContext(MarketContext)
  return context as MarketContextState
}

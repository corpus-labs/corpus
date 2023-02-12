import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Market } from '@openbook-dex/openbook'
import { useConnection } from '@solana/wallet-adapter-react'
import { useInterval } from '../hooks/useInterval'
import ChartApi from '../utils/chartDataConnector'
import { PublicKey } from '@solana/web3.js'
import getConfig from 'next/config'

const MarketContext = createContext({
  ohlcv: {},
  currentPrice: 0,
  market: null as any,
  usdcRefAddress: undefined as string | undefined,
})

export const MarketProvider: FC = ({ children }) => {
  const { publicRuntimeConfig } = getConfig()
  const { connection } = useConnection()
  const [ohlcv, setOhlcv] = useState<any>(null)
  const [market, setMarket] = useState<any>(null)

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
        usdcRefAddress: publicRuntimeConfig.USDC_REF_ADDRESS,
      }}
    >
      {children}
    </MarketContext.Provider>
  )
}

export const useMarketContext = () => {
  return useContext(MarketContext)
}

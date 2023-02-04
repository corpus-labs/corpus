import React, { VFC, useCallback, useState, useEffect } from 'react'
import clsx from 'clsx'
import ChartApi from '../../utils/chartDataConnector'
import { useInterval } from '../../hooks/useInterval'

interface RecentTradesProps {
  marketAddress: string
}

export const RecentTrades: VFC<RecentTradesProps> = ({ marketAddress }) => {
  const [trades, setTrades] = useState<any>([])

  const fetchTradesForChart = useCallback(async () => {
    const newTrades = await ChartApi.getRecentTrades(marketAddress)
    setTrades(newTrades)
  }, [marketAddress, trades])

  useEffect(() => {
    fetchTradesForChart()
  }, [])

  useInterval(async () => {
    fetchTradesForChart()
  }, 5000)

  return (
    <div className="flex flex-col w-1/4">
      <div
        className={clsx(
          'flex',
          'items-center',
          'p-4',
          'h-10',
          'border-b',
          'text-sm',
          'font-medium',
          'border-zinc-800'
        )}
      >
        Recent Trades
      </div>
      <div className="flex items-center justify-between text-gray-400 text-xs h-10 p-4 border-b border-zinc-800">
        <div>Price (USDC)</div>
        <div className="flex justify-between w-1/2">
          <div>Qty (SOL)</div>
          <div>Time</div>
        </div>
      </div>
      <div className="flex flex-col space-y-1 text-[13px] font-light max-h-64 overflow-auto">
        {trades?.map((trade, i) => {
          const highlighted = Math.abs(i % 2) === 0

          return (
            <div
              className={clsx('flex justify-between px-4 py-1', {
                'bg-zinc-800 bg-opacity-30': highlighted,
              })}
              key={'trade-' + i}
            >
              <div
                className={
                  trade.side === 'buy' ? 'text-emerald-500' : 'text-red-400'
                }
              >
                {trade.price.toFixed(2)}
              </div>
              <div className="flex justify-between text-gray-400 w-1/2">
                <div className="w-[50px] text-left">
                  {trade.size.toFixed(3)}
                </div>
                <div>{new Date(trade.time).toLocaleTimeString()}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

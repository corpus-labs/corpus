import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import Head from 'next/head'
import { Header } from '../components/organisms/Header'
import { MarketHeader } from '../components/molecules/MarketHeader'
import { RecentTrades } from '../components/molecules/RecentTrades'
import { PositionForm } from '../components/organisms/PositionForm'
import { ManageTrades } from '../components/organisms/ManageTrades'

const TradingView = dynamic(() => import('../components/atoms/TradingView'), {
  ssr: false,
})

const Home: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white font-sans">
      <Head>
        <title>Corpus</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Header />
      <div className="flex">
        <main className="flex flex-col flex-1 border-r border-zinc-800">
          <MarketHeader />
          <div className={clsx('w-full')}>
            <TradingView />
          </div>
        </main>
        <PositionForm />
      </div>
      <div className="flex">
        <div className="w-3/4 border-r border-zinc-800">
          <ManageTrades />
        </div>
        <RecentTrades
          marketAddress={'8BnEgHoWFysVcuFFX7QztDmzuH8r5ZFvyP3sYwn1XTh6'}
        />
      </div>
    </div>
  )
}

export default Home

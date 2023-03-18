import type { NextPage } from 'next'
import Head from 'next/head'
import { Header } from '../components/organisms/Header'

const Trade: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-900 text-white font-sans">
      <Head>
        <title>Corpus</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <Header />
      <div className="flex">
        <main className="flex flex-col flex-1 border-r border-zinc-800">
          Trade
        </main>
      </div>
      <div className="flex"></div>
    </div>
  )
}

export default Trade

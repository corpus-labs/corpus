import { ReactNode, FC } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
// import { CorpusProvider } from '../contexts/corpus'
import { MarketProvider } from '../contexts/market'
import { Wallet } from '@project-serum/anchor'

require('../styles/globals.css')
require('../styles/wallet-adapter.css')

const WalletProvider = dynamic<{ children: ReactNode }>(
  () =>
    import('@corpus/features.wallet.provider').then(
      ({ WalletProvider }) => WalletProvider
    ),
  {
    ssr: true,
  }
)

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WalletProvider>
      <MarketProvider>
        <Component {...pageProps} />
      </MarketProvider>
    </WalletProvider>
  )
}

export default App

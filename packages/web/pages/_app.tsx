import { ReactNode, FC } from 'react'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
// import { CorpusProvider } from '../contexts/corpus'
import { MarketProvider } from '../contexts/market'

require('../styles/globals.css')
require('../styles/wallet-adapter.css')

const WalletConnectionProvider = dynamic<{ children: ReactNode }>(
  () =>
    import('../contexts/wallet').then(
      ({ WalletConnectionProvider }) => WalletConnectionProvider
    ),
  {
    ssr: false,
  }
)

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <WalletConnectionProvider>
      <WalletModalProvider>
        <MarketProvider>
          <Component {...pageProps} />
        </MarketProvider>
      </WalletModalProvider>
    </WalletConnectionProvider>
  )
}

export default App

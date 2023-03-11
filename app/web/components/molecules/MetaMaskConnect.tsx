// Modified version of @solana/wallet-adapter-react-ui/WalletMultiButton:
// Calls new onDisconnect function to close dropdown menu on disconnect

import React, {
  VFC,
  // useCallback,
  // useEffect,
  // useMemo,
  // useRef,
  useState,
} from 'react'
import { Button, ButtonProps } from '@solana/wallet-adapter-react-ui/src/Button'
//  @ts-ignore-line
// import '@corpus-labs/snap/dist/bundle.js'

interface Window {
  ethereum: any
  location: any
}

declare let window: Window

export const MetaMaskConnect: VFC<ButtonProps> = ({ ...props }) => {
  const [keypair, setKeypair] = useState(null)
  const snapId = `local:${window.location.href}`
  const ethereum = (window as any).ethereum

  console.log('eth', ethereum)
  const connect = async () => {
    //@ts-ignore-line
    await ethereum.request({
      method: 'wallet_enable',
    })
  }

  return (
    <Button onClick={connect} {...props}>
      Connect Wallet
    </Button>
  )
}

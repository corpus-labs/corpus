// Modified version of @solana/wallet-adapter-react-ui/WalletMultiButton:
// Calls new onDisconnect function to close dropdown menu on disconnect

import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import {
  WalletIcon,
  useWalletModal,
  WalletConnectButton,
  WalletModalButton,
} from '@solana/wallet-adapter-react-ui'
// import { Button, ButtonProps } from '@solana/wallet-adapter-react-ui/src/Button'
import dynamic from 'next/dynamic'

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletConnectButton,
  { ssr: false }
)

export const WalletButton: FC<ButtonProps> = ({ children, ...props }) => {
  const { publicKey, wallet, disconnect } = useWallet()
  const { setVisible } = useWalletModal()
  const [copied, setCopied] = useState(false)
  const [active, setActive] = useState(false)
  const ref = useRef<HTMLUListElement>(null)

  const base58 = useMemo(() => publicKey?.toBase58(), [publicKey])

  const content = useMemo(() => {
    if (children) return children
    if (!wallet || !base58) return null
    return base58.slice(0, 4) + '..' + base58.slice(-4)
  }, [children, wallet, base58])

  const copyAddress = useCallback(async () => {
    if (base58) {
      await navigator.clipboard.writeText(base58)
      setCopied(true)
      setTimeout(() => setCopied(false), 400)
    }
  }, [base58])

  const openDropdown = useCallback(() => setActive(true), [setActive])

  const closeDropdown = useCallback(() => setActive(false), [setActive])

  const openModal = useCallback(() => {
    setVisible(true)
    closeDropdown()
  }, [setVisible, closeDropdown])

  const onDisconnect = useCallback(() => {
    closeDropdown()
    disconnect()
  }, [closeDropdown, disconnect])

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const node = ref.current

      // Do nothing if clicking dropdown or its descendants
      if (!node || node.contains(event.target as Node)) return

      closeDropdown()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, closeDropdown])

  if (!wallet)
    return <WalletModalButton {...props}>{children}</WalletModalButton>
  if (!base58)
    return <WalletConnectButton {...props}>{children}</WalletConnectButton>

  return (
    <div className="wallet-adapter-dropdown">
      {/* <Button
        aria-expanded={active}
        className="wallet-adapter-button-trigger"
        style={{ pointerEvents: active ? 'none' : 'auto', ...props.style }}
        onClick={openDropdown}
        startIcon={<WalletIcon wallet={wallet} />}
        {...props}
      >
        {content}
      </Button> */}
      <WalletConnectButton />
      <ul
        aria-label="dropdown-list"
        className={`wallet-adapter-dropdown-list border overflow-hidden text-center border-zinc-800 ${
          active && 'wallet-adapter-dropdown-list-active'
        }`}
        ref={ref}
        role="menu"
      >
        <li
          onClick={copyAddress}
          className="px-4 py-2 text-sm bg-zinc-900 hover:bg-zinc-800 whitespace-nowrap cursor-pointer border-b border-zinc-800"
          role="menuitem"
        >
          {copied ? 'Copied' : 'Copy address'}
        </li>
        <li
          onClick={openModal}
          className="px-4 py-2 text-sm bg-zinc-900 hover:bg-zinc-800 whitespace-nowrap cursor-pointer border-b border-zinc-800"
          role="menuitem"
        >
          Connect a different wallet
        </li>
        <li
          onClick={onDisconnect}
          className="px-4 py-2 text-sm bg-zinc-900 hover:bg-zinc-800 whitespace-nowrap cursor-pointer"
          role="menuitem"
        >
          Disconnect
        </li>
      </ul>
    </div>
  )
}

import Link from 'next/link'
import { useRouter } from 'next/router'
import { WalletConnect } from '@corpus/features.wallet.connect'
import {
  WalletModalButton,
  WalletDisconnectButton,
} from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
// import { MetaMaskConnect } from '../molecules/MetaMaskConnect'
import clsx from 'clsx'

const buttonStyles =
  'flex items-center ml-auto bg-white hover:bg-gray-100 rounded-lg text-zinc-900 text-sm font-medium mr-4 px-4 py-2 whitespace-nowrap'
export interface HeaderProps {}

export const Header: React.VFC<HeaderProps> = (props) => {
  const { pathname } = useRouter()
  const { wallet } = useWallet()
  return (
    <header
      className={clsx(
        'w-full',
        'bg-zinc-900',
        'border-b',
        'border-zinc-800',
        'h-16',
        'flex',
        'items-center'
      )}
    >
      <Link href="/">
        <div className={'flex items-center justify-center p-4 cursor-pointer'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 31.8 32.52"
            width="28"
            height="28"
            style={{ fill: '#fff' }}
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <path d="M13.44,16.26a2.46,2.46,0,1,1,2.46,2.46A2.46,2.46,0,0,1,13.44,16.26Z" />
                <path d="M0,15.57A15.56,15.56,0,0,0,13.25,31,14,14,0,0,1,15.57,3.11a1.56,1.56,0,1,0,0-3.11A15.57,15.57,0,0,0,0,15.57Z" />
                <path d="M31.8,17A15.56,15.56,0,0,0,18.55,1.56a14,14,0,0,1-2.32,27.85,1.56,1.56,0,1,0,0,3.11A15.57,15.57,0,0,0,31.8,17Z" />
              </g>
            </g>
          </svg>
          <div
            className={clsx(
              'text-2xl',
              'ml-2',
              'leading-none',
              'lowercase',
              'text-white',
              'relative',
              '-top-px'
            )}
          >
            Corpus
          </div>
        </div>
      </Link>

      <input
        type="text"
        placeholder={'Search'}
        className={clsx(
          'w-56',
          'bg-zinc-800',
          // 'bg-opacity-20',
          // 'h-8',
          'rounded-lg',
          'text-sm',
          // 'font-light',
          'mr-4',
          'p-2',
          'focus:bg-white',
          'focus:bg-opacity-10',
          'focus:outline-0'
          // 'border',
          // 'border-zinc-800'
        )}
      />
      <nav
        className={clsx(
          'flex',
          'items-center',
          'space-x-4',
          'leading-none',
          'flex-1'
        )}
      >
        <Link href="/swap" passHref>
          <a
            className={clsx('text-sm', 'text-gray-400', {
              'text-white': pathname === '/swap',
            })}
          >
            Swap
          </a>
        </Link>
        <Link href="/trade" passHref>
          <a
            className={clsx('text-sm', 'text-gray-400', {
              'text-white': pathname === '/trade',
            })}
          >
            Trade
          </a>
        </Link>
        <Link href="/borrow" passHref>
          <a
            className={clsx('text-sm', 'text-gray-400', {
              'text-white': pathname === '/borrow',
            })}
          >
            Borrow
          </a>
        </Link>
        <div className={clsx('text-sm', 'text-gray-400')}>Account</div>
      </nav>

      {wallet ? (
        <WalletDisconnectButton className={buttonStyles} />
      ) : (
        <WalletModalButton className={buttonStyles} />
      )}
      {/* <WalletConnect /> */}
      {/* <button
        className={clsx(
          'ml-auto',
          'bg-white',
          'hover:bg-gray-100',
          'rounded-lg',
          'text-zinc-900',
          'text-sm',
          'font-medium',
          'mr-4',
          'px-4',
          'py-2',
          'whitespace-nowrap'
        )}
      >
        Connect Wallet
      </button> */}
    </header>
  )
}

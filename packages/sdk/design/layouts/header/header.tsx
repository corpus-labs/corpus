import React, { ReactNode } from 'react';
import { Connect } from '@corpus/features.wallet.connect';
import clsx from 'clsx';

export type HeaderProps = {} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export function Header({
  ...props
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <header
      {...props}
      className={clsx(
        'w-full',
        'bg-zinc-900',
        'border-b',
        'border-zinc-800',
        'h-16',
        'flex',
        'items-center',
        'font-sans',
        props.className
      )}
      data-testid="header"
    >
      <div className={'flex items-center justify-center p-4'}>
        {/* <Image
          src={'/logo-dark.svg'}
          alt="Corpus"
          width={'26px'}
          height={'26px'}
        /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 31.8 32.52"
          width="32"
          height="32"
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
            'font-light',
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
        className={clsx('flex', 'items-center', 'space-x-4', 'leading-none')}
      >
        <div className={clsx('text-sm', 'text-white')}>Exchange</div>
        <div className={clsx('text-sm', 'text-gray-400')}>Lending</div>
        <div className={clsx('text-sm', 'text-gray-400')}>Wallet</div>
        <div className={clsx('text-sm', 'text-gray-400')}>Swap</div>
      </nav>

      <Connect buttonText="Start Trading" />
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
      {/* <MetaMaskConnect
        className={clsx(
          'flex',
          'items-center',
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
      /> */}
    </header>
  );
}

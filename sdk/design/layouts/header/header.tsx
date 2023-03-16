import React from 'react';
import { WalletConnect } from '@corpus/features.wallet.connect';
import clsx from 'clsx';
import * as styles from './styles';

export type HeaderProps = {
  variant?: 'web' | 'iOS' | 'android'
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export function Header({
  ...props
}: HeaderProps) {
  return (
    <header
      {...props}
      className={clsx(styles.header, props.className)}
      data-testid="header"
    >
      { /* Logo */ }
      <div className={'flex items-center justify-center mr-4'}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 31.8 32.52"
          width="32"
          height="32"
          style={{ fill: '#fff' }}
        >
          <g>
            <g>
              <path d="M13.44,16.26a2.46,2.46,0,1,1,2.46,2.46A2.46,2.46,0,0,1,13.44,16.26Z" />
              <path d="M0,15.57A15.56,15.56,0,0,0,13.25,31,14,14,0,0,1,15.57,3.11a1.56,1.56,0,1,0,0-3.11A15.57,15.57,0,0,0,0,15.57Z" />
              <path d="M31.8,17A15.56,15.56,0,0,0,18.55,1.56a14,14,0,0,1-2.32,27.85,1.56,1.56,0,1,0,0,3.11A15.57,15.57,0,0,0,31.8,17Z" />
            </g>
          </g>
        </svg>
        <div className={styles.logo}>
          Corpus
        </div>
      </div>
      { /* Search Input */ }
      <input
        type="text"
        placeholder={'Search'}
        className={styles.searchInput}
      />
      { /* Navigation */ }
      <nav className={styles.navBar}>
        <div className={clsx('text-sm', 'text-white')}>Exchange</div>
        <div className={clsx('text-sm', 'text-gray-400')}>Lending</div>
        <div className={clsx('text-sm', 'text-gray-400')}>Wallet</div>
        <div className={clsx('text-sm', 'text-gray-400')}>Swap</div>
      </nav>
      { /* Wallet Connect */ }
      <div className="ml-auto pl-12">
        <WalletConnect />
      </div>
    </header>
  );
}

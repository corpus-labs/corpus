import React, { useState, ReactNode } from 'react';
import clsx from 'clsx';

import * as styles from './styles';
import { BorrowIcon } from '@corpus/design.icons.borrow';
import { MoreIcon } from '@corpus/design.icons.more';
import { SwapIcon } from '@corpus/design.icons.swap';
import { TradeIcon } from '@corpus/design.icons.trade';
import { WalletIcon } from '@corpus/design.icons.wallet';
export interface PrimaryNavItem {
  icon: JSX.Element;
  text: string;
  isActive?: boolean;
}

export type ShellProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
  /**
   * a node to be rendered in the special component.
   */
  menu?: PrimaryNavItem[];
};

const menuItems: PrimaryNavItem[] = [
  {
    icon: <WalletIcon className="h-[24px] md:h-[20px] w-auto" />,
    text: 'Account',
    // isActive: true,
  },
  {
    icon: <SwapIcon className="h-[24px] md:h-[20px] w-auto" />,
    text: 'Swap',
    isActive: true,
  },
  {
    icon: <TradeIcon className="h-[24px] md:h-[20px] w-auto" />,
    text: 'Trade',
  },
  {
    icon: <BorrowIcon className="h-[24px] md:h-[20px] w-auto" />,
    text: 'Borrow',
  },
  {
    icon: <MoreIcon className="h-[24px] md:h-[20px] w-auto" />,
    text: 'More',
  },
];

export function Shell({ children, menu = menuItems }: ShellProps) {
  return (
    <div className={styles.container}>
      {/* <header
        className={clsx(
          'flex',
          'space-x-4',
          'items-center',
          'order-last',
          'md:order-first',
          'bg-zinc-800',
          'bg-opacity-20'
        )}
      > */}
      {/* </header> */}
      <main className={styles.scrollView}>{children}</main>
      <nav className={clsx('bg-zinc-800', 'bg-opacity-20', 'flex')}>
        <ul className={clsx('flex', 'md:flex-col', 'w-full')}>
          <li
            className={clsx(
              styles.navItem,
              'hidden',
              'md:flex',
              'p-5'
              // 'border-b',
              // 'border-zinc-800'
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 31.8 32.52"
              width="36"
              height="36"
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
          </li>
          {menu.map(({ icon, text, isActive }) => {
            return (
              <li
                className={clsx(styles.navItem, {
                  [styles.navItemInactive]: !isActive,
                  [styles.navItemActive]: isActive,
                })}
              >
                <span className={clsx()}>{icon}</span>
                {text}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

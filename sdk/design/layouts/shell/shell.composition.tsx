import React, { useState } from 'react';
import { WalletIcon } from '@corpus/design.icons.wallet';
import { SwapIcon } from '@corpus/design.icons.swap';
import { TradeIcon } from '@corpus/design.icons.trade';
import { BorrowIcon } from '@corpus/design.icons.borrow';
import { MoreIcon } from '@corpus/design.icons.more';
import { Shell, PrimaryNavItem } from './shell';

export const BasicShell = () => {
  return (
    <Shell>
      <div className="hidden md:flex flex-col h-full w-1/4 min-w-[300px] border-r border-zinc-800">
        <div className="flex items-center justify-between px-4 w-full border-b border-zinc-800 h-[80px]">
          <div className="flex flex-col justify-center">
            <span className="text-gray-400 text-sm">Swap</span>
            <span className="text-white">Openbook</span>
          </div>
          <MoreIcon
            width={24}
            className="text-gray-400 hover:text-white cursor-pointer"
          />
        </div>
        <div className="flex-1"></div>
        <div className="w-full border-t border-zinc-800 p-4">
          <button className="w-full text-center justify-center flex items-center bg-white hover:bg-gray-100 rounded-lg text-zinc-900 font-bold px-6 py-3 whitespace-nowrap bg-gradient-to-r from-[#00DBDE] to-[#B721FF]">
            Swap
          </button>
        </div>
      </div>
    </Shell>
  );
};

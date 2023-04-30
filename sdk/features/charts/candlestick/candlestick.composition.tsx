import React from 'react';
import { PublicKey } from '@solana/web3.js';
import { CandlestickChart } from './candlestick';

export const BasicCandlestick = () => {
  const ohlcv = [
    { time: '2019-05-23', open: 59.0, high: 59.27, low: 58.54, close: 58.87 },
    { time: '2019-05-24', open: 59.07, high: 59.36, low: 58.67, close: 59.32 },
    { time: '2019-05-28', open: 59.21, high: 69.66, low: 59.02, close: 59.57 },
  ];

  return <CandlestickChart ohlcv={ohlcv} />;
};

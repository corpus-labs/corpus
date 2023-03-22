import React from 'react';
import { TradeIcon } from './trade';

export const TradeIconDefault = () => {
  return <TradeIcon />;
};

export const TradeIconCustomColor = () => {
  return <TradeIcon className="text-teal-500" />;
};

export const TradeIconCustomSize = () => {
  return <TradeIcon width={48} height={48} />;
};

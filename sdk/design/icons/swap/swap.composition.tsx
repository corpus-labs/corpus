import React from 'react';
import { SwapIcon } from './swap';

export const SwapIconDefault = () => {
  return <SwapIcon />;
};

export const SwapIconCustomColor = () => {
  return <SwapIcon className="text-teal-500" />;
};

export const SwapIconCustomSize = () => {
  return <SwapIcon width={48} height={48} />;
};

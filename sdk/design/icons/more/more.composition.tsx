import React from 'react';
import { MoreIcon } from './more';

export const MoreIconDefault = () => {
  return <MoreIcon />;
};

export const MoreIconCustomColor = () => {
  return <MoreIcon className="text-teal-500" />;
};

export const MoreIconCustomSize = () => {
  return <MoreIcon width={48} height={48} />;
};

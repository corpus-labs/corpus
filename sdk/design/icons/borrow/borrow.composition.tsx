import React from 'react';
import { BorrowIcon } from './borrow';

export const BorrowIconDefault = () => {
  return <BorrowIcon />;
};

export const BorrowIconCustomColor = () => {
  return <BorrowIcon className="text-teal-500" />;
};

export const BorrowIconCustomSize = () => {
  return <BorrowIcon width={48} height={48} />;
};

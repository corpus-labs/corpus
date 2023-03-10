import React, { ReactNode } from 'react';

export type PlaceOrderProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function PlaceOrder({ children }: PlaceOrderProps) {
  return (
    <div>
      {children}
    </div>
  );
}

import React, { ReactNode } from 'react';

export type ButtonProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function Button({ children }: ButtonProps) {
  return (
    <button className="bg-gray-100 px-4 py-2 font-semibold">{children}</button>
  );
}

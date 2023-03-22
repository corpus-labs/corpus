import React, { ReactNode } from 'react';
import clsx from 'clsx';

export type ShellProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function Shell({ children }: ShellProps) {
  return <div className="fle">{children}</div>;
}

import React, { ReactNode } from 'react';

export type TabsProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function Tabs({ children }: TabsProps) {
  return (
    <div>
      {children}
    </div>
  );
}

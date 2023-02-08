import React, { ReactNode } from 'react';

export type TextfieldProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
};

export function Textfield({ children }: TextfieldProps) {
  return (
    <div>
      {children}
    </div>
  );
}

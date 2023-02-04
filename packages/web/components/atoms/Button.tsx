import React, { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export enum ButtonSize {
  xs,
  sm,
  lg,
}

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string
  size: ButtonSize
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button {...props} className={clsx(styles[props.size], props.className)} />
  )
}

const styles = {
  [ButtonSize.xs]: clsx('py-1', 'px-2', 'text-xs', 'rounded-md', 'font-medium'),
  [ButtonSize.sm]: clsx('py-2', 'px-4', 'text-xs', 'rounded-md', 'font-medium'),
  [ButtonSize.lg]: clsx(
    'py-3',
    'px-6',
    'text-sm',
    'rounded-lg',
    'font-semibold'
  ),
}

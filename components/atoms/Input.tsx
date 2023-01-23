import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

export const Input: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  return (
    <input
      {...props}
      className={clsx(
        'p-3',
        'text-sm',
        'bg-zinc-800',
        'rounded-lg',
        'font-semibold',
        props.className
      )}
    />
  )
}

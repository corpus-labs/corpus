import React, { FC, DetailedHTMLProps, LabelHTMLAttributes } from 'react'
import clsx from 'clsx'

export const Label: FC<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
> = (props) => {
  return (
    <label
      {...props}
      htmlFor={props.htmlFor}
      className={clsx('text-sm', 'font-medium', props.className)}
    />
  )
}

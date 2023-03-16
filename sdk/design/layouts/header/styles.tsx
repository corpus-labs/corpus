import clsx from 'clsx';

export const header = clsx(
  'w-fit',
  'min-w-full',
  'bg-zinc-900',
  'border-b',
  'border-zinc-800',
  'h-16',
  'flex',
  'items-center',
  'font-sans',
  'px-4',
)

export const logo = clsx(
  'font-light',
  'text-2xl',
  'ml-2',
  'leading-none',
  'lowercase',
  'text-white',
  'relative',
  '-top-px'
)

export const searchInput = clsx(
  'w-56',
  'bg-zinc-800',
  // 'bg-opacity-20',
  // 'h-8',
  'rounded-lg',
  'text-sm',
  // 'font-light',
  'p-2',
  'focus:bg-white',
  'focus:bg-opacity-10',
  'focus:outline-0'
  // 'border',
  // 'border-zinc-800'
)

export const navBar = clsx('flex', 'items-center', 'space-x-4', 'leading-none', 'px-4')

export const navItem = clsx('text-sm', 'text-gray-400')
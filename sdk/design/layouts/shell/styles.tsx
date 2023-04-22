import clsx from 'clsx';

export const container = clsx(
  'flex',
  'flex-col',
  'h-screen',
  'bg-zinc-900',
  'md:flex-row-reverse'
);

export const scrollView = clsx(
  'flex-1',
  'overflow-auto',
  'text-white',
  'border-b',
  'border-zinc-800',
  'md:border-l',
  'md:border-b-0'
);

export const navItem = clsx(
  'flex',
  'flex-col',
  'text-[13px]',
  'gap-1',
  'items-center',
  'justify-center',
  'p-6',
  'w-1/5',
  'md:w-[80px]',
  'md:h-[80px]',
  'relative',
  'hover:text-white',
  'transition'
);

export const navItemActive = clsx(
  'text-white',
  'md:bg-zinc-800',
  '!bg-opacity-60',
  'before:content-[""]',
  'before:absolute',
  'before:top-[-1px]',
  'md:before:top-[calc(100%-1px)]',
  'before:h-[2px]',
  // 'before:bg-white',
  'before:bg-gradient-to-r',
  'md:before:bg-gradient-to-t',
  'from-[#00DBDE] to-[#B721FF]',
  'before:w-full',
  'md:before:h-full',
  'md:before:w-[2px]',
  'md:before:left-0',
  'md:before:top-0'
);

export const navItemInactive = clsx('text-gray-400', 'cursor-pointer');

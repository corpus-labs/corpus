import clsx from 'clsx';

export const swapGroup = clsx(
  'flex',
  'flex-col',
  'group',
  'divide-y',
  'divide-zinc-800',
  'relative'
);

export const swapInput = clsx('flex', 'flex-col', 'gap-4', 'p-4');

export const label = clsx('text-sm', 'text-gray-400');

// export const input = clsx('bg-transparent', 'text-white', 'text-4xl', 'font-bold')

export const inputGroup = clsx(
  'group',
  'flex',
  'bg-zinc-800',
  'bg-opacity-60',
  'rounded-lg',
  'font-normal',
  'ring-1',
  'ring-zinc-800',
  // 'divide-x',
  // 'divide-zinc-800',
  // 'focus-within:divide-zinc-700',
  'focus-within:ring-zinc-700'
);

export const textInput = clsx(
  'px-4',
  'py-3',
  'bg-zinc-800',
  // 'bg-opacity-30',
  'bg-opacity-0',
  'w-full',
  'outline-0'
);

export const coinInput = clsx(
  'px-4',
  'py-3',
  'flex',
  'gap-[0.375rem]',
  'items-center',
  'text-[13px]',
  'text-zinc-400',
  'font-bold',
  'w-[120px]',
  'min-w-[120px]'
);

export const swapIcon = clsx(
  'absolute',
  'left-1/2',
  'top-[calc(50%+0.5rem)]',
  '-translate-x-1/2',
  '-translate-y-1/2',
  'rotate-90',
  'w-auto',
  'h-8',
  'w-8',
  'p-[7px]',
  'ring-2',
  'ring-zinc-700',
  'bg-zinc-800',
  // 'bg-opacity-60',
  'rounded-full'
);

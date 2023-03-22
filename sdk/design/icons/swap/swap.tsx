import React from 'react';

export function SwapIcon({
  width,
  height,
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={width ?? 32}
      height={height ?? 32}
      data-testid="swap-icon"
      {...rest}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M304 48l112 112-112 112M398.87 160H96M208 464L96 352l112-112M114 352h302"
      />
    </svg>
  );
}

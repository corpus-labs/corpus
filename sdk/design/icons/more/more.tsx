import React from 'react';

export function MoreIcon({
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
      data-testid="more-icon"
      {...rest}
    >
      <circle
        cx="256"
        cy="256"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <circle
        cx="416"
        cy="256"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
      <circle
        cx="96"
        cy="256"
        r="32"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="32"
      />
    </svg>
  );
}

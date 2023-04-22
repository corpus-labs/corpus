import React from 'react';
import { render } from '@testing-library/react';
import { BasicSwap } from './swap.composition';

it('should render wallet connect by default', () => {
  const { queryByTestId } = render(<BasicSwap />);
  const rendered = queryByTestId('swap-form');
  expect(rendered).toBeFalsy();
});

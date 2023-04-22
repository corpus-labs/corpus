import React from 'react';
import { render } from '@testing-library/react';
import { SwapIconDefault } from './swap.composition';

it('should render swap icon', () => {
  const { getByTestId } = render(<SwapIconDefault />);
  const rendered = getByTestId('swap-icon');
  expect(rendered).toBeTruthy();
});

import React from 'react';
import { render } from '@testing-library/react';
import { BasicSwap } from './swap.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicSwap />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});

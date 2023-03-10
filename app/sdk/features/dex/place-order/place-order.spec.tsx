import React from 'react';
import { render } from '@testing-library/react';
import { BasicPlaceOrder } from './place-order.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicPlaceOrder />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});

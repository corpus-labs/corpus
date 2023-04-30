import React from 'react';
import { render } from '@testing-library/react';
import { BasicCandlestick } from './candlestick.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicCandlestick />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});

import React from 'react';
import { render } from '@testing-library/react';
import { BasicWallet } from './wallet.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicWallet />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});

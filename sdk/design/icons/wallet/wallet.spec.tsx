import React from 'react';
import { render } from '@testing-library/react';
import { BasicWallet } from './wallet.composition';

it('should render icon', () => {
  const { getByTestId } = render(<BasicWallet />);
  const rendered = getByTestId('wallet-icon');
  expect(rendered).toBeTruthy();
});
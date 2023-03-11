import React from 'react';
import { render } from '@testing-library/react';
import { ConnectButton } from './connect.composition';

it('should render with the correct text', () => {
  const { getByText} = render(<ConnectButton />);
  const rendered = getByText('Select Wallet');
  expect(rendered).toBeTruthy();
});

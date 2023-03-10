import React from 'react';
import { render } from '@testing-library/react';
import { BasicConnect } from './connect.composition';

it('should render with the correct text', () => {
  const { getByText} = render(<BasicConnect />);
  const rendered = getByText('Select Wallet');
  expect(rendered).toBeTruthy();
});

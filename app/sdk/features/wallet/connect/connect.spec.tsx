import React from 'react';
import { render } from '@testing-library/react';
import { BasicConnect } from './connect.composition';

it('should render with the correct text', () => {
  const { getByTestId } = render(<BasicConnect />);
  const rendered = getByTestId('connect');
  expect(rendered).toBeTruthy();
});

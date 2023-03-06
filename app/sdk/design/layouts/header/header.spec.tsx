import React from 'react';
import { render } from '@testing-library/react';
import { BasicHeader } from './header.composition';

it('should render with the correct text', () => {
  const { getByTestId } = render(<BasicHeader />);
  const rendered = getByTestId('header');
  expect(rendered).toBeTruthy();
});

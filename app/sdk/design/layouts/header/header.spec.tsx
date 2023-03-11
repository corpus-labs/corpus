import React from 'react';
import { render } from '@testing-library/react';
import { DefaultHeader } from './header.composition';

it('should render with the correct text', () => {
  const { getByTestId } = render(<DefaultHeader />);
  const rendered = getByTestId('header');
  expect(rendered).toBeTruthy();
});

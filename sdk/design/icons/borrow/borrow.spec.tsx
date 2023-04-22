import React from 'react';
import { render } from '@testing-library/react';
import { BorrowIconDefault } from './borrow.composition';

it('should render borrow icon', () => {
  const { getByTestId } = render(<BorrowIconDefault />);
  const rendered = getByTestId('borrow-icon');
  expect(rendered).toBeTruthy();
});

import React from 'react';
import { render } from '@testing-library/react';
import { MoreIconDefault } from './more.composition';

it('should render more icon', () => {
  const { getByTestId } = render(<MoreIconDefault />);
  const rendered = getByTestId('more-icon');
  expect(rendered).toBeTruthy();
});

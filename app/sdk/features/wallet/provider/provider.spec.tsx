import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from './provider.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<Provider />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});

import React from 'react';
import { render } from '@testing-library/react';
import { BasicShell } from './shell.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicShell />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});

import React from 'react';
import { render } from '@testing-library/react';
import { BasicShell } from './shell.composition';

it('should render with the correct text', () => {
  const { getByTestId } = render(<BasicShell />);
  const rendered = getByTestId('shell');
  expect(rendered).toBeTruthy();
});

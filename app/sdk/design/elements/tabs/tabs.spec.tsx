import React from 'react';
import { render } from '@testing-library/react';
import { BasicTabs } from './tabs.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicTabs />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});

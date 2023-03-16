import React from 'react';
import { render } from '@testing-library/react';
import { BasicHero } from './hero.composition';

it('should render with the correct text', () => {
  const { getByTestId } = render(<BasicHero />);
  const rendered = getByTestId('hero');
  expect(rendered).toBeTruthy();
});

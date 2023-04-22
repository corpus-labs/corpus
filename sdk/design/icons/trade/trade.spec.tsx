import React from 'react';
import { render } from '@testing-library/react';
import { TradeIconDefault } from './trade.composition';

it('should render icon', () => {
  const { getByTestId } = render(<TradeIconDefault />);
  const rendered = getByTestId('trade-icon');
  expect(rendered).toBeTruthy();
});

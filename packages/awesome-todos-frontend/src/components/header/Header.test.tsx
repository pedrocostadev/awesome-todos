import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

describe('<Header />', () => {
  test('It should render', () => {
    const header = render(<Header />);
    expect(header).toMatchSnapshot();
  });
});

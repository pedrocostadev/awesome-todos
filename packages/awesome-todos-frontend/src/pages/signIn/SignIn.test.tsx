import React from 'react';
import { render } from '@testing-library/react';

import SignIn from './SignIn';
import AppProvider from '../../components/appProvider/AppProvider';

describe('<SignIn />', () => {
  test('It should render the Input fields for username and password', () => {
    const { getByText } = render(
      <AppProvider>
        <SignIn />
      </AppProvider>,
    );
    expect(getByText('UserName')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
  });
});

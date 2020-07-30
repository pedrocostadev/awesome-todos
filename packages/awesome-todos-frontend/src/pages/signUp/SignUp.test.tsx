import React from 'react';
import { render } from '@testing-library/react';

import SignUp from './SignUp';
import AppProvider from '../../components/appProvider/AppProvider';

describe('<SignUp />', () => {
  test('It should render the Input fields for registration', () => {
    const { getByText } = render(
      <AppProvider>
        <SignUp />
      </AppProvider>,
    );
    expect(getByText('UserName')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByText('Password Confirm')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('Alread have an account? Sign in')).toBeInTheDocument();
  });
});

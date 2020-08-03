import React from 'react';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';

import SignIn from './SignIn';
import AppProvider from '../../components/appProvider/AppProvider';

const renderWithProvider = (): RenderResult =>
  render(
    <AppProvider>
      <SignIn />
    </AppProvider>,
  );

describe('<SignIn />', () => {
  test('It should render the Input fields for username and password', () => {
    const { getByText } = renderWithProvider();
    expect(getByText('UserName')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
  });
  test('It should render the register link', () => {
    const { getByText } = renderWithProvider();
    const registerLink = getByText('Register now') as HTMLAnchorElement;
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.tagName).toBe('A');
    expect(registerLink.href).toContain('/signup');
  });
  test('It should render the submit button', () => {
    const { getByText } = renderWithProvider();
    const submitButton = getByText('Sign In') as HTMLButtonElement;
    expect(submitButton).toBeInTheDocument();
  });
  test('It should update the input values on user typing', async () => {
    const { getByTestId } = renderWithProvider();

    const userNameInput = getByTestId('input-field-userName') as HTMLInputElement;
    const passwordInput = getByTestId('input-field-password') as HTMLInputElement;

    fireEvent.change(userNameInput, { target: { value: 'pedro' } });
    fireEvent.change(passwordInput, { target: { value: '123qwe' } });

    expect(userNameInput.value).toBe('pedro');
    expect(passwordInput.value).toBe('123qwe');
  });
});

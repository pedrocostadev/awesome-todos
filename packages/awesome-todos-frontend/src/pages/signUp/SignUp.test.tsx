import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';

import SignUp from './SignUp';
import AppProvider from '../../components/appProvider/AppProvider';

const renderWithProvider = (): RenderResult =>
  render(
    <AppProvider>
      <SignUp />
    </AppProvider>,
  );

describe('<SignUp />', () => {
  test('It should render the Input fields for registration', () => {
    const { getByText } = renderWithProvider();
    expect(getByText('UserName')).toBeInTheDocument();
    expect(getByText('Email')).toBeInTheDocument();
    expect(getByText('Password')).toBeInTheDocument();
    expect(getByText('Password Confirm')).toBeInTheDocument();
    expect(getByText('Sign Up')).toBeInTheDocument();
    expect(getByText('Alread have an account? Sign in')).toBeInTheDocument();
  });
  test('It should update the input values on user typing', async () => {
    const { getByTestId } = renderWithProvider();

    const userNameInput = getByTestId('input-field-userName') as HTMLInputElement;
    const emailInput = getByTestId('input-field-email') as HTMLInputElement;
    const passwordInput = getByTestId('input-field-password') as HTMLInputElement;
    const passwordConfirmInput = getByTestId('input-field-passwordConfirm') as HTMLInputElement;

    fireEvent.change(userNameInput, { target: { value: 'pedro' } });
    fireEvent.change(emailInput, { target: { value: 'pedro@awesome-todos.com' } });
    fireEvent.change(passwordInput, { target: { value: '123qwe' } });
    fireEvent.change(passwordConfirmInput, { target: { value: '123qwe' } });

    expect(userNameInput.value).toBe('pedro');
    expect(emailInput.value).toBe('pedro@awesome-todos.com');
    expect(passwordInput.value).toBe('123qwe');
    expect(passwordConfirmInput.value).toBe('123qwe');
  });
  test('It should render the logIn link', () => {
    const { getByText } = renderWithProvider();
    const registerLink = getByText('Alread have an account? Sign in') as HTMLAnchorElement;
    expect(registerLink).toBeInTheDocument();
    expect(registerLink.tagName).toBe('A');
    expect(registerLink.href).toContain('/signin');
  });
  test('It should render the submit button', () => {
    const { getByText } = renderWithProvider();
    const submitButton = getByText('Sign Up') as HTMLButtonElement;
    expect(submitButton).toBeInTheDocument();
  });
});

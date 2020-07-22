import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import './SignIn.css';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import ToastMessage from '../../components/toastMessage/ToastMessage';
import Link from '../../components/link/Link';
import useAuth from '../../hooks/auth/useAuth';
import SubmitButton from '../../components/submitButton/SubmitButton';

interface State {
  userName: string;
  password: string;
}

const THREE_SECONDS = 3000;

const getInitialState = (): State => ({ userName: '', password: '' });

const isValid = (fieldValue: string): boolean => fieldValue.trim().length > 0;

const SignIn: React.FC = () => {
  const [loginData, setLoginData] = useState<State>(getInitialState());

  const [showLoginError, setLoginError] = useState<boolean>(false);

  const history = useHistory();

  const { login } = useAuth();

  const signIn = (state: State): Promise<void> => login(state);

  const showError = (): void => {
    setLoginError(true);
    setTimeout(() => setLoginError(false), THREE_SECONDS);
  };

  const [mutate] = useMutation(signIn, {
    onSuccess: () => history.push('/home'),
    onError: showError,
  });

  const onChangeUsername = (newValue: string): void => setLoginData({ ...loginData, userName: newValue });
  const onChangePassword = (newValue: string): void => setLoginData({ ...loginData, password: newValue });
  const onConfirm = (): void => {
    if (!isValid(loginData.userName) || !isValid(loginData.password)) {
      showError();
      return;
    }
    mutate(loginData);
  };

  return (
    <>
      <Header />
      <div className="sign-in-container">
        <form className="form-container">
          <Input name="userName" value={loginData.userName} onType={onChangeUsername} />
          <Input type="password" name="password" value={loginData.password} onType={onChangePassword} />
          <SubmitButton onClick={onConfirm} label="Sign In" />
        </form>
        <ToastMessage show={showLoginError} message="Invalid data" />
        <Link to="/signup" label="Register now" />
      </div>
    </>
  );
};

export default SignIn;

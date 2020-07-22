import React, { useState, MouseEvent } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import './SignUp.css';
import awesomeTodosApiClient from '../../services/awesomeTodosApiClient';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';

interface State {
  userName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

const getInitialState = (): State => ({ userName: '', email: '', password: '', passwordConfirm: '' });

const addUser = (state: State): Promise<void> => awesomeTodosApiClient.user.signUp(state);

const SignUp: React.FC = () => {
  const [loginData, setLoginData] = useState<State>(getInitialState());

  const history = useHistory();

  const [mutate] = useMutation(addUser, {
    onSuccess: () => history.push('/home'),
  });

  const onChangeUsername = (newValue: string): void => setLoginData({ ...loginData, userName: newValue });
  const onChangeEmail = (newValue: string): void => setLoginData({ ...loginData, email: newValue });
  const onChangePassword = (newValue: string): void => setLoginData({ ...loginData, password: newValue });
  const onChangePasswordConfirm = (newValue: string): void => setLoginData({ ...loginData, passwordConfirm: newValue });
  const onConfirm = (ev: MouseEvent<HTMLButtonElement>): void => {
    ev.preventDefault();
    mutate(loginData);
  };
  return (
    <>
      <Header />
      <div className="sign-up-container">
        <form className="form-container">
          <Input name="userName" value={loginData.userName} onType={onChangeUsername} />
          <Input type="email" name="email" value={loginData.email} onType={onChangeEmail} />
          <Input type="password" name="password" value={loginData.password} onType={onChangePassword} />
          <Input
            type="password"
            label="Password Confirm"
            name="passwordConfirm"
            value={loginData.passwordConfirm}
            onType={onChangePasswordConfirm}
          />
          <button className="sign-up-button" onClick={onConfirm}>
            Sign Up
          </button>
        </form>
        <Link to="/signin" label="Alread have an account? Sign in" />
      </div>
    </>
  );
};

export default SignUp;

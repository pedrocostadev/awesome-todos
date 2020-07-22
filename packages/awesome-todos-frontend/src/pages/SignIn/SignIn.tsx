import React, { useState, MouseEvent } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

import './SignIn.css';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import useAuth from '../../hooks/auth/useAuth';

interface State {
  userName: string;
  password: string;
}

const getInitialState = (): State => ({ userName: '', password: '' });

const SignIn: React.FC = () => {
  const [loginData, setLoginData] = useState<State>(getInitialState());

  const history = useHistory();

  const { login } = useAuth();

  const signIn = (state: State): Promise<void> => login(state);

  const [mutate] = useMutation(signIn, {
    onSuccess: () => history.push('/home'),
  });

  const onChangeUsername = (newValue: string): void => setLoginData({ ...loginData, userName: newValue });
  const onChangePassword = (newValue: string): void => setLoginData({ ...loginData, password: newValue });
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
          <Input type="password" name="password" value={loginData.password} onType={onChangePassword} />
          <button className="sign-in-button" onClick={onConfirm}>
            Sign In
          </button>
        </form>
      </div>
    </>
  );
};

export default SignIn;

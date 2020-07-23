import React, { useState } from 'react';
import { useMutation, queryCache } from 'react-query';
import { useHistory } from 'react-router-dom';

import './SignIn.css';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Link from '../../components/link/Link';
import useAuth from '../../hooks/useAuth';
import SubmitButton from '../../components/submitButton/SubmitButton';
import { useToastMessage } from '../../hooks/useToastMessage';

interface State {
  userName: string;
  password: string;
}

const getInitialState = (): State => ({ userName: '', password: '' });

const isValid = (fieldValue: string): boolean => fieldValue.trim().length > 0;

const SignIn: React.FC = () => {
  const [loginData, setLoginData] = useState<State>(getInitialState());

  const history = useHistory();

  const { login } = useAuth();

  const signIn = (state: State): Promise<void> => login(state);

  const { showErrorMessage } = useToastMessage();

  const [mutate] = useMutation(signIn, {
    onSuccess: () => {
      // TODO: ??
      queryCache.clear();
      history.push('/');
    },
    onError: () => showErrorMessage('Invalid login credentials'),
  });

  const onChangeUsername = (newValue: string): void => setLoginData({ ...loginData, userName: newValue });
  const onChangePassword = (newValue: string): void => setLoginData({ ...loginData, password: newValue });
  const onConfirm = (): void => {
    if (!isValid(loginData.userName) || !isValid(loginData.password)) {
      showErrorMessage('Invalid login credentials');
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
        <Link to="/signup" label="Register now" />
      </div>
    </>
  );
};

export default SignIn;

import awesomeTodosApiClient from './apiClient';
import awesomeTodosApiClientParser from './apiParser';
import { UserNonConfidentialData } from 'awesome-todos-types';

const signUp = async ({
  userName,
  email,
  password,
}: {
  userName: string;
  email: string;
  password: string;
}): Promise<void> => {
  await awesomeTodosApiClient.post('/signUp', {
    userName,
    email,
    password,
    creationDate: new Date().toISOString(),
  });
};

const signIn = async (signInData: { userName: string; password: string }): Promise<UserNonConfidentialData> => {
  const { data: user } = await awesomeTodosApiClient.post('/signIn', signInData);
  return awesomeTodosApiClientParser.parseAwesomeTodosApiUser(user);
};

export default {
  signUp,
  signIn,
};

import awesomeTodosApiClient from './apiClient';
import awesomeTodosApiClientParser from './apiParser';
import { User } from 'awesome-todos-types';

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

const signIn = async ({ userName, password }: { userName: string; password: string }): Promise<User> => {
  const { data: user } = await awesomeTodosApiClient.post('/signIn', {
    userName,
    password,
  });

  return awesomeTodosApiClientParser.parseAwesomeTodosApiUser(user) as User; // TODO: User???
};

export default {
  signUp,
  signIn,
};

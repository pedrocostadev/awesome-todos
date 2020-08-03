import apiUser from './user';
import awesomeTodosApiClient from './apiClient';

jest.mock('./apiClient');
const mockedApiClient = awesomeTodosApiClient as jest.Mocked<typeof awesomeTodosApiClient>;

describe('apiUser', () => {
  describe('signIn', () => {
    test('should signIn', async () => {
      mockedApiClient.post.mockReturnValueOnce(
        new Promise<unknown>((resolve) =>
          resolve({
            data: {
              userName: 'pedro',
              email: 'pedro@awesome-todos.com',
            },
          }),
        ),
      );

      const expectedResult = { userName: 'pedro', email: 'pedro@awesome-todos.com' };
      const result = await apiUser.signIn({ userName: 'pedro', password: 'pedro' });
      expect(expectedResult).toEqual(result);
    });
  });
  describe('signUp', () => {
    test('should signUp', async () => {
      const spy = jest.fn();
      mockedApiClient.post.mockReturnValueOnce(
        new Promise<unknown>((resolve) => {
          spy();
          resolve();
        }),
      );
      await apiUser.signUp({ userName: 'pedro', email: 'pedro@awesome-todos.com', password: 'pedro' });
      expect(spy).toHaveBeenCalled();
    });
  });
});

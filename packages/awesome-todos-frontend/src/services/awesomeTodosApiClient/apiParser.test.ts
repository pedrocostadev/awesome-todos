import apiParser from './apiParser';
import { ApiTodo, ApiUser } from 'awesome-todos-types';

describe('<apiParser />', () => {
  describe('<parseAwesomeTodosApiTodo />', () => {
    const MOCKED_API_TODO: ApiTodo = {
      task: 'a task',
      completed: false,
      _id: '123',
      creationDate: '2020-08-03T13:31:28.800Z',
    };
    test('should return a Todo', () => {
      const expectedResult = {
        completed: false,
        creationDate: '2020-08-03T13:31:28.800Z',
        id: '123',
        task: 'a task',
      };

      expect(apiParser.parseAwesomeTodosApiTodo(MOCKED_API_TODO)).toEqual(expectedResult);
    });
  });

  describe('<parseAwesomeTodosApiUser />', () => {
    const MOCKED_USER_API: ApiUser = {
      userName: 'pedro',
      email: 'pedro@awesome-todos.com',
    };
    test('should return userName and Email', () => {
      const expectedResult = {
        email: 'pedro@awesome-todos.com',
        userName: 'pedro',
      };
      expect(apiParser.parseAwesomeTodosApiUser(MOCKED_USER_API)).toEqual(expectedResult);
    });
  });
});

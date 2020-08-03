import { ApiTodo, Todo } from 'awesome-todos-types';
import apiTodo from './todo';
import apiParser from './apiParser';
import awesomeTodosApiClient from './apiClient';

const MOCKED_CREATION_DATE = new Date().toISOString();

const MOCKED_TODOS: ApiTodo[] = [
  {
    task: 'task 1',
    completed: false,
    creationDate: MOCKED_CREATION_DATE,
    _id: '1',
  },
  {
    task: 'task 2',
    completed: true,
    creationDate: MOCKED_CREATION_DATE,
    _id: '2',
  },
];

jest.mock('./apiClient', () => ({
  get: async (): Promise<{ data: ApiTodo[] }> => ({ data: MOCKED_TODOS }),
  post: async (_: string, newTodoData: Todo): Promise<{ data: ApiTodo }> => ({
    data: {
      ...newTodoData,
      _id: '1',
    },
  }),
  put: async (_: string, updatedTodo: Todo): Promise<{ data: ApiTodo }> => ({
    data: {
      ...updatedTodo,
      _id: '1',
      creationDate: MOCKED_CREATION_DATE,
    },
  }),
  delete: jest.fn(),
}));

describe('apiTodo', () => {
  describe('getAll', () => {
    test('should return a todos list', async () => {
      const expectedResult: Todo[] = MOCKED_TODOS.map(apiParser.parseAwesomeTodosApiTodo);
      const result = await apiTodo.getAll();
      expect(expectedResult).toEqual(result);
    });
  });
  describe('addNew', () => {
    test('should create a new Todo', async () => {
      const mockTask = {
        ...MOCKED_TODOS[0],
        task: 'a mocked task',
      };
      const result = await apiTodo.addNew({ todoTask: mockTask.task });
      expect(result).toHaveProperty('task', mockTask.task);
      expect(result).toHaveProperty('completed', mockTask.completed);
      expect(result).toHaveProperty('id', mockTask._id);
      expect(result).toHaveProperty('creationDate');
    });
  });
  describe('update', () => {
    test('should update a Todo', async () => {
      const mockTask = {
        ...MOCKED_TODOS[0],
        task: 'a mocked task updated',
        id: '1',
      };
      const result = await apiTodo.update({ todo: mockTask });
      const expectedResult = apiParser.parseAwesomeTodosApiTodo(mockTask);
      expect(result).toEqual(expectedResult);
    });
  });
  describe('remove', () => {
    test('should remove a Todo', async () => {
      const mockTask = {
        ...MOCKED_TODOS[0],
        task: 'a mocked task updated',
        id: '1',
      };
      await apiTodo.remove({ todo: mockTask });
      expect(awesomeTodosApiClient.delete).toHaveBeenCalledWith(`/todos/${mockTask.id}`);
    });
  });
});

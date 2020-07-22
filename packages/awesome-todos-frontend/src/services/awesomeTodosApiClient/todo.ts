import awesomeTodosApiClient from './apiClient';
import awesomeTodosApiClientParser from './apiParser';
import { Todo } from 'awesome-todos-types';

const getAll = async (): Promise<Todo[]> => {
  const { data: todos } = await awesomeTodosApiClient.get('/todos');
  return todos.map(awesomeTodosApiClientParser.parseAwesomeTodosApiTodos);
};

const addNew = async ({ todoTask }: { todoTask: string }): Promise<Todo> => {
  const { data: newTodo } = await awesomeTodosApiClient.post('/todos', {
    task: todoTask,
    completed: false,
    creationDate: new Date().toISOString(),
  });
  return newTodo as Todo;
};

const remove = async ({ todo }: { todo: Todo }): Promise<void> => {
  await awesomeTodosApiClient.delete(`/todos/${todo.id}`);
};

const update = async ({ todo }: { todo: Todo }): Promise<void> => {
  await awesomeTodosApiClient.put(`/todos/${todo.id}`, {
    task: todo.task,
    completed: todo.completed,
  });
};

export default {
  getAll,
  addNew,
  remove,
  update,
};

import awesomeTodosApiClient from './awesomeTodosApiClient';
import awesomeTodosApiClientParser from './awesomeTodosApiClient.parser';
import { Todo } from 'awesome-todos-types';

const getTodos = async (): Promise<Todo[]> => {
  const { data: todos } = await awesomeTodosApiClient.get('/todos');
  return todos.map(awesomeTodosApiClientParser.parseAwesomeTodosApiTodos);
};

const addTodo = async ({ todoTask }: { todoTask: string }): Promise<Todo> => {
  const { data: newTodo } = await awesomeTodosApiClient.post('/todos', {
    task: todoTask,
    completed: false,
  });
  return newTodo as Todo;
};

const deleteTodo = async ({ todo }: { todo: Todo }): Promise<void> => {
  await awesomeTodosApiClient.delete(`/todos/${todo.id}`);
};

export default {
  getTodos,
  addTodo,
  deleteTodo,
};

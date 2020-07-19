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
    creationDate: new Date().toISOString(),
  });
  return newTodo as Todo;
};

const deleteTodo = async ({ todo }: { todo: Todo }): Promise<void> => {
  await awesomeTodosApiClient.delete(`/todos/${todo.id}`);
};

const updateTodo = async ({ todo }: { todo: Todo }): Promise<void> => {
  await awesomeTodosApiClient.put(`/todos/${todo.id}`, {
    task: todo.task,
    completed: todo.completed,
  });
};

export default {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
};

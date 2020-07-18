import { Todo, ApiTodo } from 'awesome-todos-types';

const parseAwesomeTodosApiTodos = (apiTodo: ApiTodo): Todo => ({
  ...apiTodo,
  id: apiTodo._id,
});

export default {
  parseAwesomeTodosApiTodos,
};

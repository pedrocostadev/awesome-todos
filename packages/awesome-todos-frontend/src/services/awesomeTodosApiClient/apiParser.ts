import { Todo, ApiTodo, ApiUser } from 'awesome-todos-types';

const parseAwesomeTodosApiTodos = (apiTodo: ApiTodo): Todo => ({
  ...apiTodo,
  id: apiTodo._id,
});

const parseAwesomeTodosApiUser = (user: ApiUser): { userName: string; email: string } => ({
  userName: user.userName,
  email: user.email,
});

export default {
  parseAwesomeTodosApiTodos,
  parseAwesomeTodosApiUser,
};

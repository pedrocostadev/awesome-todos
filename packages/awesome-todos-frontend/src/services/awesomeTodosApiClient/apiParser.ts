import { Todo, ApiTodo, ApiUser, UserNonConfidentialData } from 'awesome-todos-types';

const parseAwesomeTodosApiTodo = (apiTodo: ApiTodo): Todo => ({
  completed: apiTodo.completed,
  creationDate: apiTodo.creationDate,
  task: apiTodo.task,
  id: apiTodo._id,
});

const parseAwesomeTodosApiUser = (user: ApiUser): UserNonConfidentialData => ({
  userName: user.userName,
  email: user.email,
});

export default {
  parseAwesomeTodosApiTodo,
  parseAwesomeTodosApiUser,
};

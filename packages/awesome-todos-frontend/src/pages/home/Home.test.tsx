import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import { Todo } from 'awesome-todos-types';

const MOCKED_TODOS: Todo[] = [];

const NEW_TODO_TASK = 'Clean the toilet';

jest.mock('../../services/awesomeTodosApiClient', () => ({
  todo: {
    addNew: ({ todoTask }: { todoTask: string }): Todo => {
      const newTodo = {
        task: todoTask,
        completed: true,
        id: '1',
        creationDate: 'today',
      };

      MOCKED_TODOS.push(newTodo);
      return newTodo;
    },
    getAll: (): Todo[] => MOCKED_TODOS,
  },
}));

describe('<Home />', () => {
  test('It should add new todos to the list', async () => {
    const { getByTestId, getByText } = render(
      <Router>
        <Home />
      </Router>,
    );

    const input = await waitFor(() => getByTestId('add-todo-input'));
    fireEvent.change(input, { target: { value: NEW_TODO_TASK } });

    const addButton = getByTestId('add-todo-button') as HTMLButtonElement;
    await waitFor(() => fireEvent.click(addButton));

    const newTodoItem = getByText(NEW_TODO_TASK);
    expect(newTodoItem).toBeInTheDocument();
  });
});

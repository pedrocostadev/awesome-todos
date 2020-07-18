import React from 'react';
import { render } from '@testing-library/react';

import TodoItem from './TodoItem';

describe('<AddTodo />', () => {
  const todoMock = {
    id: '1',
    task: 'Clean the kitchen',
    completed: false,
  };

  test('It should render the Delete Todo Button', () => {
    const { getByTestId } = render(<TodoItem todo={todoMock} />);
    const deleteTodoButton = getByTestId('delete-todo-button');
    expect(deleteTodoButton).toBeInTheDocument();
  });
  test('It should show the task text', () => {
    const { queryAllByText } = render(<TodoItem todo={todoMock} />);
    const task = queryAllByText(todoMock.task);
    expect(task.length).toBe(1);
  });
});

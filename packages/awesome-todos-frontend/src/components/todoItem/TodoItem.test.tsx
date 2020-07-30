import React from 'react';
import { render } from '@testing-library/react';

import TodoItem from './TodoItem';

describe('<TodoItem />', () => {
  const todoMock = {
    id: '1',
    task: 'Clean the kitchen',
    completed: false,
    creationDate: '',
  };

  test('It should render the Done and Delete buttons', () => {
    const { getByTestId } = render(<TodoItem todo={todoMock} />);
    expect(getByTestId('delete-todo-button')).toBeInTheDocument();
    expect(getByTestId('done-todo-button')).toBeInTheDocument();
  });
  test('It should show the task text', () => {
    const { getByText } = render(<TodoItem todo={todoMock} />);
    expect(getByText(todoMock.task)).toBeInTheDocument();
  });
});

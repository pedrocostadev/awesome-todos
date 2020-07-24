import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AddTodo from './AddTodo';

describe('<AddTodo />', () => {
  const TASK_STRING_MOCK = 'Clean the toilet';

  test('It should render the Add Todo Button', () => {
    const { getByTestId } = render(<AddTodo />);
    const addTodoButton = getByTestId('add-todo-button');
    expect(addTodoButton).toBeInTheDocument();
  });
  test('It should show current todo task text on input', () => {
    const { getByTestId } = render(<AddTodo />);
    const input = getByTestId('add-todo-input') as HTMLInputElement;
    fireEvent.change(input, { target: { value: TASK_STRING_MOCK } });
    expect(input.value).toBe(TASK_STRING_MOCK);
  });
});

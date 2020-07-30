import React from 'react';
import { render } from '@testing-library/react';
import { Todo } from 'awesome-todos-types';
import Dashboard from './Dashboard';

const completedTodosMock: Todo[] = [
  { task: 'clean the kitchen', completed: true, id: '1', creationDate: 'today' },
  { task: 'pay water bill', completed: true, id: '2', creationDate: 'tomorrow' },
];

const notCompletedTodosMock: Todo[] = [
  { task: 'call Tiago', completed: false, id: '3', creationDate: 'today' },
  { task: 'watch Star Wars', completed: false, id: '4', creationDate: 'tomorrow' },
];

describe('<Dashboard />', () => {
  test('It should render the AddTodo elements and the todos list', () => {
    const { getByTestId } = render(<Dashboard todos={[]} />);
    const addTodo = getByTestId('add-todo-input');
    const addTodoButton = getByTestId('add-todo-button');
    const todosList = getByTestId('todos-list');
    expect(addTodo).toBeInTheDocument();
    expect(addTodoButton).toBeInTheDocument();
    expect(todosList).toBeInTheDocument();
  });
  test('It should render all the received todos', () => {
    const allTodos = [...completedTodosMock, ...notCompletedTodosMock];
    const { getByText } = render(<Dashboard todos={allTodos} />);
    allTodos.forEach((todo) => {
      const todoItem = getByText(todo.task);
      expect(todoItem).toBeInTheDocument();
      if (todo.completed) {
        expect(todoItem.className).toContain(' todo-text-completed');
      } else {
        expect(todoItem.className).not.toContain(' todo-text-completed');
      }
    });
  });
});

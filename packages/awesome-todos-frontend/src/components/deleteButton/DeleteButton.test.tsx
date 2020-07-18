import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DeleteButton from './DeleteButton';

describe('<DeleteButton />', () => {
  const onClick = jest.fn();
  test('It should render', () => {
    const button = render(<DeleteButton onClick={onClick} />);
    expect(button).toMatchSnapshot();
  });
  test('It should call onClick', () => {
    const { getByTestId } = render(<DeleteButton onClick={onClick} />);
    const deleteTodoButton = getByTestId('delete-todo-button');
    fireEvent.click(deleteTodoButton);
    expect(onClick).toBeCalledTimes(1);
  });
});

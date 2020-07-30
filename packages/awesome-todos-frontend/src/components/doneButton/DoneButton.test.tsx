import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DoneButton from './DoneButton';

describe('<DoneButton />', () => {
  const onClick = jest.fn();
  test('It should render', () => {
    const button = render(<DoneButton onClick={onClick} />);
    expect(button).toMatchSnapshot();
  });
  test('It should call onClick', () => {
    const { getByTestId } = render(<DoneButton onClick={onClick} />);
    const doneTodoButton = getByTestId('done-todo-button');
    fireEvent.click(doneTodoButton);
    expect(onClick).toBeCalledTimes(1);
  });
});

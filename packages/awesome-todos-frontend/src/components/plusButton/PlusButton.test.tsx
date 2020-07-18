import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PlusButton from './PlusButton';

describe('<PlusButton />', () => {
  const onClick = jest.fn();
  test('It should render', () => {
    const button = render(<PlusButton onClick={onClick} />);
    expect(button).toMatchSnapshot();
  });
  test('It should call onClick', () => {
    const { getByTestId } = render(<PlusButton onClick={onClick} />);
    const button = getByTestId('add-todo-button');
    fireEvent.click(button);
    expect(onClick).toBeCalledTimes(1);
  });
});

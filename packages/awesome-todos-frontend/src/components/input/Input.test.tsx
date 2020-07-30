import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Input from './Input';

describe('<Input />', () => {
  const props = {
    name: 'task',
    value: '',
    onType: jest.fn(),
  };

  test('It should render', () => {
    const input = render(<Input {...props} />);
    expect(input).toMatchSnapshot();
  });
  test('It should call onType with value', () => {
    const { getByTestId } = render(<Input {...props} />);
    const input = getByTestId('input-field');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(props.onType).toHaveBeenCalledWith('test');
  });
});

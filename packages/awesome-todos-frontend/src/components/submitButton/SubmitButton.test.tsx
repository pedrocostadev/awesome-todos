import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SubmitButton from './SubmitButton';

describe('<SubmitButton />', () => {
  const props = {
    label: 'a label',
    onClick: jest.fn(),
  };

  test('It should render', () => {
    const button = render(<SubmitButton {...props} />);
    expect(button).toMatchSnapshot();
  });
  test('It should call onClick', () => {
    const { getByTestId, getByText } = render(<SubmitButton {...props} />);
    const button = getByTestId('submit-button');
    fireEvent.click(button);
    expect(props.onClick).toBeCalledTimes(1);
    expect(getByText(props.label)).toBeInTheDocument();
  });
});

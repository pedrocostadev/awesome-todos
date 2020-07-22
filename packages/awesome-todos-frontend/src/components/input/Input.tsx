import React, { ChangeEvent } from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  label?: string;
  name: string;
  value: string;
  onType(value: string): void;
}
const Input: React.FC<InputProps> = ({ onType, name, label, value, wrapperClassName, ...otherInputProps }) => {
  const onChangeValue = (ev: ChangeEvent<HTMLInputElement>): void => {
    onType(ev.target.value);
  };

  const labelText = label || `${name.substring(0, 1).toUpperCase()}${name.substring(1, name.length)}`;

  return (
    <div className={wrapperClassName || 'input-container'}>
      <label htmlFor={name}>{labelText}</label>
      <input
        className="input-field"
        {...otherInputProps}
        value={value}
        name={name}
        type={otherInputProps.type || 'text'}
        onChange={onChangeValue}
      />
    </div>
  );
};

export default Input;

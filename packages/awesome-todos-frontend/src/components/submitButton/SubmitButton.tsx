import React from 'react';
import './SubmitButton.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  className?: string;
  onClick(): void;
}
const SubmitButton: React.FC<Props> = ({ label, onClick, className }) => (
  <button
    data-testid="submit-button"
    className={className || 'submit-button'}
    onClick={(ev: React.MouseEvent<HTMLButtonElement>): void => {
      ev.preventDefault();
      onClick();
    }}
  >
    {label}
  </button>
);

export default SubmitButton;

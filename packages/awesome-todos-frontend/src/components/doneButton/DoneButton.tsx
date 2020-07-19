import React from 'react';
import DoneIcon from './DoneIcon';
import './DoneButton.css';

interface Props {
  onClick(): void;
  disabled?: boolean;
}

const DoneButton: React.FC<Props> = ({ onClick, disabled }) => {
  return (
    <button className="done-button" onClick={onClick} data-testid="done-todo-button" disabled={disabled}>
      <DoneIcon />
    </button>
  );
};

export default DoneButton;

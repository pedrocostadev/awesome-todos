import React from 'react';
import PlusIcon from './PlusIcon';
import './PlusButton.css';

interface Props {
  onClick(): void;
}

const PlusButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="plus-button" data-testid="add-todo-button">
      <PlusIcon />
    </button>
  );
};

export default PlusButton;

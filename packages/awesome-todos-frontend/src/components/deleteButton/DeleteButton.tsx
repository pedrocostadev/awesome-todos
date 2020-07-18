import React from 'react';
import DeleteIcon from './DeleteIcon';
import './DeleteButton.css';

interface Props {
  onClick(): void;
}

const DeleteButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button className="delete-button" onClick={onClick} data-testid="delete-todo-button">
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;

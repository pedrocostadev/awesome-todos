import React from 'react';
import './TodoItem.css';
import { Todo } from 'awesome-todos-types';
import DeleteButton from '../deleteButton/DeleteButton';
import { useMutation, queryCache } from 'react-query';
import awesomeTodosApiClient from '../../services/awesomeTodosApiClient';

interface TodoItemProps {
  todo: Todo;
}

const deleteTodo = (todo: Todo): Promise<void> => awesomeTodosApiClient.deleteTodo({ todo });

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [mutate] = useMutation(deleteTodo, {
    onSuccess: () => queryCache.invalidateQueries('todos'),
  });

  const onClick = (): void => {
    mutate(todo);
  };

  return (
    <div className="todo-item-container">
      <div className="todo-item">
        <span className="todo-text">{todo.task}</span>
        <DeleteButton onClick={onClick} />
      </div>
    </div>
  );
};

export default TodoItem;

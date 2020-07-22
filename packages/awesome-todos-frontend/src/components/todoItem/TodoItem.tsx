import React from 'react';
import './TodoItem.css';
import { Todo } from 'awesome-todos-types';
import DeleteButton from '../deleteButton/DeleteButton';
import { useMutation, queryCache } from 'react-query';
import awesomeTodosApiClient from '../../services/awesomeTodosApiClient';
import DoneButton from '../doneButton/DoneButton';

interface TodoItemProps {
  todo: Todo;
}

const deleteTodo = (todo: Todo): Promise<void> => awesomeTodosApiClient.todo.remove({ todo });

const updateTodo = (todo: Todo): Promise<void> => awesomeTodosApiClient.todo.remove({ todo });

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [mutateDelete] = useMutation(deleteTodo, {
    onSuccess: () => queryCache.invalidateQueries('todos'),
  });

  const [mutateUpdate] = useMutation(updateTodo, {
    onSuccess: () => queryCache.invalidateQueries('todos'),
  });

  const onClickDelete = (): void => {
    mutateDelete(todo);
  };

  const onClickDone = (): void => {
    mutateUpdate({ ...todo, completed: true });
  };

  return (
    <div className="todo-item-container">
      <div className="todo-item">
        <span className={`todo-text ${todo.completed ? 'todo-text-completed' : ''}`}>{todo.task}</span>
        <div className="todo-item-actions-container">
          {!todo.completed && <DoneButton disabled={todo.completed} onClick={onClickDone} />}
          <DeleteButton onClick={onClickDelete} />
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

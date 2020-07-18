import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useMutation, queryCache } from 'react-query';
import { Todo } from 'awesome-todos-types';

import awesomeTodosApiClient from '../../services/awesomeTodosApiClient';
import PlusButton from '../plusButton/PlusButton';
import './AddTodo.css';

const isValidTodoTask = (task: string | undefined): boolean => !!task && typeof task === 'string' && task.length > 1;

const addTodo = (todoTask: string): Promise<Todo> => awesomeTodosApiClient.addTodo({ todoTask });

const AddTodo: React.FC = () => {
  const [mutate] = useMutation(addTodo, {
    onSuccess: () => queryCache.invalidateQueries('todos'),
  });

  const [task, setTask] = useState<string>('');
  const onChange = (ev: ChangeEvent<HTMLInputElement>): void => setTask(ev.target.value);
  const cleanText = (): void => setTask('');
  const saveNewTodo = (): void => {
    if (!isValidTodoTask(task)) {
      return;
    }
    mutate(task as string);
    cleanText();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') {
      return;
    }
    saveNewTodo();
  };

  return (
    <div className="add-todo">
      <PlusButton onClick={saveNewTodo} />
      <input
        data-testid="add-todo-input"
        value={task}
        className="add-todo-input"
        type="text"
        name="addTodo"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default AddTodo;

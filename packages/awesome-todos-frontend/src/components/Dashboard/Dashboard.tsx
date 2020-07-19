import React from 'react';
import { useQuery } from 'react-query';

import './Dashboard.css';
import TodoItem from '../todoItem/TodoItem';
import AddTodo from '../addTodo/AddTodo';
import awesomeTodosApiClient from '../../services/awesomeTodosApiClient';
import { Todo } from 'awesome-todos-types';

const Dashboard: React.FC = () => {
  const { isLoading, error, data: todos } = useQuery('todos', () => awesomeTodosApiClient.getTodos());

  if (isLoading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>error {error.message}</p>;
  }

  const completedTodos = (todos as Todo[]).filter((todo) => todo.completed);
  const notCompletedTodos = (todos as Todo[])
    .filter((todo) => !todo.completed)
    .sort((a: Todo, b: Todo) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime());

  return (
    <main className="dashboard-container">
      <div className="add-todo-container">
        <AddTodo />
      </div>
      <div className="todos-wrapper">
        <div className="todos">
          {notCompletedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

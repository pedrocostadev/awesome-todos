import React from 'react';
import { useQuery } from 'react-query';
import { Redirect } from 'react-router-dom';

import awesomeTodosApiClient from '../../services/awesomeTodosApiClient';
import { Todo } from 'awesome-todos-types';
import './Dashboard.css';
import TodoItem from '../todoItem/TodoItem';
import AddTodo from '../addTodo/AddTodo';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { isLoading, error, data: todos } = useQuery('todos', awesomeTodosApiClient.todo.getAll, {
    retry: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Redirect to="/signIn" />;
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

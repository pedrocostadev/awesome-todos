import React from 'react';

import { Todo } from 'awesome-todos-types';
import './Dashboard.css';
import TodoItem from '../todoItem/TodoItem';
import AddTodo from '../addTodo/AddTodo';

interface Props {
  todos: Todo[];
}

const Dashboard: React.FC<Props> = ({ todos }) => {
  const completedTodos = todos.filter((todo) => todo.completed);
  const notCompletedTodos = todos
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

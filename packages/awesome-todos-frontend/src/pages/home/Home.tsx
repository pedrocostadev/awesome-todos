import React from 'react';
import { useQuery } from 'react-query';
import { Redirect } from 'react-router-dom';

import { Todo } from 'awesome-todos-types';
import awesomeTodosApiClient from '../../services/awesomeTodosApiClient';
import Dashboard from '../../components/dashboard/Dashboard';
import Header from '../../components/header/Header';
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';

const Home: React.FC = () => {
  const { isLoading, error, data: todos } = useQuery('todos', awesomeTodosApiClient.todo.getAll, {
    retry: false,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Redirect to="/signIn" />;
  }

  return (
    <div>
      <Header />
      <Dashboard todos={todos as Todo[]} />
    </div>
  );
};

export default Home;

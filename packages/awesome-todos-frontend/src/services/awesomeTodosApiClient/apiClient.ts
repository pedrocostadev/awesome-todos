import axios from 'axios';

console.log('process.env', process.env);

const apiClient = axios.create({
  baseURL: 'http://awesome-todos-20.herokuapp.com:8080/', // process.env.REACT_APP_API_URL || ':8080',
  withCredentials: true,
});

export default apiClient;

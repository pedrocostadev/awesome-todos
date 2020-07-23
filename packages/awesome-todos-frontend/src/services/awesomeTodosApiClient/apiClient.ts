import axios from 'axios';

console.log('process.env', process.env);

const apiClient = axios.create({
  baseURL: ':8080', // process.env.REACT_APP_API_URL || ':8080',
  withCredentials: true,
});

export default apiClient;

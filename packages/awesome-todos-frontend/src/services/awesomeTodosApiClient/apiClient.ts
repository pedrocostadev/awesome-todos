import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'localhost:8080',
  withCredentials: true,
});

export default apiClient;

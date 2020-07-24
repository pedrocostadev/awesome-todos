import axios from 'axios';

const apiClient = axios.create({
  // add 'baseURL' if api is not running on localhost
  withCredentials: true,
});

export default apiClient;

import axios from "axios";
import toast from 'react-hot-toast';

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // Generic way of error handling and using toast for a global error message
  if (!expectedError) {
    toast(error.response.data)
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

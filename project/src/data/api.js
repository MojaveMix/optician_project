import axios from "axios";
// Create an Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API's base URL
  timeout: 5000, // Optional: specify a timeout
});
// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Handle response errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optional: add error handling logic, like refreshing the token
    return Promise.reject(error);
  },
);

export default api;

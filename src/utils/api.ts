import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Authorization': process.env.NEXT_PUBLIC_API_KEY,
    'Content-Type': 'application/json',
  },
});


apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    // Handle errors globally
    console.error('API error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;

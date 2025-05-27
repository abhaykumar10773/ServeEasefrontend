import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:3000/api/v1',
  baseURL: import.meta.env.VITE_API_BASE_URL, //yha change nhi kna hai na hi variable name
  withCredentials: true,    //yha change nhi kna hai na hi variable name 
});

export default axiosInstance;

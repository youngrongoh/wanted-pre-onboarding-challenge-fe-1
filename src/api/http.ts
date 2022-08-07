import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URI,
});

http.interceptors.response.use(undefined, (error) => {
  console.error(error);
})

export default http;
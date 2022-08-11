import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URI,
});

http.interceptors.response.use(undefined, (error) => {
  console.error(error);
})

export const attachTokenOnReqestHeader = (token: string) => {
  http.defaults.headers.common = { Authorization: token };
}

const token = localStorage.getItem('wtd-obd_token');
if (token) {
  attachTokenOnReqestHeader(token);
}

export default http;
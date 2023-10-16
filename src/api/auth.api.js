import axios from 'axios';
import { endpoints } from './endpoints';

const BASE_URL = endpoints.main;

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST",
    "Content-Type": "application/json",
  },
});


export const login = (userData) => {
  return axiosInstance.post(`${BASE_URL}${endpoints.auth.login}`, userData);
};

export const logout = () => {
  return axiosInstance.post(`${BASE_URL}${endpoints.auth.logout}`);
};

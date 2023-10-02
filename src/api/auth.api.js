import axios from 'axios';
import { endpoints } from './endpoints';

const BASE_URL = endpoints.main;

const axiosInstance = axios.create({ withCredentials: true });

export const login = (userData) => {
  return axiosInstance.post(`${BASE_URL}${endpoints.auth.login}`, userData);
};

export const logout = () => {
  return axiosInstance.post(`${BASE_URL}${endpoints.auth.logout}`);
};

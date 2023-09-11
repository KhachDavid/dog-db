import axios from 'axios';
import { endpoints } from './endpoints';

const BASE_URL = endpoints.main;

export const login = (userData) => {
  return axios.post(`${BASE_URL}${endpoints.auth.login}`, userData);
};

export const logout = () => {
  return axios.post(`${BASE_URL}${endpoints.auth.logout}`);
};

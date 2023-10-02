import axios from 'axios';
import { endpoints } from './endpoints';

const BASE_URL = endpoints.main;

const axiosInstance = axios.create({ withCredentials: true });

export const fetchLocations = () => {
  return axiosInstance.get(`${BASE_URL}${endpoints.locations.post}`);
};

export const searchLocations = (queryParams) => {
  return axiosInstance.post(`${BASE_URL}${endpoints.locations.search}`, queryParams);
};

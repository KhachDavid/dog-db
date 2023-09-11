import axios from 'axios';
import { endpoints } from './endpoints';

const BASE_URL = endpoints.main;

export const fetchLocations = () => {
  return axios.get(`${BASE_URL}${endpoints.locations.post}`);
};

export const searchLocations = (queryParams) => {
  return axios.post(`${BASE_URL}${endpoints.locations.search}`, queryParams);
};

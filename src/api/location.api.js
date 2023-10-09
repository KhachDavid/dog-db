import axios from 'axios';
import { endpoints } from './endpoints';

const BASE_URL = endpoints.main;

const axiosInstance = axios.create({ withCredentials: true });

export const fetchLocations = (zipCodes) => {
  if (!Array.isArray(zipCodes) || zipCodes.length > 100) {
    throw new Error('zipCodes must be an array containing no more than 100 ZIP codes.');
  }

  return axiosInstance.post(`${BASE_URL}${endpoints.locations.post}`, zipCodes);
};

export const searchLocations = (queryParams) => {
  return axiosInstance.post(`${BASE_URL}${endpoints.locations.search}`, queryParams);
};

import axios from 'axios';
import { endpoints } from './endpoints';
import { zipCodeFromLocationSize } from '../constants/location.constants';

const BASE_URL = endpoints.main;

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST",
    "Content-Type": "application/json",
  },
});

export const fetchLocations = (zipCodes) => {
  if (!Array.isArray(zipCodes) || zipCodes.length > 100) {
    throw new Error('zipCodes must be an array containing no more than 100 ZIP codes.');
  }

  return axiosInstance.post(`${BASE_URL}${endpoints.locations.post}`, zipCodes);
};

export const searchLocations = (queryParams) => {
  queryParams.size = zipCodeFromLocationSize;
  return axiosInstance.post(`${BASE_URL}${endpoints.locations.search}`, queryParams);
};

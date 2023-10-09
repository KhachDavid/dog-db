import axios from 'axios';
import { endpoints } from './endpoints';
import { dogBatchCount } from '../constants/dog.constants';

const BASE_URL = endpoints.main;

const axiosInstance = axios.create({ withCredentials: true });

export const fetchBreeds = () => {
  return axiosInstance.get(`${BASE_URL}${endpoints.dogs.breeds}`);
};

export const searchDogs = (queryParams) => {
  //queryParams.sort = "breed:asc";
  queryParams.size = dogBatchCount;

  return axiosInstance.get(`${BASE_URL}${endpoints.dogs.search}`, { params: queryParams });
};

export const fetchDogsByIds = (dogIds) => {
  return axiosInstance.post(`${BASE_URL}${endpoints.dogs.post}`, dogIds);
};

export const matchDog = (dogIds) => {
  return axiosInstance.post(`${BASE_URL}${endpoints.dogs.match}`, dogIds);
};

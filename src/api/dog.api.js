import axios from 'axios';
import { endpoints } from './endpoints';

const BASE_URL = endpoints.main;

export const fetchBreeds = () => {
  return axios.get(`${BASE_URL}${endpoints.dogs.breeds}`);
};

export const searchDogs = (queryParams) => {
  return axios.get(`${BASE_URL}${endpoints.dogs.search}`, { params: queryParams });
};

export const fetchDogsByIds = (dogIds) => {
  return axios.post(`${BASE_URL}${endpoints.dogs.post}`, dogIds);
};

export const matchDog = (dogIds) => {
  return axios.post(`${BASE_URL}${endpoints.dogs.match}`, dogIds);
};

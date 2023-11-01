import axios from "axios";
import { endpoints } from "./endpoints";
import { dogBatchCount } from "../constants/dog.constants";

const BASE_URL = endpoints.main;

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST",
    "Content-Type": "application/json",
  },
});

export const fetchBreeds = () => {
  return axiosInstance.get(`${BASE_URL}${endpoints.dogs.breeds}`);
};

export const searchDogs = (queryParams, thisDogBatchCount = dogBatchCount) => {
  //queryParams.sort = "breed:asc";
  queryParams.size = thisDogBatchCount;

  return axiosInstance.get(`${BASE_URL}${endpoints.dogs.search}`, {
    params: queryParams,
  });
};

export const fetchDogsByIds = (dogIds) => {
  if (!Array.isArray(dogIds) || dogIds.length > 100) {
    throw new Error('dogIds must be an array containing no more than 100 ZIP codes.');
  }

  return axiosInstance.post(`${BASE_URL}${endpoints.dogs.post}`, dogIds);
};

export const matchDog = (dogIds) => {
  return axiosInstance.post(`${BASE_URL}${endpoints.dogs.match}`, dogIds);
};

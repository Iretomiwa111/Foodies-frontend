import axios from "axios";

const baseURL = import.meta.env.VITE_PUBLIC_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

export const privateApiClient = axios.create({
  baseURL,
  withCredentials: true,
});

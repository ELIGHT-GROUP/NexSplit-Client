// axiosClient.ts
import axios from "axios";
import { getAuthToken, removeAuthToken } from "./storage-functions";

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL || "",
  headers: { "Content-Type": "application/json" },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await removeAuthToken();
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

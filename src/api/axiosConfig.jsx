import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

export const baseUrl = "http://localhost:8080/api/v1";
// export const baseUrl = "https://airbnb-backend-872m.onrender.com/api/v1";


const exclude = [
  API_ENDPOINTS.LOGIN,
  API_ENDPOINTS.REGISTER,
];

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const skip = exclude.some((e) => config.url?.includes(e));
  if (!skip) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export default api;

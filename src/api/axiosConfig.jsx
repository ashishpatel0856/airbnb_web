import axios from "axios";

export const baseUrl = "http://localhost:8081/api/v1";

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/signup",
};

const excludeEndpoints = [API_ENDPOINTS.LOGIN, API_ENDPOINTS.REGISTER]; //  token for login/signup

const axiosConfig = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const shouldSkipToken = excludeEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );
    if (!shouldSkipToken) {
      const token = localStorage.getItem("token");
      if (token) config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login"; // redirect if unauthorized
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosConfig;

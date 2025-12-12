import axios from "axios";

export const baseUrl = "http://localhost:8080/api/v1";

export const API_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/signup",

  CREATE_HOTEL: "/admin/hotels/create",
  GET_ALL_HOTELS: "/admin/hotels",
  UPDATE_HOTEL: (id) => `/admin/hotels/${id}`,
  DELETE_HOTEL: (id) => `/admin/hotels/${id}`,
  ACTIVATE_HOTEL: (id) => `/admin/hotels/${id}`,
};
const exclude = [API_ENDPOINTS.LOGIN, API_ENDPOINTS.REGISTER];

const api = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true, // important for cookies if backend uses refresh tokens
});

// Attach token automatically
api.interceptors.request.use(
  (cfg) => {
    const skip = exclude.some((e) => cfg.url?.includes(e));
    if (!skip) {
      const token = localStorage.getItem("token");
      if (token) cfg.headers.Authorization = `Bearer ${token}`;
    }
    return cfg;
  },
  (err) => Promise.reject(err)
);

// Handle 401 centrally
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token"); // optional: auto logout
      // window.location.href = "/login"; // optional: redirect to login
    }
    return Promise.reject(err);
  }
);

export default api;
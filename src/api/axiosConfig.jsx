import axios from "axios";

export const baseUrl = "http://localhost:8080/api/v1"; // change if your backend port differs
export const API_ENDPOINTS = {

  //auth endpoints
  LOGIN: "/auth/login",
  REGISTER: "/auth/signup",
  REFRESH: "/auth/refresh",

    // Hotel endpoints
  CREATE_HOTEL: "/admin/hotels/create",
  GET_ALL_HOTELS: "/admin/hotels",
  GET_HOTEL: (id) => `/admin/hotels/${id}`,
  UPDATE_HOTEL: (id) => `/admin/hotels/${id}`,
  DELETE_HOTEL: (id) => `/admin/hotels/${id}`,
  ACTIVATE_HOTEL: (id) => `/admin/hotels/${id}`,
  GET_BOOKINGS: (id) => `/admin/hotels/${id}/bookings`,
  GET_REPORTS: (id) => `/admin/hotels/${id}/reports`,
};

const exclude = [API_ENDPOINTS.LOGIN, API_ENDPOINTS.REGISTER];

const api = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});

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

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Centralized error handling (expand as needed: show toasts, auto-refresh, etc.)
    if (err.response?.status === 401) {
      // optional: clear and redirect
      // localStorage.removeItem("token");
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;

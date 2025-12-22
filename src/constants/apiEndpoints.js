export const API_ENDPOINTS = {
  // AUTH
  LOGIN: "/auth/login",
  REGISTER: "/auth/signup",

  // PUBLIC (BROWSE)
  SEARCH_HOTELS: "/hotels/search",
  HOTEL_INFO: (id) => `/hotels/${id}/info`,

  // USER
  MY_BOOKINGS: "/users/myBookings",

  // BOOKINGS
  INIT_BOOKING: "/bookings/init",
  CANCEL_BOOKING: (id) => `/bookings/${id}/cancel`,
  PAYMENT: (id) => `/bookings/${id}/payments`,

  // ADMIN (future)
  CREATE_HOTEL: "/admin/hotels/create",
  GET_ALL_HOTELS: "/admin/hotels",
  HOTEL_BY_ID: (id) => `/admin/hotels/${id}`,
  ROOMS: (hotelId) => `/admin/hotels/${hotelId}/rooms`,
};

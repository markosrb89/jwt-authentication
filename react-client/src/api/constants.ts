const baseAPI = "/proxy/api/v1/users";
const baseAuthAPI = "/proxy/api/v1/auth";

// Login
export const LOGIN_API = `${baseAPI}/login`;

// Get users
export const GET_ALL_USERS = baseAPI;

// Get user
export const GET_USER = (userId: string) => `${baseAPI}/${userId}`;

// Register
export const REGISTER_API = baseAPI;

// Delete user
export const DELETE_USER = (userId: string) => `${baseAPI}/${userId}`;

// Refresh token
export const REFRESH_JWT = `${baseAuthAPI}/refresh`;

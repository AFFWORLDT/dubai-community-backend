import axios from "axios";
import { jwtDecode } from "jwt-decode";
import tokenStoreInstance from "./TokenStore";
import { clearCookies } from "./cookies";

interface DecodedToken {
  exp: number;
  iat?: number;
  sub?: string;
  [key: string]: any;
}

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL environment variable is not defined');
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const logout = () => {
  tokenStoreInstance.setToken(null);
  tokenStoreInstance.setRefreshToken(null);
  clearCookies();
};

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

// Interceptor to add token to headers
api.interceptors.request.use(
  async (config) => {
    const token = tokenStoreInstance.getToken();
  
    if (token) {
      if (isTokenExpired(token)) {
        // Token expired, handle refresh or logout
        const refreshToken = tokenStoreInstance.getRefreshToken();
        if (refreshToken) {
          // If you have a refresh token, try to refresh the access token
          try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/refresh-token`, {
              refreshToken,
            });
            const newAccessToken = response.data.accessToken;
            tokenStoreInstance.setToken(newAccessToken); // Store the new token
            config.headers.Authorization = `Bearer ${newAccessToken}`;
          } catch (error) {
            console.error('Error refreshing token:', error);
            logout();
            throw error;
          }
        } else {
          // If no refresh token, logout
          logout();
        }
      } else {
        // If token is valid, set it in the header
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

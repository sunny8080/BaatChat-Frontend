import axios from 'axios';
import { isDev } from '../utils/utils';

/**
 * Shared Axios client configured for backend API requests.
 *
 * Uses the API base URL from `VITE_BED_API_URL`, sends credentials with each
 * request, and applies a 10 second request timeout.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BED_API_URL,
  withCredentials: true,
  timeout: 10000, // timeout in ms
});

// Log backend error payloads before forwarding the rejection to callers.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (isDev) {
      console.error(error.response?.data);
    }
    return Promise.reject(error);
  },
);

/**
 * Backend authentication endpoint paths used by auth service requests.
 */
export const AUTH_ROUTES = {
  POST_REGISTER_USER: '/auth/register-user',
  POST_VERIFY_EMAIL: '/auth/verify-email',
  POST_LOGIN: '/auth/login',
  GET_LOGOUT: '/auth/logout',
  GET_ACCESS_TOKEN: '/auth/get-access-token',
  POST_RESEND_VERIFICATION_OTP: '/auth/resend-verification-otp',
  POST_FORGOT_PASSWORD: '/auth/forgot-password',
  POST_RESET_PASSWORD: '/auth/reset-password',
  POST_CHANGE_PASSWORD: '/auth/change-password',
  GET_CURRENT_USER: '/auth/me',
  GET_CHECK_USERNAME: '/auth/check-username',
};

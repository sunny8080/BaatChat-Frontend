import axios from 'axios';
import { isDev } from '../utils/utils';
import { getAccessToken } from './authService';
import toast from 'react-hot-toast';

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

/**
 * Handles API responses globally.
 *
 * Successful responses pass through unchanged. Failed responses log backend
 * payloads in development, refresh expired access tokens once, retry the
 * original request after a successful refresh, and clear session state with a
 * login redirect when refresh fails.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Log backend error payloads before forwarding the rejection to callers.
    if (isDev) {
      console.error(error.response?.data);
    }

    const originalRequest = error.config;

    // if access token is expired then silently call for new accessToken
    // also stop calling get access token api again by using _retry flag
    if (
      error.response?.data?.statusCode === 401 &&
      !originalRequest._retry &&
      error.response?.data?.message === 'Invalid access token'
    ) {
      originalRequest._retry = true;

      const res = await getAccessToken();

      if (res && res.success) {
        // refresh token is valid
        localStorage.setItem('accessToken', res.data.accessToken);

        // retry same api again
        return apiClient(originalRequest);
      } else {
        // refresh token is expired or Invalid
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        toast.error('Session expired, log in again');

        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
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
  POST_GOOGLE_CALLBACK: '/auth/google/callback',
  POST_COMPLETE_SOCIAL_SIGNUP: '/auth/complete-social-signup',
};

/**
 * Backend user endpoint paths used by user profile and search requests.
 */
export const USER_ROUTES = {
  POST_SEARCH_USERS: '/users/search-users',
  POST_GET_USER_DETAILS: '/users/get-user-details',
  POST_SEND_FRIEND_REQUEST: '/users/send-friend-request',
  POST_ACCEPT_FRIEND_REQUEST: '/users/accept-friend-request',
  POST_REJECT_FRIEND_REQUEST: '/users/reject-friend-request',
  POST_CANCEL_FRIEND_REQUEST: '/users/cancel-friend-request',
  PATCH_UPDATE_USER_DETAILS: '/users/update-user-details',
  GET_FETCH_RECEIVED_FRIEND_REQUESTS: '/users/fetch-received-friend-requests',
  GET_FETCH_FRIENDS: '/users/fetch-friends',
};

/**
 * Backend chat endpoint paths used by chat list and chat detail requests.
 */
export const CHAT_ROUTES = {
  GET_GET_CHATS: '/chats/get-chats',
  POST_GET_CHAT_DETAILS: '/chats/get-chat-details',
  POST_CREATE_GROUP: '/chats/create-group',
  PATCH_UPDATE_GROUP_DETAILS: '/chats/update-group-details',
  PATCH_ADD_MEMBER: '/chats/add-member',
  PATCH_LEAVE_GROUP: '/chats/leave-group',
  DELETE_DELETE_CHAT: '/chats/delete-chat',
};

// todo add js docs
export const MESSAGE_ROUTES = {
  POST_SEND_FILE: '/messages/send-file',
};

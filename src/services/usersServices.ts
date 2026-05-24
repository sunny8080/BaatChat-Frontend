import type ApiResponse from '../interfaces/ApiResponse';
import { apiClient, USER_ROUTES } from './api';
import toast from 'react-hot-toast';

/**
 * Searches users with the provided request payload.
 *
 * @param data - Search request payload sent to the users search endpoint.
 * @returns API response data from the search request, or the error response data when the request fails.
 */
export const searchUsers = async (data: any): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(USER_ROUTES.POST_SEARCH_USERS, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Fetches the details for a user by username.
 *
 * @param data - Payload containing the username to fetch details for.
 * @returns API response data from the user details request, or the error response data when the request fails.
 */
export const getUserDetails = async (data: { username: string }): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(USER_ROUTES.POST_GET_USER_DETAILS, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Sends a friend request to a user by username.
 *
 * @param data - Payload containing the username to send a friend request to.
 * @returns API response data from the friend request request, or the error response data when the request fails.
 */
export const sendFriendRequest = async (data: { username: string }): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(USER_ROUTES.POST_SEND_FRIEND_REQUEST, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Accepts a friend request from a user by username.
 *
 * @param data - Payload containing the username whose friend request should be accepted.
 * @returns API response data from the accept request, or the error response data when the request fails.
 */
export const acceptFriendRequest = async (data: { username: string }): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(USER_ROUTES.POST_ACCEPT_FRIEND_REQUEST, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Rejects a friend request from a user by username.
 *
 * @param data - Payload containing the username whose friend request should be rejected.
 * @returns API response data from the reject request, or the error response data when the request fails.
 */
export const rejectFriendRequest = async (data: { username: string }): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(USER_ROUTES.POST_REJECT_FRIEND_REQUEST, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Cancels a pending friend request sent to a user by username.
 *
 * @param data - Payload containing the username whose pending friend request should be cancelled.
 * @returns API response data from the cancel request, or the error response data when the request fails.
 */
export const cancelFriendRequest = async (data: { username: string }): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(USER_ROUTES.POST_CANCEL_FRIEND_REQUEST, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Fetches friend requests received by the current user.
 *
 * @returns API response data from the received friend requests request, or the error response data when the request fails.
 */
export const fetchReceivedFriendRequest = async (): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.get(USER_ROUTES.GET_FETCH_RECEIVED_FRIEND_REQUESTS);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Fetches accepted friends for the current user.
 *
 * @returns API response data from the friends request, or the error response data when the request fails.
 */
export const fetchFriends = async (): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.get(USER_ROUTES.GET_FETCH_FRIENDS);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

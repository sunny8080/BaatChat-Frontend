import type ApiResponse from '../interfaces/ApiResponse';
import { apiClient, AUTH_ROUTES } from './api';
import toast from 'react-hot-toast';

/**
 * Checks whether a username is available for registration.
 *
 * @param username - Username to validate.
 * @returns API response as {@link ApiResponse} containing the username availability result.
 */
export const checkUsernameAvailability = async (username: string): Promise<ApiResponse> => {
  try {
    const res = await apiClient.get<ApiResponse>(AUTH_ROUTES.GET_CHECK_USERNAME + '?username=' + username);
    return res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    return error?.response?.data;
  }
};

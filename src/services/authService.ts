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
    const res = await apiClient.get(AUTH_ROUTES.GET_CHECK_USERNAME + '?username=' + username);
    return res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    return error?.response?.data;
  }
};

/**
 * Logs in a user with the provided credentials
 *
 * @param data - Login credentials payload (ussername/email + password).
 * @returns API response as {@link ApiResponse} containing the login result.
 */
export const loginUser = async (data: any): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(AUTH_ROUTES.POST_LOGIN, data);
    // TODO - setup auth context and zustand store if needed
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Registers a new user account. It'll register user but not verify email, so user will be considered as non login
 *
 * @param data - Signup payload containing the new user details.
 * @returns API response as {@link ApiResponse} containing the registration result.
 */
export const signUpUser = async (data: any): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(AUTH_ROUTES.POST_REGISTER_USER, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Resends the signup email verification OTP.
 *
 * @param data - Payload required to resend the verification OTP.
 * @returns API response as {@link ApiResponse} containing the OTP resend result.
 */
export const resendSignUpOtp = async (data: any): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(AUTH_ROUTES.POST_RESEND_VERIFICATION_OTP, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Verifies a user's email address with the provided OTP payload.
 *
 * @param data - Email verification payload.
 * @returns API response as {@link ApiResponse} containing the email verification result.
 */
export const verifyEmail = async (data: any): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(AUTH_ROUTES.POST_VERIFY_EMAIL, data);
    // TODO - setup auth context and zustand store if needed
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

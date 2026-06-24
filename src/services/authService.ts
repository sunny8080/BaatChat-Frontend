import type ApiResponse from '../interfaces/ApiResponse';
import { functionalCookiesAllowed, setCookie } from '../utils/utils';
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
    // TODO - setup zustand store if needed
    if (res.data && res.data.success) {
      localStorage.setItem('accessToken', res.data?.data?.accessToken);
      localStorage.setItem('userId', res.data.data?.user?.id);
      if (functionalCookiesAllowed()) {
        setCookie('loginType', res.data.data?.user?.loginType);
      }
    }
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
    // TODO - setup zustand store if needed
    if (res.data && res.data.success) {
      localStorage.setItem('accessToken', res.data?.data?.accessToken);
      localStorage.setItem('userId', res.data.data?.user?.id);
      if (functionalCookiesAllowed()) {
        setCookie('loginType', res.data.data?.user?.loginType);
      }
    }
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Sends a password reset link for the provided account payload.
 *
 * @param data - Forgot password request payload.
 * @returns API response as {@link ApiResponse} containing the password reset request result.
 */
export const forgotPassword = async (data: any): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(AUTH_ROUTES.POST_FORGOT_PASSWORD, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Resets a user's password with the provided reset payload.
 *
 * @param data - Password reset payload.
 * @returns API response as {@link ApiResponse} containing the password reset result.
 */
export const resetPassword = async (data: any): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(AUTH_ROUTES.POST_RESET_PASSWORD, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Fetches the currently authenticated user's profile. Uses cookies to get user details
 *
 * @returns API response as {@link ApiResponse} containing the current user data.
 */
export const getCurrentUser = async (): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.get(AUTH_ROUTES.GET_CURRENT_USER);
    response = res.data;
  } catch (error: any) {
    const isLimitError = error?.response?.data?.statusCode === 429 || error.status === 429;
    if (!isLimitError) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
    }
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Logs out the currently authenticated user.
 *
 * @returns API response as {@link ApiResponse} containing the logout result.
 */
export const logOutUser = async (): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.get(AUTH_ROUTES.GET_LOGOUT);
    if (res.data && res.data.success) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
    }
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Changes the currently authenticated user's password and log out after successful change.
 *
 * @param data - Password change payload containing the current and new password details.
 * @returns API response as {@link ApiResponse} containing the password change result.
 */
export const changePassword = async (data: any): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(AUTH_ROUTES.POST_CHANGE_PASSWORD, data);
    if (res.data && res.data.success) {
      // logout user
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
    }
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Requests a fresh access token for the current authenticated session, if current access token is expired.
 *
 * @returns API response as {@link ApiResponse} containing the access token result.
 */
export const getAccessToken = async (): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.get(AUTH_ROUTES.GET_ACCESS_TOKEN);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

// todo add js docs
export const googleCallback = async (data: any): Promise<ApiResponse> => {
  let response = null;

  try {
    const toastLoading = toast.loading('Loading your profile...');
    const res = await apiClient.post(AUTH_ROUTES.POST_GOOGLE_CALLBACK, data);
    toast.remove(toastLoading);
    if (res.data && res.data.success && res.data?.data?.accessToken) {
      // signin user
      localStorage.setItem('accessToken', res.data?.data?.accessToken);
      localStorage.setItem('userId', res.data.data?.user?.id);
      if (functionalCookiesAllowed()) {
        setCookie('loginType', res.data.data?.user?.loginType);
      }
    }
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

// todo add js docs
export const completeSocialSignup = async (data: any): Promise<ApiResponse> => {
  let response = null;

  try {
    const signUpGoogleToken = sessionStorage.getItem('signUpGoogleToken');
    if (!signUpGoogleToken) {
      toast.error('Something went wrong!');
      window.location.reload();
    }

    const res = await apiClient.post(AUTH_ROUTES.POST_COMPLETE_SOCIAL_SIGNUP, data, {
      headers: {
        Authorization: `Bearer ${signUpGoogleToken}`,
      },
    });
    if (res.data && res.data.success) {
      localStorage.setItem('accessToken', res.data?.data?.accessToken);
      localStorage.setItem('userId', res.data.data?.user?.id);
      if (functionalCookiesAllowed()) {
        setCookie('loginType', res.data.data?.user?.loginType);
      }
    }
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

import toast from 'react-hot-toast';
import type ApiResponse from '../interfaces/ApiResponse';
import { apiClient, CHAT_ROUTES } from './api';

/**
 * Fetches the list of chats for the current user.
 *
 * @returns API response as {@link ApiResponse} containing the user's chat list.
 */
export const getChatList = async (): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.get(CHAT_ROUTES.GET_GET_CHATS);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

/**
 * Fetches details for a specific chat.
 *
 * @param data - Payload containing the chat ID to fetch details for.
 * @returns API response as {@link ApiResponse} containing the chat details.
 */
export const getChatDetails = async (data: {
  chatId: string;
  nextCursor?: string;
}): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(CHAT_ROUTES.POST_GET_CHAT_DETAILS, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

// todo add js docs
export const createGroup = async (data: any): Promise<ApiResponse> => {
  let response = null;
  try {
    const res = await apiClient.post(CHAT_ROUTES.POST_CREATE_GROUP, data);
    response = res.data;
  } catch (error: any) {
    toast.error(error?.response?.data?.message || 'Something went wrong!');
    response = error?.response?.data;
  }
  return response;
};

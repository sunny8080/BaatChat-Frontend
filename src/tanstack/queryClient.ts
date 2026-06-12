import { QueryClient } from '@tanstack/react-query';
import type MessageInterface from '../interfaces/MessageInterface';

/**
 * Shared TanStack Query client used by the frontend to manage server-state
 * caching, background refetching, and query invalidation.
 */
export const queryClient = new QueryClient();

/**
 * Appends a newly received message to the cached chat details query.
 *
 * @param chatId - ID of the chat whose cached messages should be updated.
 * @param msg - Message to append to the cached chat details.
 */
export const addMessageInCache = (chatId: string, msg: MessageInterface) => {
  queryClient.setQueryData(['chatDetails', chatId], (old: any) => {
    if (!old) return old;
    return {
      ...old,
      messages: [...(old.messages ?? []), msg],
    };
  });
};

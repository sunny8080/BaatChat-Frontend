import { QueryClient } from '@tanstack/react-query';
import type MessageInterface from '../interfaces/MessageInterface';
import type UserInterface from '../interfaces/UserInterface';

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

// todo add js docs
export const removeMessageInCache = (chatId: string, msgId: string) => {
  queryClient.setQueryData(['chatDetails', chatId], (old: any) => {
    if (!old) return old;
    const messages = old.messages?.filter(({ id }: MessageInterface) => id !== msgId) ?? [];

    return {
      ...old,
      messages,
    };
  });
};

// todo add js docs
export const updateActiveMembersInCache = (chatId: string, activeMembers: UserInterface[]) => {
  queryClient.setQueryData(['chatDetails', chatId], (old: any) => {
    if (!old) return old;

    return {
      ...old,
      activeMembers,
    };
  });
};

// todo add js docs
export const removeAllMessageInCache = (chatId: string) => {
  queryClient.setQueryData(['chatDetails', chatId], (old: any) => {
    if (!old) return old;
    return {
      ...old,
      messages: [],
    };
  });
};

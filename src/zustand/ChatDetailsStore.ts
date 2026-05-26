import { create } from 'zustand';
import type { ChatDetailsInterface } from '../interfaces/ChatDetailsInterface';
import type MessageInterface from '../interfaces/MessageInterface';

type ChatDetailsState = {
  chatDetails: ChatDetailsInterface | null;
  isLoading: boolean;
  error: string | null;

  setChatDetails: (chatDetails: ChatDetailsInterface | null) => void;
  updateChatDetails: (chatDetails: Partial<ChatDetailsInterface>) => void;
  setMessages: (messages: MessageInterface[]) => void;
  addMessage: (message: MessageInterface) => void;
  upsertMessage: (message: MessageInterface) => void;
  removeMessage: (messageId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearChatDetails: () => void;
};

/**
 * Zustand store for the active chat details view.
 *
 * Holds the selected chat, loading/error state, and message helpers for
 * replacing, appending, upserting, and removing messages while keeping
 * last-message metadata in sync.
 */
export const useChatDetailsStore = create<ChatDetailsState>()((set) => ({
  chatDetails: null,
  isLoading: false,
  error: null,

  setChatDetails: (chatDetails) => set({ chatDetails, error: null }),

  updateChatDetails: (chatDetails) => {
    return set((state) => ({
      chatDetails: state.chatDetails
        ? {
            ...state.chatDetails,
            ...chatDetails,
          }
        : null,
    }));
  },

  setMessages: (messages) => {
    return set((state) => ({
      chatDetails: state.chatDetails
        ? {
            ...state.chatDetails,
            messages,
          }
        : null,
    }));
  },

  addMessage: (message) => {
    return set((state) => ({
      chatDetails: state.chatDetails
        ? {
            ...state.chatDetails,
            messages: [...state.chatDetails.messages, message],
            lastMessage: message,
            lastMessageAt: message.createdAt ?? state.chatDetails.lastMessageAt,
          }
        : null,
    }));
  },

  upsertMessage: (message) => {
    return set((state) => {
      if (!state.chatDetails) return { chatDetails: null };

      const messages = state.chatDetails.messages;
      const messageIndex = messages.findIndex(({ id }) => id === message.id);

      if (messageIndex === -1) {
        return {
          chatDetails: {
            ...state.chatDetails,
            messages: [...messages, message],
            lastMessage: message,
            lastMessageAt: message.createdAt ?? state.chatDetails.lastMessageAt,
          },
        };
      }

      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = {
        ...updatedMessages[messageIndex],
        ...message,
      };

      return {
        chatDetails: {
          ...state.chatDetails,
          messages: updatedMessages,
          lastMessage:
            state.chatDetails.lastMessage?.id === message.id
              ? updatedMessages[messageIndex]
              : state.chatDetails.lastMessage,
        },
      };
    });
  },

  removeMessage: (messageId) => {
    return set((state) => {
      if (!state.chatDetails) return { chatDetails: null };

      const messages = state.chatDetails.messages.filter(({ id }) => id !== messageId);
      const lastMessage =
        state.chatDetails.lastMessage?.id === messageId
          ? messages.at(-1)
          : state.chatDetails.lastMessage;

      return {
        chatDetails: {
          ...state.chatDetails,
          messages,
          lastMessage,
          lastMessageAt: lastMessage?.createdAt ?? state.chatDetails.lastMessageAt,
        },
      };
    });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  clearChatDetails: () => {
    return set({
      chatDetails: null,
      isLoading: false,
      error: null,
    });
  },
}));

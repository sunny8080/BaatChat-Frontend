import { create } from 'zustand';
import type { ChatDetailsInterface } from '../interfaces/ChatDetailsInterface';
import type MessageInterface from '../interfaces/MessageInterface';
import type UserInterface from '../interfaces/UserInterface';
import { useChatListStore } from './ChatListStore';

type ChatDetailsState = {
  chatDetails: ChatDetailsInterface | null;
  isLoading: boolean;
  error: string | null;
  newMsgAdded: boolean;
  typingUsers: UserInterface[];
  typingTimeouts: Map<string, ReturnType<typeof setTimeout>>;

  setChatDetails: (chatDetails: ChatDetailsInterface | null) => void;
  updateChatDetails: (chatDetails: Partial<ChatDetailsInterface>) => void;
  setMessages: (messages: MessageInterface[]) => void;
  addMessage: (message: MessageInterface) => void;
  addPreviousMessage: (messages: MessageInterface[], nextCursor: string) => void;
  upsertMessage: (message: MessageInterface) => void;
  updateTempMessage: (message: MessageInterface, tempMsgId: string) => void;
  removeMessage: (messageId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearChatDetails: () => void;
  setNewMsgAdded: (newMsgAdded: boolean) => void;

  updateMessageSeenBy: (msgId: string, seenBy: UserInterface, seenAt: string) => void;
  updateMessageDeliveredTo: (
    msgId: string,
    deliveredTo: UserInterface,
    deliveredAt: string,
  ) => void;
  updateTypingUsers: (user: UserInterface, isTyping: boolean) => void;
  setTypingTimeouts: (timeout: number | null, userId: string) => void;
  updateChatOnlinePresence: (userId: string, isOnline: boolean) => void;
};

/**
 * Zustand store for the active chat details view.
 *
 * Holds the selected chat, loading/error state, and message helpers for
 * replacing, appending, upserting, and removing messages while keeping
 * last-message metadata in sync.
 */
export const useChatDetailsStore = create<ChatDetailsState>()((set, get) => ({
  chatDetails: null,
  isLoading: false,
  error: null,
  newMsgAdded: false,
  typingUsers: [],
  typingTimeouts: new Map(),

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

  addPreviousMessage: (messages, nextCursor) => {
    return set((state) => ({
      chatDetails: state.chatDetails
        ? {
            ...state.chatDetails,
            messages: [...messages, ...state.chatDetails.messages],
            nextCursor,
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

  updateTempMessage: (message, tempMsgId) => {
    if (!message || !message.id || !tempMsgId) return;

    return set((state) => {
      if (!state.chatDetails) return { chatDetails: null };
      return {
        chatDetails: {
          ...state.chatDetails,
          messages: state.chatDetails?.messages.map((msg) =>
            msg.id === tempMsgId ? message : msg,
          ),
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

      // update chat list store
      const { updateLastMessage } = useChatListStore.getState();
      if (lastMessage?.id && lastMessage?.id !== state.chatDetails.lastMessage?.id) {
        updateLastMessage(state.chatDetails.id, lastMessage!);
      }

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

  setNewMsgAdded: (newMsgAdded) => set({ newMsgAdded }),

  updateMessageSeenBy: (msgId, seenBy, seenAt) => {
    return set((state) => ({
      chatDetails: state.chatDetails
        ? {
            ...state.chatDetails,
            messages: state.chatDetails.messages.map((msg) => {
              if (msg.id !== msgId) return msg;
              else {
                return {
                  ...msg,
                  seenBy: [...(msg.seenBy || []), { user: seenBy, seenAt }],
                };
              }
            }),
          }
        : null,
    }));
  },

  updateMessageDeliveredTo: (msgId, deliveredTo, deliveredAt) => {
    return set((state) => ({
      chatDetails: state.chatDetails
        ? {
            ...state.chatDetails,
            messages: state.chatDetails.messages.map((msg) => {
              if (msg.id !== msgId) return msg;
              else {
                return {
                  ...msg,
                  deliveredTo: [...(msg.deliveredTo || []), { user: deliveredTo, deliveredAt }],
                };
              }
            }),
          }
        : null,
    }));
  },

  updateTypingUsers: (user, isTyping) => {
    return set((state) => {
      let updatedTypingUsers: UserInterface[] = state.typingUsers;

      if (isTyping) {
        updatedTypingUsers = updatedTypingUsers.some(({ id }) => id === user.id)
          ? updatedTypingUsers
          : [...updatedTypingUsers, user];
      } else {
        updatedTypingUsers = updatedTypingUsers.filter(({ id }) => id !== user.id);
      }
      return { typingUsers: updatedTypingUsers };
    });
  },

  setTypingTimeouts: (timeout, userId) => {
    set((state) => {
      const updatedTypingTimeout = new Map(state.typingTimeouts);
      if (timeout) {
        updatedTypingTimeout.set(userId, timeout);
      } else {
        updatedTypingTimeout.delete(userId);
      }
      return { typingTimeouts: updatedTypingTimeout };
    });
  },

  updateChatOnlinePresence: (userId, isOnline) => {
    return set((state) => {
      return {
        chatDetails: state.chatDetails
          ? {
              ...state.chatDetails,
              activeMembers: state.chatDetails.activeMembers?.map((mem) =>
                mem.id === userId ? { ...mem, isOnline } : mem,
              ),
              friend: state.chatDetails.friend
                ? { ...state.chatDetails.friend, isOnline }
                : undefined,
            }
          : null,
      };
    });
  },
}));

import { create } from 'zustand';
import type ChatInterface from '../interfaces/ChatInterface';
import { ChatTypes } from '../utils/constant';
import type UserInterface from '../interfaces/UserInterface';
import type { ChatDetailsInterface } from '../interfaces/ChatDetailsInterface';
import { useChatDetailsStore } from './ChatDetailsStore';
import type MessageInterface from '../interfaces/MessageInterface';
import { queryClient } from '../tanstack/queryClient';

type ChatLIstState = {
  chats: ChatInterface[];
  selectedChatId: string;
  isLoading: boolean;
  error: string | null;
  chatFetched: boolean;

  // actions
  setChatFetched: (chatFetched: boolean) => void;
  setChats: (newChats: ChatInterface[]) => void;
  addChat: (newChat: ChatInterface) => void;
  upsertChat: (newChat: ChatInterface) => void;
  removeChat: (chatId: string) => void;
  setSelectedChatId: (chatId: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearChatLIst: () => void;
  startChat: (user: UserInterface) => void;
  updateUnreadCount: (chatId: string, unreadCount: number) => void;
  updateLastMessage: (chatId: string, lastMessage: MessageInterface) => void;
  updateOnlinePresence: (userId: string, isOnline: boolean) => void;
};

/**
 * Zustand store for chat-list state and actions.
 *
 * Keeps chats sorted by latest activity, tracks list filters/search text,
 * handles selected chat state, and exposes `getFilteredChats` for deriving
 * the visible chat list from the current filter and search query.
 */
export const useChatListStore = create<ChatLIstState>()((set) => ({
  chats: [],
  selectedChatId: '',
  searchText: '',
  currentChatFilter: 'all',
  isLoading: false,
  error: null,
  chatFetched: false,

  // actions
  setChatFetched: (chatFetched: boolean) => set({ chatFetched }),
  setChats: (newChats) => set({ chats: sortChats(newChats), error: null }),
  addChat: (newChat) => set((state) => ({ chats: sortChats([...state.chats, newChat]) })),

  upsertChat: (newChat) => {
    return set((state) => {
      const chatInd = state.chats.findIndex(({ id }) => id === newChat.id);
      if (chatInd === -1) {
        return { chats: sortChats([...state.chats, newChat]) };
      } else {
        const updatedChats = [...state.chats];
        updatedChats[chatInd] = { ...updatedChats[chatInd], ...newChat };
        return { chats: sortChats(updatedChats) };
      }
    });
  },

  removeChat: (chatId) => {
    return set((state) => ({
      chats: state.chats.filter(({ id }) => id !== chatId),
      selectedChatId: state.selectedChatId === chatId ? '' : state.selectedChatId,
    }));
  },

  setSelectedChatId: (chatId) => set({ selectedChatId: chatId }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  clearChatLIst: () => {
    return set({
      chats: [],
      selectedChatId: '',
      isLoading: false,
      error: null,
    });
  },

  startChat: (user) => {
    // start chat when users clicks on chat button
    const tempChatId = `personal-${user.id}`;

    return set((state) => {
      // check if there is already existing personal chat with that user
      const existingChat = state.chats.find(
        (chat) =>
          chat.type === ChatTypes.PERSONAL &&
          (chat.id === tempChatId ||
            (chat.name === user.name && chat.avatarUrl === user.avatarUrl)),
      );

      if (existingChat) return { selectedChatId: existingChat.id };

      // if chat doesn't exist, create new temporary chat list item and temp chat details
      const newChat: ChatInterface = {
        id: tempChatId,
        type: ChatTypes.PERSONAL,
        name: user.name!,
        avatarUrl: user.avatarUrl!,
        isOnline: user.isOnline,
        unreadCount: 0,
      };

      const tempChatDetails: ChatDetailsInterface = {
        ...newChat,
        createdBy: user.id,
        messages: [],
        friend: user,
      };

      // create new chat details, and store it in query data
      queryClient.setQueryData(['chatDetails', tempChatId], tempChatDetails);
      // useChatDetailsStore.getState().setChatDetails(tempChatDetails);

      return {
        chats: [newChat, ...state.chats],
        selectedChatId: tempChatId,
      };
    });
  },

  updateUnreadCount: (chatId, unreadCount) => {
    if (!chatId || unreadCount === undefined) return;
    return set((state) => {
      return {
        chats: state.chats.map((chat) => (chat.id === chatId ? { ...chat, unreadCount } : chat)),
      };
    });
  },

  updateLastMessage: (chatId, lastMessage) => {
    return set((state) => {
      return {
        chats: sortChats(
          state.chats.map((chat) =>
            chat.id === chatId
              ? { ...chat, lastMessage, lastMessageAt: lastMessage.createdAt }
              : chat,
          ),
        ),
      };
    });
  },

  updateOnlinePresence: (userId, isOnline) => {
    return set((state) => {
      return {
        chats: state.chats.map((chat) =>
          chat.type === ChatTypes.PERSONAL &&
          (chat.activeMembers![0].id === userId || chat.activeMembers![1].id === userId)
            ? { ...chat, isOnline }
            : chat,
        ),
      };
    });
  },
}));

const sortChats = (chats: ChatInterface[]) => {
  return chats.toSorted((a, b) => {
    const aTime = a.lastMessageAt ? Date.parse(a.lastMessageAt) : 0;
    const bTime = b.lastMessageAt ? Date.parse(b.lastMessageAt) : 0;
    return bTime - aTime;
  });
};

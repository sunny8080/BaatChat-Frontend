import { create } from 'zustand';

type UsersState = {
  selectedFriendUsername: string;
  selectedSearchUserUsername: string;

  // actions
  setSelectedFriendUsername: (selectedFriendUsername: string) => void;
  setSelectedSearchUserUsername: (selectedSearchUserUsername: string) => void;
};

/**
 * Zustand store for tracking the user currently selected in friend and search contexts.
 *
 * Exposes the selected friend username, selected search result username, and setters for
 * updating each value.
 */
export const useUsersStore = create<UsersState>((set) => ({
  selectedFriendUsername: '',
  selectedSearchUserUsername: '',

  // actions
  setSelectedFriendUsername: (selectedFriendUsername) => set({ selectedFriendUsername }),
  setSelectedSearchUserUsername: (selectedSearchUserUsername) =>
    set({ selectedSearchUserUsername }),
}));

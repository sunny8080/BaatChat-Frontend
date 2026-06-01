import { create } from 'zustand';
import type UserInterface from '../interfaces/UserInterface';

type UsersState = {
  // friends details
  friends: UserInterface[] | null;
  selectedFriend: UserInterface | null;
  fetchingUserDetails: boolean;

  // friend request details
  receivedFriendReq: any[] | null;
  selectedSearchUser: UserInterface | null;

  // actions
  setFriends: (friends: UserInterface[]) => void;
  setSelectedFriend: (selectedFriend: UserInterface | null) => void;
  setFetchingUserDetails: (fetchingUserDetails: boolean) => void;
  setReceivedFriendReq: (receivedFriendReq: any) => void;
  setSelectedSearchUser: (selectedSearchUser: UserInterface | null) => void;
};

// todo add js docs
export const useUsersStore = create<UsersState>((set) => ({
  // friends details
  friends: null,
  selectedFriend: null,
  fetchingUserDetails: false,

  // friend request details
  receivedFriendReq: null,
  selectedSearchUser: null,

  // actions
  setFriends: (friends) => set({ friends }),
  setSelectedFriend: (selectedFriend) => set({ selectedFriend }),
  setFetchingUserDetails: (fetchingUserDetails) => set({ fetchingUserDetails }),
  setReceivedFriendReq: (receivedFriendReq) => set({ receivedFriendReq }),
  setSelectedSearchUser: (selectedSearchUser) => set({ selectedSearchUser }),
}));

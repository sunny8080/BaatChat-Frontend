import type { UserLoginType, FriendshipStatusType } from '../utils/constant';

// todo write js docs
export default interface UserInterface {
  id: string;
  name: string;
  bio: string;
  username: string;
  avatarUrl: string;
  email?: string;
  phone?: string;
  isEmailVerified?: boolean;
  loginType?: UserLoginType;
  lastSeenAt?: string;
  createdAt?: string;
  updatedAt?: string;
  isOnline?: boolean;
  status: FriendshipStatusType;
}

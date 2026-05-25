import type { UserLoginType, FriendshipStatusType } from '../utils/constant';

type UserRef = string | UserInterface;

/**
 * Represents a user profile returned by the application.
 *
 * @property id - Unique identifier for the user.
 * @property name - Display name for the user.
 * @property bio - Short profile biography.
 * @property username - Unique username used for search and mentions.
 * @property avatarUrl - URL of the user's avatar image.
 * @property email - User's email address.
 * @property phone - User's phone number.
 * @property isEmailVerified - Whether the user's email address has been verified.
 * @property loginType - Authentication method used by the user.
 * @property lastSeenAt - Timestamp for when the user was last active.
 * @property createdAt - Timestamp for when the user account was created.
 * @property updatedAt - Timestamp for when the user account was last updated.
 * @property isOnline - Whether the user is currently online.
 * @property status - Friendship status relative to the current user.
 * @property friends - Users or user IDs connected as friends.
 * @property blockedUsers - Users or user IDs blocked by this user.
 */
export default interface UserInterface {
  id: string;
  name?: string;
  bio?: string;
  username?: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  isEmailVerified?: boolean;
  loginType?: UserLoginType;
  lastSeenAt?: string;
  createdAt?: string;
  updatedAt?: string;
  isOnline?: boolean;
  status?: FriendshipStatusType;
  friends?: UserRef[];
  blockedUsers?: UserRef[];
}

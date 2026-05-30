/**
 * Supported login providers used by the user authentication flow.
 *
 * @readonly
 * @enum {string}
 */
export const UserLoginTypes = {
  GOOGLE: 'GOOGLE',
  GITHUB: 'GITHUB',
  FACEBOOK: 'FACEBOOK',
  EMAIL_PASSWORD: 'EMAIL_PASSWORD',
} as const;

/**
 * Union type of all supported user login provider values.
 */
export type UserLoginType = (typeof UserLoginTypes)[keyof typeof UserLoginTypes];

/**
 * Possible states for a friendship relationship or friend request.
 *
 * @readonly
 * @enum {string}
 */
export const FriendshipStatus = {
  PENDING: 'pending', // user A sends req to B, so it's pending with B
  REQUESTED: 'requested', // user B will get requested
  ACCEPTED: 'accepted', // if B accept req, then they will be friends and status will be accepted
  REJECTED: 'rejected',
  BLOCKED: 'blocked',
} as const;

/**
 * Union type of all supported friendship status values.
 */
export type FriendshipStatusType = (typeof FriendshipStatus)[keyof typeof FriendshipStatus];

/**
 * Supported chat conversation types.
 *
 * @readonly
 * @enum {string}
 */
export const ChatTypes = {
  PERSONAL: 'personal',
  GROUP: 'group',
} as const;

/**
 * Union type of all supported chat conversation type values.
 */
export type ChatType = (typeof ChatTypes)[keyof typeof ChatTypes];

/**
 * Supported message content types.
 *
 * @readonly
 * @enum {string}
 */
export const MessageTypes = {
  TEXT: 'text',
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  FILE: 'file',
  NOTIFICATION: 'notification',
} as const;

/**
 * Union type of all supported message content type values.
 */
export type MessageType = (typeof MessageTypes)[keyof typeof MessageTypes];

/**
 * Supported filters for the chat list view.
 *
 * @readonly
 * @enum {string}
 */
export const ChatListFilterTypes = {
  ALL: 'all',
  UNREAD: 'unread',
  GROUPS: 'groups',
} as const;

/**
 * Union type of all supported chat list filter values.
 */
export type ChatListFilterType = (typeof ChatListFilterTypes)[keyof typeof ChatListFilterTypes];

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

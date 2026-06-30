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

// todo add js docs
export const DELETE_FOR_EVERYONE_WINDOW = 60 * 60 * 1000; // 1 hour window to delete message

// todo add js docs
export const ALLOWED_MIME_TYPES = [
  // Images
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',

  // Audio
  'audio/mpeg', // mp3
  'audio/mp4', // m4a
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
  'audio/webm',
  'application/json',

  // Video
  'video/mp4',
  'video/webm',
  'video/quicktime', // mov

  // Documents
  'application/pdf',
  'text/plain',
  'text/csv',
  'text/html',

  // MS Office
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',

  // Archives
  'application/zip',
  'application/x-rar-compressed',
  'application/x-7z-compressed',
];

// todo add js docs
export const BLOCKED_MIME_TYPES = [
  'image/svg+xml',

  // Windows executables
  'application/x-msdownload', // exe
  'application/x-msi', // msi

  // Scripts
  'application/x-sh', // sh
  'application/x-bat', // bat
  'application/x-cmd',

  // PowerShell
  'application/x-powershell',

  // Java executables
  'application/java-archive', // jar

  // Android apps
  'application/vnd.android.package-archive', // apk

  // Apple installers
  'application/x-apple-diskimage', // dmg
  'application/vnd.apple.installer+xml', // pkg
];

// todo add js docs
export type CookiesSetting = {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  isDismissed?: boolean;
  providedAt: Date;
};

// todo add js docs
export type SetCookieOptions = {
  maxAge?: number;
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
};

// todo add js docs
export const AnalyticsEvents = {
  sign_up: 'sign_up', // User successfully creates an account
  register: 'register', // User registered, nay or may not be signed up
  sign_in: 'sign_in', // User logs in successfully
  logout: 'logout', // User logs out
  message_sent: 'message_sent', // Message is successfully sent
  call_started: 'call_started', // Audio/video call starts
  call_ended: 'call_ended', // Call ends
  profile_updated: 'profile_updated', // Profile changes are saved
  password_reset_requested: 'password_reset_requested', // User requests a password reset
  password_reset_completed: 'password_reset_completed', // Password is successfully reset
  notification_enabled: 'notification_enabled', // User grants push notification permission
  google_login_triggered: 'google_login_triggered',
} as const;

// todo add js docs
export type AnalyticsEvent = (typeof AnalyticsEvents)[keyof typeof AnalyticsEvents];

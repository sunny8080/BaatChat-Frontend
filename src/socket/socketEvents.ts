/**
 * List of all sockets events that will be used in this project
 * nomenclature - "domain:action"
 *
 * ex - "message:send" - client will send this event to server that someone wants to send a message
 *
 * ex - "message:received" - server will send this event client that someone sent a message
 */

/**
 * Socket.IO lifecycle and predefined connection events.
 */
export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  CONNECT_ERROR: 'connect_error',
  RECONNECT: 'reconnect',
  RECONNECT_ATTEMPT: 'reconnect_attempt',
} as const;

/**
 * Chat room membership and update socket events.
 */
export const CHAT_EVENTS = {
  JOIN: 'chat:join',
  LEAVE: 'chat:leave',
  UPDATED: 'chat:updated',
} as const;

// Message Events
/**
 * Message domain socket events.
 */
export const MESSAGE_EVENTS = {
  SEND: 'message:send',
  RECEIVED: 'message:received',

  EDIT: 'message:edit',
  EDITED: 'message:edited',

  DELETE: 'message:delete',
  DELETED: 'message:deleted',

  SEEN: 'message:seen',
  DELIVERED: 'message:delivered',

  REACT: 'message:react',
  REACTION_UPDATED: 'message:reaction-updated',

  PIN: 'message:pin',
  PINNED: 'message:pinned',

  UNPIN: 'message:unpin',
  UNPINNED: 'message:unpinned',

  FORWARD: 'message:forward',
  ERROR: 'message:error',
} as const;

/**
 * Group domain socket events.
 */
export const GROUP_EVENTS = {
  CREATE: 'group:create',
  CREATED: 'group:created',

  UPDATE: 'group:update',
  UPDATED: 'group:updated',

  DELETE: 'group:delete',
  DELETED: 'group:deleted',

  JOIN: 'group:join',
  LEAVE: 'group:leave',

  ADD_MEMBER: 'group:add-member',
  MEMBER_ADDED: 'group:member-added',

  REMOVE_MEMBER: 'group:remove-member',
  MEMBER_REMOVED: 'group:member-removed',

  MAKE_ADMIN: 'group:make-admin',
  ADMIN_ADDED: 'group:admin-added',

  REMOVE_ADMIN: 'group:remove-admin',
  ADMIN_REMOVED: 'group:admin-removed',

  UPDATE_AVATAR: 'group:update-avatar',
  UPDATED_AVATAR: 'group:updated-avatar',

  UPDATE_NAME: 'group:update-name',
  UPDATED_NAME: 'group:updated-name',
} as const;

/**
 * User presence domain socket events.
 */
export const PRESENCE_EVENTS = {
  ONLINE: 'presence:online',
  OFFLINE: 'presence:offline',
} as const;

// Typing Events
/**
 * Typing indicator socket events.
 */
export const TYPING_EVENTS = {
  START: 'typing:start',
  USER_STARTED: 'typing:user-started',
} as const;

// Call Events
/**
 * Call signaling socket events.
 */
export const CALL_EVENTS = {
  START: 'call:start',
  END: 'call:end',

  OFFER: 'call:offer',
  ANSWER: 'call:answer',

  ACCEPT: 'call:accept',
  REJECT: 'call:reject',

  ICE_CANDIDATE: 'call:ice-candidate',

  MUTE: 'call:mute',
  UNMUTE: 'call:unmute',

  CAMERA_ON: 'call:camera-on',
  CAMERA_OFF: 'call:camera-off',

  SCREEN_SHARE_START: 'call:screen-share-start',

  SCREEN_SHARE_STOP: 'call:screen-share-stop',
} as const;

export type MessageEvent = (typeof MESSAGE_EVENTS)[keyof typeof MESSAGE_EVENTS];

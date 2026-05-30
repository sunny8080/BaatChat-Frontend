import type UserInterface from './UserInterface';
import type { ChatType } from '../utils/constant';
import type MessageInterface from './MessageInterface';

// type Ref<T> = string | T;

/**
 * Represents the full details for an active chat conversation.
 *
 * @property id - Unique identifier for the chat.
 * @property type - Category of chat, such as personal or group.
 * @property name - Display name shown for the chat.
 * @property avatarUrl - URL of the chat avatar image.
 * @property description - Optional description for group chats.
 * @property activeMembers - Members currently active in the chat.
 * @property admins - Users with admin privileges in the chat.
 * @property createdBy - User who created the chat.
 * @property lastMessage - Most recent message in the chat, when available.
 * @property lastMessageAt - Timestamp for the most recent message, when available.
 * @property createdAt - Timestamp for when the chat was created.
 * @property updatedAt - Timestamp for when the chat was last updated.
 * @property isOnline - Whether the personal chat participant is currently online.
 * @property lastSeenAt - Timestamp for when the personal chat participant was last active.
 * @property messages - Messages loaded for the chat.
 */
export interface ChatDetailsInterface {
  id: string;
  type: ChatType;
  name: string;
  avatarUrl: string;
  description?: string;
  activeMembers?: UserInterface[];
  admins?: UserInterface[];
  createdBy: UserInterface;
  lastMessage?: MessageInterface;
  lastMessageAt?: string;
  createdAt?: string;
  updatedAt?: string;
  isOnline?: boolean;
  lastSeenAt?: string;
  messages: MessageInterface[];
}

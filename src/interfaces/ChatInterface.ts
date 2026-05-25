import type { ChatType } from '../utils/constant';
import type MessageInterface from './MessageInterface';

/**
 * Represents a chat preview displayed in the chat list.
 *
 * @property id - Unique identifier for the chat.
 * @property type - Category of chat, such as direct or group.
 * @property name - Display name shown for the chat.
 * @property avatarUrl - URL of the chat avatar image.
 * @property lastMessage - Most recent message in the chat, when available.
 * @property lastMessageAt - Timestamp for the most recent message, when available.
 * @property isOnline - Whether the chat participant is currently online.
 * @property activeNotification - Number of unread notifications for the chat.
 */
export default interface ChatInterface {
  id: string;
  type: ChatType;
  name: string;
  avatarUrl: string;
  lastMessage?: MessageInterface;
  lastMessageAt?: string;
  isOnline?: boolean;
  activeNotification?: number;
}

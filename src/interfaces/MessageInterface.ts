import type UserInterface from './UserInterface';
import type { MessageType } from '../utils/constant';

/**
 * Represents a chat message returned by the application.
 *
 * @property id - Unique identifier for the message.
 * @property chat - Chat this message belongs to.
 * @property sender - User who sent the message.
 * @property type - Message content type.
 * @property text - Text content for text-based messages.
 * @property attachments - Files or media attached to the message.
 * @property reactions - Emoji reactions added by chat members.
 * @property seenBy - Users who have seen the message.
 * @property deliveredTo - Users the message has been delivered to.
 * @property editedAt - Timestamp for when the message was last edited.
 * @property createdAt - Timestamp for when the message was created.
 * @property updatedAt - Timestamp for when the message was last updated.
 * @property replyTo - Message this message replies to.
 */
export default interface MessageInterface {
  id: string;
  chat?: string;
  sender?: UserInterface;
  type: MessageType;
  text?: string;
  attachments?: attachmentInterface[];
  reactions?: unknown[];
  seenBy?: { user: UserInterface; seenAt: string }[];
  deliveredTo?: { user: UserInterface; deliveredAt: string }[];
  editedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  replyTo?: MessageInterface;
  sending?: boolean;
}
export interface attachmentInterface {
  url: string;
  thumbnailUrl?: string;
  fileName: string;
  mimeType: string;
  size?: number;
  duration?: number;
  waveform?: number[];
}

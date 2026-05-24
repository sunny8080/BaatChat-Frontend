import type UserInterface from './UserInterface';
import type { MessageType } from '../utils/constant';
import type ChatInterface from './ChatInterface';

type Ref<T> = string | T;

export default interface MessageInterface {
  id: string;
  chat?: Ref<ChatInterface>;
  sender?: UserInterface;
  type?: MessageType;
  text?: string;
  attachments?: unknown[];
  reactions?: unknown[];
  seenBy?: Ref<UserInterface>;
  deliveredTo?: Ref<UserInterface>;
  editedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

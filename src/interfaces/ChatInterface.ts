import type UserInterface from './UserInterface';
import type { ChatType } from '../utils/constant';
import type MessageInterface from './MessageInterface';

type Ref<T> = string | T;

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



export interface ChatDetailsInterface {
  id: string;
  type: ChatType;
  name: string;
  description?: string;
  avatarUrl: string;
  activeMembers?: Ref<UserInterface>[];
  members?: Ref<UserInterface>[];
  admins?: Ref<UserInterface>[];
  createdBy?: Ref<UserInterface>;
  deletedBy?: Ref<UserInterface>[];
  lastMessage?: Ref<MessageInterface>;
  lastMessageAt?: string;
  createdAt?: string;
  updatedAt?: string;
  isOnline?: boolean;
  lastSeenAt?: string;
  activeNotification?: number;
}

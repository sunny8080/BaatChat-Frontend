import type MessageInterface from '../interfaces/MessageInterface';
import type SocketError from '../interfaces/SocketError';
import { useChatDetailsStore } from '../zustand/ChatDetailsStore';
import { useChatListStore } from '../zustand/ChatListStore';
import socket from './socket';
import { CHAT_EVENTS, MESSAGE_EVENTS, PRESENCE_EVENTS, TYPING_EVENTS } from './socketEvents';

/**
 * Registers connection-level socket listeners.
 *
 * Handles socket connection failures, successful connections, and disconnects.
 */
export const registerSocketListeners = () => {
  // TODO - check do we really need this function

  socket.on('connect_error', (err: SocketError) => {
    // TODO - what to do in case of error
    console.log('Error occurred - ', err.message);
  });

  socket.on('connect', () => {
    console.log("User's socket connected");
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });
};

/**
 * Registers message and presence socket listeners.
 *
 * Keeps online presence and currently opened chat message status in sync with
 * server events.
 */
export const registerMessageSocketListeners = () => {
  socket.on(PRESENCE_EVENTS.ONLINE, (data) => {
    const { updateOnlinePresence } = useChatListStore.getState();
    const { updateChatOnlinePresence } = useChatDetailsStore.getState();

    const { userId } = data;
    updateOnlinePresence(userId, true);
    updateChatOnlinePresence(userId, true);
  });

  socket.on(PRESENCE_EVENTS.OFFLINE, (data) => {
    const { updateOnlinePresence } = useChatListStore.getState();
    const { updateChatOnlinePresence } = useChatDetailsStore.getState();

    const { userId } = data;
    updateOnlinePresence(userId, false);
    updateChatOnlinePresence(userId, false);
  });

  socket.on(MESSAGE_EVENTS.RECEIVED, (data) => {
    const msg: MessageInterface = data;
    const { chatDetails, addMessage, setNewMsgAdded } = useChatDetailsStore.getState();

    if (chatDetails && msg.chat === chatDetails.id) {
      addMessage(msg);
      setNewMsgAdded(true);
      socket.emit(MESSAGE_EVENTS.SEEN, { chatId: msg.chat, msgId: msg.id });
    }
  });

  socket.on(MESSAGE_EVENTS.DELIVERED, (data) => {
    const { chatId, msgId, deliveredTo, deliveredAt } = data;
    const { chatDetails, updateMessageDeliveredTo } = useChatDetailsStore.getState();

    if (chatDetails?.id === chatId) {
      updateMessageDeliveredTo(msgId, deliveredTo, deliveredAt);
    }
  });

  socket.on(MESSAGE_EVENTS.SEEN, (data) => {
    const { chatId, msgId, seenBy, seenAt } = data;
    const { chatDetails, updateMessageSeenBy } = useChatDetailsStore.getState();

    if (chatDetails?.id === chatId) {
      updateMessageSeenBy(msgId, seenBy, seenAt);
    }
  });
};

/**
 * Registers chat-level socket listeners.
 *
 * Updates chat list metadata and typing state when chat update or typing events
 * are received.
 */
export const registerChatSocketListeners = () => {
  socket.on(CHAT_EVENTS.UPDATED, (data) => {
    const { chatId, lastMessage, unreadCount } = data;
    const { chatDetails } = useChatDetailsStore.getState();
    const { updateUnreadCount, updateLastMessage } = useChatListStore.getState();

    socket.emit(MESSAGE_EVENTS.DELIVERED, { chatId, msgId: lastMessage.id });
    updateLastMessage(chatId, lastMessage);

    if (chatId !== chatDetails?.id) {
      // user is not on the current chat
      updateUnreadCount(chatId, unreadCount);
    }
  });

  socket.on(TYPING_EVENTS.USER_STARTED, (data) => {
    const { chatId, user } = data;
    const { chatDetails, updateTypingUsers, typingTimeouts, setTypingTimeouts } =
      useChatDetailsStore.getState();

    if (chatId === chatDetails?.id) {
      updateTypingUsers(user, true);

      let timeout = typingTimeouts.get(user.id);
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        updateTypingUsers(user, false);
        setTypingTimeouts(null, user.id);
      }, 2000);
      setTypingTimeouts(timeout, user.id);
    }
  });
};

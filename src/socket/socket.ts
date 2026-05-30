import { io } from 'socket.io-client';
import {
  registerChatSocketListeners,
  registerMessageSocketListeners,
  registerSocketListeners,
} from './socketListeners';
import type UserInterface from '../interfaces/UserInterface';
// import type SocketError from '../interfaces/SocketError';

/**
 * Shared Socket.IO client for the frontend.
 *
 * The connection is created in a disconnected state so callers can attach
 * listeners before explicitly calling `socket.connect()`.
 */
const socket = io(import.meta.env.VITE_BED_URL, {
  autoConnect: false, // socket will not connect automatically, need to call socket.connect()
  withCredentials: true, // browser will send cookies also
  auth: {
    // TODO - do we need to send token
  },
});

/**
 * Registers the frontend socket listeners, attaches the authenticated user to
 * the Socket.IO client instance, and opens the connection.
 *
 * @param user - Currently authenticated user associated with the socket.
 */
export const connectSocket = (user: UserInterface) => {
  registerSocketListeners();
  registerMessageSocketListeners();
  registerChatSocketListeners();
  socket.user = user;
  socket.connect();
};

export default socket;

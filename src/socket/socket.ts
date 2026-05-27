import { io } from 'socket.io-client';
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

export default socket;

import type SocketError from '../interfaces/SocketError';
import { socket } from './socket';

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

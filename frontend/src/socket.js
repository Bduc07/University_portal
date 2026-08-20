import { io } from 'socket.io-client';
import { API_BASE_URL } from './config.js';

let socket = null;

// One shared connection per session, created lazily and reused across pages.
export const getSocket = () => {
  if (!socket) {
    const token = localStorage.getItem('token');
    socket = io(API_BASE_URL, { auth: { token } });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

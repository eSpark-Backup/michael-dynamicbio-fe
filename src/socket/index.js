import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BASE_URL_SOCKET;

let socket = null;

export const createSocket = () => {
  const token = localStorage.getItem("token");
  socket = io(SOCKET_URL, {
    path: "/api/socket.io",
    transports: ["polling"],
    transportOptions: {
      polling: {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      },
    },
  });

  return socket;
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

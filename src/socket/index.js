import { io } from "socket.io-client";

const SOCKET_URL = "http://72.60.29.127/socket";

let socket = null;

export const createSocket = () => {
  const token = localStorage.getItem("token");
  socket = io(SOCKET_URL, {
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

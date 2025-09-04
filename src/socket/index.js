import { io } from "socket.io-client";

const SOCKET_URL = "https://app.h2fusion.org";

let socket = null;

export const createSocket = () => {
  const token = localStorage.getItem("token");
  socket = io(SOCKET_URL, {
    transports: ["websocket", "polling"],
    path: "/api/socket.io",
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

import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BASE_URL_SOCKET;
const token = localStorage.getItem("token");

export const socket = io(SOCKET_URL, {
  transports: ["polling"],
  transportOptions: {
    polling: {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  },
});

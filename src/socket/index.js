import { io } from "socket.io-client";

const SOCKET_URL = "https://fusion-stg-api.esparkconsultants.com/socket";
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

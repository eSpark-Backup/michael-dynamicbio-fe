import { useEffect } from "react";
import { toast } from "react-toastify";
import { socket } from "./index";
import { NEW_BOND_REQUEST } from "./events";
import { eventBus } from "../utils";

const SocketListener = () => {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on("connect", () => {
      console.log("✅ Connected to socket server", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });

    socket.on(NEW_BOND_REQUEST, (data) => {
      toast.success(data?.message);
      eventBus.emit("refetchBondData");
    });

    return () => {
      socket.off(NEW_BOND_REQUEST);
    };
  }, []);

  return null;
};

export default SocketListener;

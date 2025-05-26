import { useEffect, useState } from "react";
import {
  connectSocket,
  disconnectSocket,
  emitEvent,
  listenToSocketEvents,
} from "@/services/socketService";

const SocketInitializer = () => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    const handleTokenUpdate = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
    };

    window.addEventListener("token-updated", handleTokenUpdate);
    window.addEventListener("token-removed", handleTokenUpdate);

    return () => {
      window.removeEventListener("token-updated", handleTokenUpdate);
      window.removeEventListener("token-removed", handleTokenUpdate);
    };
  }, []);

  useEffect(() => {
    if (token) {
      connectSocket(token);
      listenToSocketEvents(
        () => {
          console.log("✅ Socket connected");
        },
        (err) => console.error("❌ Socket error:", err)
      );
    }

    return () => {
      disconnectSocket();
    };
  }, [token]);

  return null;
};

export default SocketInitializer;

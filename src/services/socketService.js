import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (token) => {
  if (socket && socket.connected) return;
  socket = io(import.meta.env.VITE_SOCKET_URL, {
    transports: ["websocket"],
    auth: {
      token,
    },
  });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;

export const emitEvent = (event, data = {}, callback) => {
  if (socket) {
    socket.emit(event, data, callback);
  } else {
    console.error("Socket not connected");
  }
};

export const listenToEvent = (event, callback) => {
  if (socket) {
    socket.on(event, callback);
  }
};

export const removeListener = (event, callback) => {
  if (socket) {
    socket.off(event, callback);
  }
};

export const listenToSocketEvents = (onConnect, onError) => {
  if (!socket) return;
  if (socket) {
    socket.on("connect", () => {
      console.log("Socket connected");
      onConnect?.();
    });

    socket.on("connect_error", (err) => {
      console.error("Connect error:", err.message);
      onError?.(err);
    });

    socket.on("socket-error", (err) => {
      console.error("Socket error:", err.message || err);
      onError?.(err);
    });
  }
};

export const waitForSocketConnection = (token) => {
  return new Promise((resolve, reject) => {
    if (!socket || !socket.connected) {
      connectSocket(token);

      const onConnect = () => {
        cleanup();
        resolve();
      };

      const onError = (err) => {
        cleanup();
        reject(err);
      };

      const cleanup = () => {
        socket.off("connect", onConnect);
        socket.off("connect_error", onError);
      };

      socket.on("connect", onConnect);
      socket.on("connect_error", onError);
    } else {
      resolve(); // already connected
    }
  });
};

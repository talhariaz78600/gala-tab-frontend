import {
  connectSocket,
  disconnectSocket,
  emitEvent,
  listenToEvent,
  listenToSocketEvents,
  removeListener,
} from "@/services/socketService";
import {
  addNotification,
  setUnreadNotifications,
} from "@/store/notificationSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const NotificationsSocket = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;
    let timer;

    const handleUnread = (data) => {
      console.log("🔔 Unread notifications received:", data);

      dispatch(setUnreadNotifications(data));
    };
    listenToEvent("user-unread-notifications", handleUnread);

    const handleNew = (data) => {
      dispatch(addNotification(data));
    };
    listenToEvent("notification", handleNew);

    timer = setTimeout(() => {
      emitEvent("get-user-unread-notifications", {});
    }, 1500);

    return () => {
      if (timer) clearTimeout(timer);
      removeListener("user-unread-notifications");
      removeListener("notification");
      disconnectSocket();
    };
  }, [dispatch, token]);

  return null;
};

export default NotificationsSocket;

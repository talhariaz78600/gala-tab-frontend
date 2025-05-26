import React, { useContext, useEffect, useState } from "react";
import { AppBar, Toolbar, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import LeftSide from "./InboxTiles/LeftSide";
import MessageSide from "./InboxTiles/MessageSide";
import RightSide from "./InboxTiles/RightSide";
import NotifyBell from "../../assets/img/notify-bell.png";
import Profile from "../../assets/img/profile.png";
import Setting from "../../assets/img/setting.png";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineMessage } from "react-icons/md";
import {
  emitEvent,
  listenToEvent,
  listenToSocketEvents,
  removeListener,
  waitForSocketConnection,
} from "@/services/socketService";
import {
  addChatsPaginated,
  addMessage,
  addOrUpdateChat,
  clearMessages,
  resetUnreadCount,
  setActiveChat,
  setBookings,
  setChats,
  setCurrentUserId,
  setHasMoreChatMessages,
  setHasMoreChats,
  setLoadingMessages,
  setMessages,
} from "@/store/chatSlice";
import Loader from "@/components/loader/Loader";
import { store } from "@/store/store";
import { ThemeContext } from "@/components/ThemeProvider";

const TopBar = ({ onMenuClick, user }) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="fixed"
      sx={{ bgcolor: isDark ? "#000" : "#fff", color: "#000", height: "74px" }}
      elevation={0}
    >
      <Toolbar sx={{ height: "100%" }} disableGutters>
        <div className="w-full flex items-center justify-between px-4">
          <button
            onClick={() => {
              user.role === "admin"
                ? navigate("/admin-dashboard/dashboard")
                : (user.role === "vendor" &&
                    navigate("/vendor-dashboard/dashboard")) ||
                  navigate("/user-dashboard/dashboard");
            }}
            className="bg-gradient-to-b from-gray-500 to-gray-900 text-white font-semibold py-3 px-8 rounded-full border-4 border-black shadow-md"
          >
            Gala Tab
          </button>
          <div className="flex items-center justify-end gap-2 w-1/2">
            <button
              onClick={() => {
                user.role === "admin"
                  ? navigate("/admin-dashboard/dashboard")
                  : (user.role === "vendor" &&
                      navigate("/vendor-dashboard/dashboard")) ||
                    navigate("/user-dashboard/dashboard");
              }}
              className="flex items-center gap-2"
            >
              <div>
                <h6 className="text-[#000] dark:text-white text-nowrap text-lg">
                  Hey,{user?.firstName}
                </h6>
                <p className="text-[#8A8A8A] dark:text-white text-nowrap text-sm">
                  {user?.role}
                </p>
              </div>
              <div>
                <img
                  src={user?.profilePicture || Profile}
                  alt=""
                  className="w-8 h-8 max-w-[32px] rounded-full"
                />
              </div>
            </button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const Inbox = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMessageSide, setShowMessageSide] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const { activeChat, activeBooking } = useSelector((state) => state.chat);
  const [userLoading, setUserLoading] = useState(true);
  const dispatch = useDispatch();

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?._id) {
      dispatch(setCurrentUserId(user._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!user?._id) return;
    const handleChatsResponse = (data) => {
      setUserLoading(false);
      const newChats = data?.chats || [];

      if (data?.pageNo === 1) {
        dispatch(setChats(newChats));
      } else {
        dispatch(addChatsPaginated(newChats));
      }

      if (newChats.length < 10 || newChats.length === 0) {
        dispatch(setHasMoreChats(false));
      } else {
        dispatch(setHasMoreChats(true));
      }
    };

    const handleConnectError = (err) => {
      console.error("🔴 Socket connection error:", err.message || err);
    };

    const handleSocketError = (err) => {
      console.error("🔴 Socket error:", err.message || err);
    };

    listenToEvent("user-chats", handleChatsResponse);
    listenToSocketEvents(
      () => console.log("🟢 Socket connected"),
      handleConnectError
    );

    listenToEvent("socket-error", handleSocketError);

    const timer = setTimeout(() => {
      emitEvent("fetch-user-chats", {
        chatType: "service",
        pageNo: 1,
        recordsPerPage: 10,
      });
    }, 4000);

    return () => {
      clearTimeout(timer);
      removeListener("user-chats", handleChatsResponse);
      removeListener("socket-error", handleSocketError);
    };
  }, [dispatch, user?._id]);

  useEffect(() => {
    const handleBookingsResponse = (data) => {
      dispatch(setBookings(data?.bookings));
      dispatch(setLoadingMessages(false));
    };

    const handleMessagesResponse = (data) => {
      if (data.messages.length < 10) {
        dispatch(setHasMoreChatMessages(false));
      } else {
        dispatch(setHasMoreChatMessages(true));
      }
      if (!data.messages || !user?._id) {
        dispatch(setLoadingMessages(false));
        return;
      }

      const chatId = data.messages[0]?.chatId;
      if (!chatId) {
        dispatch(setLoadingMessages(false));
        return;
      }

      const reversedMessages = [...data.messages].reverse();

      dispatch(
        setMessages({
          chatId,
          messages: reversedMessages,
        })
      );

      dispatch(setLoadingMessages(false));
    };

    const handleReceivedMessage = (data) => {
      const { chatScreenBody, messageScreenBody } = data;
      const chatId = chatScreenBody.chatId;

      dispatch(addOrUpdateChat(chatScreenBody));

      const formattedMessage = {
        id: messageScreenBody.messageId,
        text: messageScreenBody.content,
        date: new Date(messageScreenBody.latestMessageSentAt).toLocaleString(
          "en-US",
          {
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
        sender: messageScreenBody.sender?.name || "You",
        isReceived: messageScreenBody.sender?._id !== user?._id,
        profileImg: messageScreenBody.sender?.profilePicture || "",
        channel: messageScreenBody.contentDescriptionType || "App",
      };
      console.log(
        "activeBooking",
        store.getState().chat.activeBooking,
        messageScreenBody.bookingId
      );

      if (store.getState().chat.activeBooking === messageScreenBody.bookingId) {
        dispatch(
          addMessage({
            chatId: chatScreenBody.chatId,
            message: formattedMessage,
          })
        );
      }

      const isChatOpen = chatId === store.getState().chat.activeChat;
      if (isChatOpen) {
        dispatch(resetUnreadCount(chatId));
        emitEvent("mark-message-as-read", { chatId });
      }
    };

    const handleError = () => {
      dispatch(setLoadingMessages(false));
    };

    listenToEvent("user-booking", handleBookingsResponse);
    listenToEvent("user-chat-messages", handleMessagesResponse);
    listenToEvent("receive-message", handleReceivedMessage);
    listenToEvent("socket-error", handleError);
    listenToEvent("connect_error", handleError);

    return () => {
      removeListener("user-booking", handleBookingsResponse);
      removeListener("user-chat-messages", handleMessagesResponse);
      removeListener("receive-message", handleReceivedMessage);
      removeListener("socket-error", handleError);
      removeListener("connect_error", handleError);
    };
  }, [dispatch, user?._id]);

  useEffect(() => {
    return () => {
      dispatch(setActiveChat(null));
      dispatch(setHasMoreChatMessages(true));
    };
  }, [dispatch]);

  const toggleMessageSide = () => {
    setShowMessageSide((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <TopBar onMenuClick={handleDrawerToggle} user={user} />
      <Box
        component="main"
        sx={{
          bgcolor: isDark ? "#121212" : "#F7F7F7",
          px: 3,
          py: 4,
        }}
      >
        <Toolbar />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 justify-between inbox-h">
          <div className="inbox-h bg-[#F7F7F7] dark:bg-gray-800 rounded-xl relative p-3">
            <LeftSide
              toggleMessageSide={toggleMessageSide}
              userLoading={userLoading}
            />
          </div>
          <div className="hidden lg:block lg:col-start-2 md:col-end-5 inbox-h">
            <div className="grid grid-cols-3 gap-4 inbox-h">
              <div className="lg:col-start-1 lg:col-end-4 xl:col-start-1 xl:col-end-3 border border-black h-full rounded-xl bg-[#F7F7F7] dark:bg-gray-800">
                {activeChat ? (
                  <MessageSide
                    toggleMessageSide={toggleMessageSide}
                    selectedBooking={selectedBooking}
                    setSelectedBooking={setSelectedBooking}
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center h-full">
                    <MdOutlineMessage className="text-5xl text-gray-300 mb-4" />
                    <p className="text-gray-500">
                      Select a chat to start messaging
                    </p>
                  </div>
                )}
              </div>
              <div className="inbox-h overflow-y-auto scroll-x-hidden hidden xl:block rounded-xl p-3 bg-[#F7F7F7] dark:bg-gray-800">
                {activeChat && (
                  <RightSide
                    selectedBooking={selectedBooking}
                    setSelectedBooking={setSelectedBooking}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Mobile message side */}
          {showMessageSide && (
            <div className="fixed lg:hidden inset-0 top-16 z-50 bg-[#F7F7F7] dark:bg-gray-800 p-4">
              <MessageSide
                toggleMessageSide={toggleMessageSide}
                selectedBooking={selectedBooking}
                setSelectedBooking={setSelectedBooking}
              />
            </div>
          )}
        </div>
        {/* <Loader loading={userLoading} /> */}
      </Box>
    </div>
  );
};

export default Inbox;

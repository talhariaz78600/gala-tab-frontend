import React, { useEffect, useState } from "react";
import { Toolbar, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LeftSide from "./ContactInbox/LeftSide";
import MessageSide from "./ContactInbox/MessageSide";
import RightSide from "./ContactInbox/RightSide";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  addOrUpdateChat,
  resetUnreadCount,
  setChats,
  setCurrentUserId,
  setLoadingMessages,
  setMessages,
  setActiveChat,
  addChatsPaginated,
  setHasMoreChats,
  resetPagination,
  setHasMoreChatMessages,
} from "@/store/chatSlice";
import {
  emitEvent,
  listenToEvent,
  listenToSocketEvents,
} from "@/services/socketService";
import { removeListener } from "@reduxjs/toolkit";
import { MdOutlineMessage } from "react-icons/md";
import { store } from "@/store/store";
import { useLocation } from "react-router";

const ContactInbox = () => {
  const location = useLocation();
  const chatId = location?.state?.chatId;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showMessageSide, setShowMessageSide] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?._id) {
      dispatch(setCurrentUserId(user._id));
    }
  }, [user, dispatch]);

  useEffect(() => {
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
    dispatch(resetPagination());

    const timer = setTimeout(() => {
      emitEvent("fetch-user-chats", {
        chatType: "contact",
        pageNo: 1,
        recordsPerPage: 10,
      });
    }, 4000);

    return () => {
      clearTimeout(timer);
      removeListener("user-chats", handleChatsResponse);
      removeListener("socket-error", handleSocketError);
    };
  }, [dispatch]);

  useEffect(() => {
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

      dispatch(
        addMessage({
          chatId: chatScreenBody.chatId,
          message: formattedMessage,
        })
      );

      const isChatOpen = chatId === store.getState().chat.activeChat;
      if (isChatOpen) {
        dispatch(resetUnreadCount(chatId));
        emitEvent("mark-message-as-read", { chatId });
      }
    };

    const handleMessagesReadResponse = (data) => {
      console.log("data", data);
    };

    const handleError = () => {
      dispatch(setLoadingMessages(false));
    };

    listenToEvent("user-chat-messages", handleMessagesResponse);
    listenToEvent("mark-message-read-response", handleMessagesReadResponse);
    listenToEvent("receive-message", handleReceivedMessage);
    listenToEvent("socket-error", handleError);
    listenToEvent("connect_error", handleError);

    return () => {
      removeListener("user-chat-messages", handleMessagesResponse);
      removeListener("mark-message-read-response", handleMessagesResponse);
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

  useEffect(() => {
    if (chatId) {
      setActiveUser(chatId ?? null);
      dispatch(setHasMoreChatMessages(true));
    }
  }, [chatId, dispatch]);

  const toggleMessageSide = () => {
    setShowMessageSide((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 justify-between inbox-h">
        <div className="inbox-h bg-[#F7F7F7] dark:bg-gray-800 rounded-xl relative p-3">
          <LeftSide
            toggleMessageSide={toggleMessageSide}
            userLoading={userLoading}
            activeUser={activeUser}
            setActiveUser={setActiveUser}
          />
        </div>
        <div className="hidden xl:block xl:col-span-3 inbox-h">
          <div className="border border-black h-full rounded-xl bg-[#F7F7F7] dark:bg-gray-800">
            {activeUser ? (
              <MessageSide
                toggleMessageSide={toggleMessageSide}
                activeUser={activeUser}
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
        </div>
      </div>

      {showMessageSide && (
        <div className="fixed lg:hidden inset-0 top-16 z-50 bg-[#F7F7F7] dark:bg-gray-800 p-4">
          <MessageSide
            toggleMessageSide={toggleMessageSide}
            activeUser={activeUser}
          />
        </div>
      )}
    </div>
  );
};

export default ContactInbox;

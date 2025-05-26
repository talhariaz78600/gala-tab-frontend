import React, { useEffect, useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Profile from "../../../assets/img/profile.png";
import MessageSide from "./MessageSide";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  incrementPage,
  resetUnreadCount,
  setActiveChat,
  setHasMoreChatMessages,
  setLoadingMessages,
  setSearchTerm,
} from "@/store/chatSlice";
import { Skeleton } from "@mui/material";
import { emitEvent } from "@/services/socketService";

const LeftSide = ({
  toggleMessageSide,
  userLoading,
  activeUser,
  setActiveUser,
}) => {
  const dispatch = useDispatch();
  const { chats, searchTerm, pageNo, hasMoreChats, chatMessagePageNo } =
    useSelector((state) => state.chat);
  const chatListRef = useRef(null);

  const filteredChats = chats
    ?.filter((chat) => chat.chatType === "contact")
    ?.filter((chat) =>
      chat?.vendorName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleChatSelect = (chatId) => {
    setActiveUser(chatId);
    if (toggleMessageSide) toggleMessageSide();
    dispatch(setHasMoreChatMessages(true));
    dispatch(setLoadingMessages(true));
    dispatch(setActiveChat(chatId));
    dispatch(clearMessages(chatId));
    emitEvent("fetch-user-chat-messages", {
      chatId,
      pageNo: 1,
      recordsPerPage: 50,
    });
    dispatch(resetUnreadCount(chatId));
    emitEvent("mark-message-as-read", { chatId });
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  useEffect(() => {
    const div = chatListRef.current;
    const handleScroll = () => {
      if (
        div.scrollTop + div.clientHeight >= div.scrollHeight - 50 &&
        hasMoreChats
      ) {
        dispatch(incrementPage());
      }
    };
    div?.addEventListener("scroll", handleScroll);
    return () => div?.removeEventListener("scroll", handleScroll);
  }, [hasMoreChats]);

  useEffect(() => {
    emitEvent("fetch-user-chats", {
      chatType: "contact",
      pageNo: pageNo,
      recordsPerPage: 10,
    });
  }, [pageNo !== 1]);

  useEffect(() => {
    if (!activeUser) return;
    setActiveUser(activeUser);
    dispatch(setLoadingMessages(true));
    dispatch(setActiveChat(activeUser));
    dispatch(clearMessages(activeUser));
    emitEvent("fetch-user-chat-messages", {
      chatId: activeUser,
      pageNo: 1,
      recordsPerPage: 50,
    });
    dispatch(resetUnreadCount(activeUser));
    emitEvent("mark-message-as-read", { chatId: activeUser });
  }, [activeUser]);

  useEffect(() => {
    if (activeUser && chats.length > 0) {
      const activeChatIndex = chats.findIndex((chat) => chat.id === activeUser);
      if (activeChatIndex !== -1) {
        const chatElement = document.getElementById(`chat-item-${activeUser}`);
        if (chatElement) {
          chatElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [activeUser, chats]);

  return (
    <div className="h-full">
      <h4 className="text-[#3551B6] font-bold text-2xl">Contact</h4>
      <div>
        <form>
          <div className="border rounded-full flex items-center gap-3 bg-white p-2 my-2">
            <label>
              <IoIosSearch className="text-xl" />
            </label>
            <input
              type="search"
              className="bg-transparent w-full focus-none"
              placeholder="Search Member"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </form>
      </div>

      <div
        ref={chatListRef}
        className="message-list max-h-[calc(100%-90px)] scroll-x-hidden overflow-y-auto"
      >
        <div className="p-2">
          {userLoading ? (
            [...Array(4)].map((_, i) => (
              <div key={i} className="p-2 rounded-xl mb-3 cursor-pointer">
                <div className="flex items-center gap-2">
                  <Skeleton variant="circular" width={40} height={40} />
                  <div className="flex flex-col w-full">
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton
                      variant="text"
                      width="40%"
                      height={15}
                      className="mt-2"
                    />
                  </div>
                </div>
                <div className="flex mt-1">
                  <Skeleton
                    variant="text"
                    width={50}
                    height={10}
                    className="ms-auto"
                  />
                </div>
              </div>
            ))
          ) : filteredChats.length === 0 ? (
            <p className="text-center">No chats found</p>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                id={`chat-item-${chat.id}`}
                className={`p-2 rounded-xl mb-3 cursor-pointer relative ${
                  activeUser === chat.id
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <img
                      src={chat.profileImg || Profile}
                      alt=""
                      className="size-10 max-w-10 border-2 border-white rounded-full object-cover"
                    />
                    {chat.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                        {chat.unreadCount > 9 ? "9+" : chat.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col w-full">
                    <h6 className="text-xs font-semibold hover:text-white">
                      {chat.vendorName}
                    </h6>
                    <p className="text-xs truncate w-full hover:text-white max-w-[200px]">
                      {chat.latestMessage || "No messages yet"}
                    </p>
                  </div>
                </div>
                <div className="flex mt-1">
                  <p className="text-xs ms-auto">
                    {chat.latestMessageSentAt
                      ? new Date(chat.latestMessageSentAt).toLocaleString()
                      : ""}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;

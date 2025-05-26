import React, { useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";
import Profile from "../../../assets/img/profile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementPage,
  setActiveChat,
  setHasMoreChatMessages,
  setSearchTerm,
} from "@/store/chatSlice";
import { Skeleton } from "@mui/material"; // Import Skeleton for loading
import { emitEvent } from "@/services/socketService";

const LeftSide = ({ toggleMessageSide, userLoading }) => {
  const dispatch = useDispatch();
  const {
    chats,
    searchTerm,
    activeChat,
    pageNo,
    hasMoreChats,
    chatMessagePageNo,
  } = useSelector((state) => state.chat);
  const chatListRef = useRef(null);

  const filteredChats = chats
    ?.filter((chat) => chat.chatType === "service")
    ?.filter((chat) =>
      chat?.vendorName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleChatSelect = (chatId) => {
    dispatch(setActiveChat(chatId));
    dispatch(setHasMoreChatMessages(true));
    if (toggleMessageSide) toggleMessageSide();
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
      chatType: "service",
      pageNo: pageNo,
      recordsPerPage: 10,
    });
  }, [pageNo !== 1]);

  useEffect(() => {
    if (activeChat && chats.length > 0) {
      const activeChatIndex = chats.findIndex((chat) => chat.id === activeChat);
      if (activeChatIndex !== -1) {
        const chatElement = document.getElementById(`chat-item-${activeChat}`);
        if (chatElement) {
          chatElement.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [activeChat, chats]);

  return (
    <div className="h-full">
      <h4 className="text-[#3551B6] font-bold text-2xl">Inbox</h4>
      <div>
        <form>
          <div className="border rounded-full flex items-center gap-3 bg-white dark:bg-gray-800 p-2 my-2">
            <label>
              <IoIosSearch className="text-xl" />
            </label>
            <input
              type="search"
              className="bg-transparent w-full focus-none dark:bg-gray-800"
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
            // Show skeletons if loading
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
                className={` p-2 rounded-xl mb-3 cursor-pointer 
                  ${
                    activeChat === chat.id
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
                      {chat.messages[chat.messages.length - 1]?.text ||
                        "No messages yet"}
                    </p>
                  </div>
                </div>
                <div className="flex mt-1">
                  <p className="text-xs ms-auto">
                    {chat.messages[chat.messages.length - 1]?.date || ""}
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

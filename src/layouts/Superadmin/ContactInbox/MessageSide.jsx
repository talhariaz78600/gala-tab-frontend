import React, { useEffect, useRef, useState } from "react";
import Profile from "../../../assets/img/profile.png";
import { IoClose, IoCloseCircle, IoPencil } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";
import Chat from "./Chat";
import { IoMdMic } from "react-icons/io";
import { CiFaceSmile } from "react-icons/ci";
import { FiPaperclip } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";
import RightSide from "./RightSide";
import { RiCloseLargeFill } from "react-icons/ri";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, incrementChatMessagePage } from "@/store/chatSlice";
import { emitEvent } from "@/services/socketService";
import { toast } from "react-toastify";

const MessageSide = ({ toggleMessageSide, activeUser }) => {
  const [showRightSide, setShowRightSide] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const dispatch = useDispatch();
  const { chats, chatMessagePageNo, hasMoreChatMessages, activeChat } =
    useSelector((state) => state.chat);
  const chatListRef = useRef(null);

  const currentChat = chats.find((chat) => chat.id === activeUser);

  const loadingMessages = useSelector((state) => state.chat.loadingMessages);

  const toggleRightSide = () => {
    setShowRightSide(!showRightSide);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && activeUser) {
      emitEvent("send-message", {
        chatId: activeUser,
        content: messageInput,
        chatType: "contact",
      });
      setMessageInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    setIsAutoScrolling(true);
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    const timeout = setTimeout(() => {
      setIsAutoScrolling(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [currentChat?.messages]);

  useEffect(() => {
    const div = chatListRef.current;
    const handleScroll = () => {
      if (
        !isAutoScrolling &&
        div.scrollTop + div.clientHeight >= div.scrollHeight - 50 &&
        hasMoreChatMessages
      ) {
        dispatch(incrementChatMessagePage());
      }
    };

    div?.addEventListener("scroll", handleScroll);
    return () => div?.removeEventListener("scroll", handleScroll);
  }, [hasMoreChatMessages, dispatch, isAutoScrolling]);

  useEffect(() => {
    if (!hasMoreChatMessages) return;
    // Fetch messages when page number changes
    emitEvent("fetch-user-chat-messages", {
      chatId: activeChat,
      pageNo: chatMessagePageNo,
      recordsPerPage: 50,
    });
  }, [chatMessagePageNo, activeChat, hasMoreChatMessages]);

  if (!currentChat) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <MdOutlineMessage className="text-5xl text-gray-300 mb-4" />
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full relative">
      <div className="bg-white dark:bg-[#0C1421] p-3 shadow rounded-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div>
            <img
              src={currentChat.profileImg}
              onClick={toggleRightSide}
              alt=""
              className="w-10 max-w-[40px] h-10 border-2 border-white rounded-full object-cover shadow"
            />
          </div>
          <div className="flex gap-2 items-center">
            <h6 className="text-lg font-medium">{currentChat.vendorName}</h6>
          </div>
          <div className="hidden md:block">
            {/* <div className="flex gap-2 items-center ml-4">
              <button className="border border-black rounded-full p-1">
                <IoIosCall className="text-xs" />
              </button>
              <h6 className="text-xs">+21 315 909 909</h6>
            </div> */}
          </div>
        </div>
        <div className="xl:hidden">
          <button onClick={toggleMessageSide}>
            <RiCloseLargeFill />
          </button>
        </div>
      </div>

      <div className="chat-h mx-3" ref={chatListRef}>
        <Chat
          messages={currentChat?.messages || []}
          isLoading={loadingMessages || !currentChat || !currentChat.messages}
        />
        <div ref={messagesEndRef} />
      </div>
      <div className="bg-white dark:bg-[#0C1421] relative rounded-b-xl flex items-center gap-3">
        {/* <div className="flex items-center gap-3 p-3 border-r pe-2">
          <div className="md:hidden">
            <button onClick={toggleIcons}>
              <FaEllipsisVertical className="text-[#3551B6] text-2xl" />
            </button>
          </div>
          <div className="border-l ps-2 md:border-l-0 md:ps-0 md:border-r pe-2">
            <IoMdMic className="text-[#3551B6] text-2xl" />
          </div>
          <div
            className={`absolute bottom-full md:static md:block ${
              showIcons ? "block" : "hidden"
            }`}
          >
            <div className="flex p-3 md:p-0 gap-3 flex-col bg-white md:flex-row rounded-[10px] shadow-lg md:shadow-none">
              <div>
                <CiFaceSmile className="text-[#3551B6] text-2xl" />
              </div>
              <div>
                <label htmlFor="clip">
                  <FiPaperclip className="text-[#3551B6] text-2xl" />
                </label>
                <input type="file" className="hidden" id="clip" />
              </div>
              <div>
                <MdOutlineMessage className="text-[#3551B6] text-2xl" />
              </div>
            </div>
          </div>
        </div> */}
        <div className="w-full py-3">
          <input
            type="text"
            className="w-full bg-[#3551B61A] p-2 rounded-lg ml-2"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={!activeUser}
          />
        </div>
        <div className="py-3 px-2">
          <button
            onClick={handleSendMessage}
            disabled={!activeUser}
            className="hidden md:block py-3 px-8 text-white font-semibold bg-black text-xs rounded-lg "
          >
            Send
          </button>
          <button className="sm:hidden" onClick={handleSendMessage}>
            <IoSend className="text-[#3551B6] text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageSide;

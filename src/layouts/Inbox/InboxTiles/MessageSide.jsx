import React, { useState, useRef, useEffect } from "react";
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

const MessageSide = ({
  toggleMessageSide,
  selectedBooking,
  setSelectedBooking,
}) => {
  const [showRightSide, setShowRightSide] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);
  const chatListRef = useRef(null);

  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const { activeChat, chats, chatMessagePageNo, hasMoreChatMessages } =
    useSelector((state) => state.chat);

  const currentChat = chats.find((chat) => chat.id === activeChat);

  const loadingMessages = useSelector((state) => state.chat.loadingMessages);

  const toggleRightSide = () => {
    setShowRightSide(!showRightSide);
  };

  const toggleIcons = () => {
    setShowIcons(!showIcons);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && activeChat) {
      emitEvent("send-message", {
        chatId: activeChat,
        bookingId: selectedBooking,
        content: messageInput,
        chatType: "service",
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
    if (activeChat) {
      emitEvent("fetch-chat-booking", { chatId: activeChat });
    }
  }, [activeChat]);

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

    emitEvent("fetch-user-chat-messages", {
      chatId: activeChat,
      bookingId: selectedBooking,
      pageNo: chatMessagePageNo,
      recordsPerPage: 50,
    });
  }, [chatMessagePageNo, hasMoreChatMessages]);

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
      <div className="bg-white dark:bg-[#0C1421] p-3 shadow rounded-xl flex justify-between items-center ">
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
            {/* <button className="border border-black rounded-full p-1">
              <IoPencil className="text-xs" />
            </button> */}
          </div>
          {/* <div className="hidden sm:block">
            <div className="flex gap-2 items-center ml-4">
              <button className="border border-black rounded-full p-1">
                <IoIosCall className="text-xs" />
              </button>
              <h6 className="text-xs">+21 315 909 909</h6>
            </div>
          </div> */}
        </div>
        <div className="lg:hidden ">
          <button onClick={toggleMessageSide}>
            <RiCloseLargeFill />
          </button>
        </div>
      </div>

      {showRightSide && (
        <div className="absolute w-full h-full z-40 xl:hidden bg-[#F7F7F7] p-4 rounded-xl shadow-lg">
          <div className="h-full overflow-y-auto scroll-x-hidden">
            <div className="flex justify-end mb-4">
              <button onClick={toggleRightSide} className="text-black text-xl">
                <IoClose />
              </button>
            </div>
            <RightSide
              chat={currentChat}
              selectedBooking={selectedBooking}
              setSelectedBooking={setSelectedBooking}
            />
          </div>
        </div>
      )}

      <div className="chat-h  mx-3" ref={chatListRef}>
        <Chat
          messages={currentChat?.messages || []}
          isLoading={loadingMessages || !currentChat || !currentChat.messages}
          selectedBooking={selectedBooking}
        />
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white dark:bg-[#0C1421] relative rounded-b-xl flex items-center gap-3">
        {/* <div className="flex items-center gap-3 p-3 border-r pe-2">
          <div className="sm:hidden">
            <button onClick={toggleIcons}>
              <FaEllipsisVertical className="text-[#3551B6] text-2xl" />
            </button>
          </div>
          <div className="border-l ps-2 sm:border-l-0 sm:ps-0 sm:border-r pe-2">
            <IoMdMic className="text-[#3551B6] text-2xl" />
          </div>
          <div
            className={`absolute bottom-full sm:static sm:block ${
              showIcons ? "block" : "hidden"
            }`}
          >
            <div className="flex p-3 sm:p-0 gap-3 flex-col bg-white sm:flex-row rounded-[10px] shadow-lg sm:shadow-none">
              <div>
                <label htmlFor="clip">
                  <FiPaperclip className="text-[#3551B6] text-2xl" />
                </label>
                <input type="file" className="hidden" id="clip" />
              </div>
            </div>
          </div>
        </div> */}
        <div className="w-full py-3 ml-4">
          <input
            type="text"
            className="w-full bg-[#3551B61A] p-2 rounded-lg"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            disabled={!selectedBooking}
          />
        </div>
        <div className="py-3 px-2">
          <button
            className="hidden sm:block py-3 px-8 text-white font-semibold bg-black text-xs rounded-lg"
            onClick={handleSendMessage}
            disabled={!selectedBooking}
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

import React, { useState } from "react";
import Profile from "../../../../assets/img/profile.png";
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

const MessageSide = ({ toggleMessageSide }) => {
  const [showRightSide, setShowRightSide] = useState(false);
  const [showIcons, setShowIcons] = useState(false); // State to toggle icons

  const toggleRightSide = () => {
    setShowRightSide(!showRightSide);
  };

  const toggleIcons = () => {
    setShowIcons(!showIcons); // Toggle the visibility of the icons
  };

  return (
    <div className="flex flex-col justify-between h-full relative">
      <div className="bg-white p-3 shadow rounded-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div>
            <img
              src={Profile}
              onClick={toggleRightSide}
              alt=""
              className="w-10 max-w-[40px] h-10 border-2 border-white rounded-full object-cover shadow"
            />
          </div>
          <div className="flex gap-2 items-center">
            <h6 className="text-lg font-medium">Name Here</h6>
            <button className="border border-black rounded-full p-1">
              <IoPencil className="text-xs" />
            </button>
          </div>
          <div className="hidden sm:block">
            <div className="flex gap-2 items-center ml-4">
              <button className="border border-black rounded-full p-1">
                <IoIosCall className="text-xs" />
              </button>
              <h6 className="text-xs">+21 315 909 909</h6>
            </div>
          </div>
        </div>
        <div className="lg:hidden">
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
            <RightSide />
          </div>
        </div>
      )}
      <div className="chat-h mx-3">
        <Chat />
      </div>
      <div className="bg-white relative rounded-b-xl flex items-center gap-3">
        <div className="flex items-center gap-3 p-3 border-r pe-2">
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
        </div>
        <div className="w-full py-3">
          <input
            type="text"
            className="w-full bg-[#3551B61A] p-2 rounded-lg"
          />
        </div>
        <div className="py-3 px-2">
          <button className="hidden sm:block py-3 px-8 text-white font-semibold bg-black text-xs rounded-lg">
            Send
          </button>
          <button className="sm:hidden">
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageSide;

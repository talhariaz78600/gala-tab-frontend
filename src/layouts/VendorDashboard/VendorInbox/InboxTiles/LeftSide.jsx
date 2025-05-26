import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Profile from "../../../../assets/img/profile.png";
import MessageSide from "./MessageSide";

const LeftSide = () => {
  const [showMessageSide, setShowMessageSide] = useState(false);

  const toggleMessageSide = () => {
    setShowMessageSide((prev) => !prev);
  };

  const messages = [
    {
      profileImg: Profile,
      vendorName: "Vendor Name 1",
      messageText: "Read message text in light show here",
      timeAgo: "10 mins ago",
    },
    {
      profileImg: Profile,
      vendorName: "Vendor Name 2",
      messageText: "Another message text here",
      timeAgo: "15 mins ago",
    },
    {
      profileImg: Profile,
      vendorName: "Vendor Name 3",
      messageText: "Yet another message text here",
      timeAgo: "1 hour ago",
    },
  ];

  return (
    <div className="h-full">
      <h4 className="text-[#3551B6] font-bold text-2xl">Vendors</h4>
      <div>
        <form action="">
          <div className="border rounded-full flex items-center gap-3 bg-white p-2 my-2">
            <label htmlFor="">
              <IoIosSearch className="text-xl" />
            </label>
            <input
              type="search"
              className="bg-transparent w-full focus-none"
              placeholder="Search Member"
            />
          </div>
        </form>
      </div>

      {showMessageSide && (
        <div className="absolute lg:hidden w-full top-0 left-0 bg-[#F7F7F7] rounded-xl shadow-lg">
          <MessageSide toggleMessageSide={toggleMessageSide} />
        </div>
      )}

      <div className="message-list max-h-[calc(100%-90px)] scroll-x-hidden overflow-y-auto">
        <div className="p-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className="bg-[#FFFFFF] hover:bg-black hover:text-white p-2 rounded-xl mb-3"
              onClick={toggleMessageSide}
            >
              <div>
                <div className="flex items-center gap-2">
                  <div>
                    <img
                      src={message.profileImg}
                      alt=""
                      className="size-10 max-w-10 border-2 border-white rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h6 className="text-xs font-semibold hover:text-white">
                      {message.vendorName}
                    </h6>
                    <p className="text-xs hover:text-white">
                      {message.messageText}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <p className="text-xs hover:hidden ms-auto">{message.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSide;

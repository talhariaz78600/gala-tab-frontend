import { Skeleton } from "@mui/material";
import React from "react";
import { FiMessageSquare, FiSend } from "react-icons/fi";

const MessageBubble = ({ message, isReceived }) => {
  return (
    <div className={`flex gap-2 p-3 ${isReceived ? "" : "justify-end"}`}>
      {isReceived && (
        <div>
          <img
            src={message.profileImg || "/default-image.jpg"}
            alt="Profile"
            className="size-10 max-w-10 border-2 border-white rounded-full object-cover"
          />
        </div>
      )}

      <div className={isReceived ? "sm:mr-40" : "sm:ml-40"}>
        <div
          className={`p-3 border rounded-xl ${
            isReceived
              ? "bg-[#C2C6CC] dark:bg-gray-700 text-black dark:text-white"
              : "bg-[#FFFFFF] dark:bg-gray-600 text-black dark:text-gray-200"
          }`}
        >
          <p className="text-xs">{message.text}</p>

          {isReceived ? (
            <span className="text-[9px] mt-3 block">
              Sent via {message.channel}
            </span>
          ) : (
            <div className="flex items-center justify-between mt-4">
              <span className="text-[9px]">{message.date}</span>
              <span className="text-[9px]">Sent via {message.channel}</span>
            </div>
          )}
        </div>

        {isReceived && (
          <div className="text-end">
            <span className="text-[9px]">{message.date}</span>
          </div>
        )}
      </div>

      {!isReceived && (
        <div>
          <img
            src={message.profileImg || "/default-image.jpg"}
            alt="Profile"
            className="size-10 max-w-10 border-2 border-white rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

const NoMessages = ({ selectedBooking }) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 gap-4 text-center p-8">
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full">
        <FiMessageSquare className="text-gray-400 text-4xl" />
      </div>
      <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
        {" "}
        {!selectedBooking ? "No Booking Selected" : "No messages yet"}
      </h3>
      <p className="text-gray-500 max-w-md">
        {!selectedBooking
          ? "Please select a booking to view the conversation."
          : "Start the conversation by sending your first message. It could be a greeting, a question, or anything you'd like to discuss."}
      </p>
    </div>
  );
};

const Chat = ({ messages, isLoading, selectedBooking }) => {
  const isReady = isLoading || messages === undefined;

  if (isReady) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(4)].map((_, i) => {
          const isReceived = i % 2 === 0;
          return (
            <div
              key={i}
              className={`flex gap-2 p-3 ${isReceived ? "" : "justify-end"}`}
            >
              {isReceived && (
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  className="flex-shrink-0"
                />
              )}

              <div className={isReceived ? "sm:mr-40" : "sm:ml-40"}>
                <div
                  className={`p-3 border rounded-xl w-fit max-w-xs ${
                    isReceived ? "bg-gray-200" : "bg-white"
                  }`}
                >
                  <Skeleton variant="text" width={180} height={10} />
                  <Skeleton
                    variant="text"
                    width={120}
                    height={10}
                    className="mt-2"
                  />
                  <div
                    className={`flex items-center justify-between mt-4 ${
                      isReceived ? "justify-end" : "justify-between"
                    }`}
                  >
                    <Skeleton variant="text" width={60} height={8} />
                    {isReceived ? null : (
                      <Skeleton variant="text" width={80} height={8} />
                    )}
                  </div>
                </div>
                {isReceived && (
                  <div className="text-end mt-1">
                    <Skeleton variant="text" width={60} height={8} />
                  </div>
                )}
              </div>

              {!isReceived && (
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  className="flex-shrink-0"
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }
  if (!selectedBooking || messages.length === 0) {
    return <NoMessages selectedBooking={selectedBooking} />;
  }

  return (
    <div>
      {messages?.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isReceived={message.isReceived}
        />
      ))}
    </div>
  );
};

export default Chat;

import React, { useEffect, useState } from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";
import { FiCalendar, FiDollarSign } from "react-icons/fi";
import Profile from "../../../assets/img/profile.png";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMessages,
  resetUnreadCount,
  setActiveBooking,
  setHasMoreChatMessages,
  setLoadingMessages,
} from "@/store/chatSlice";
import { emitEvent } from "@/services/socketService";
import dayjs from "dayjs";

const RightSide = ({ selectedBooking, setSelectedBooking }) => {
  const dispatch = useDispatch();
  const { bookings, activeChat } = useSelector((state) => state.chat);

  const handleSelectBooking = (bookingId) => {
    if (selectedBooking === bookingId) return;
    if (!activeChat) return;
    setSelectedBooking(bookingId);
    dispatch(setActiveBooking(bookingId));
    dispatch(setLoadingMessages(true));
    dispatch(clearMessages(activeChat));
    emitEvent("fetch-user-chat-messages", {
      chatId: activeChat,
      bookingId,
      pageNo: 1,
      recordsPerPage: 50,
    });
    dispatch(setHasMoreChatMessages(true));
    dispatch(resetUnreadCount(activeChat));
    emitEvent("mark-message-as-read", { activeChat });
  };

  if (!activeChat || bookings.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-600 p-4 rounded-lg shadow mb-3 text-center">
        <FiCalendar className="mx-auto text-3xl text-gray-400 mb-2" />
        <h4 className="font-medium text-gray-600 dark:text-white">
          No Bookings Found
        </h4>
        <p className="text-sm text-gray-500 dark:text-white mt-1">
          This chat doesn't have any associated bookings yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h6 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            Total Bookings
          </h6>
          <p className="text-green-600 dark:text-green-400 text-lg font-semibold">
            {bookings?.length || 0}
          </p>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select any Booking from Below
          </p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            onClick={() => handleSelectBooking(booking._id)}
            className={`cursor-pointer transition-shadow rounded-xl shadow-sm dark:shadow-none
            ${
              selectedBooking === booking._id
                ? "ring-2 ring-indigo-600 border border-indigo-600 bg-indigo-50 dark:bg-indigo-900"
                : "bg-white dark:bg-gray-900 hover:shadow-md dark:hover:shadow-indigo-700"
            }`}
          >
            {/* Booking header */}
            <div className="flex flex-wrap items-center justify-between p-4 gap-2 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h6 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Booking
                </h6>
                <span
                  className={`inline-block text-xs px-3 py-1 rounded-full font-semibold ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-400"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>

            {/* Image and title */}
            <div className="flex items-center gap-4 p-4">
              <img
                className="max-w-[70px] rounded-md object-cover shadow-sm"
                src={
                  booking?.servicedetail?.media?.find((img) => img.cover)
                    ?.url || "/default-image.jpg"
                }
                alt="decoration"
              />
              <p className="text-gray-900 dark:text-gray-100 font-medium">
                {booking?.servicedetail.title}
              </p>
            </div>

            {/* Price and Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 border-t border-b border-gray-200 dark:border-gray-700">
              <div>
                <h6 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                  Price
                </h6>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <FiDollarSign className="text-green-600 dark:text-green-400" />
                  <p className="font-medium text-sm">${booking.totalPrice}</p>
                </div>
              </div>
              <div>
                <h6 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                  Total Guests
                </h6>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <PiUsersThree className="text-indigo-600 dark:text-indigo-400" />
                  <p className="font-medium text-sm">{booking.guests}</p>
                </div>
              </div>
            </div>

            {/* Check-In & Check-Out */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
              <div>
                <h6 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                  Check-In
                </h6>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  {dayjs(booking.checkIn).format("MMMM D, YYYY h:mm A")}
                </p>
              </div>
              <div>
                <h6 className="font-semibold text-base text-gray-900 dark:text-gray-100">
                  Check-Out
                </h6>
                <p className="text-green-600 dark:text-green-400 font-medium">
                  {dayjs(booking.checkOut).format("MMMM D, YYYY h:mm A")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RightSide;

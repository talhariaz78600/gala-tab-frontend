import React, { useEffect, useState } from "react";
import DoubleBell from "../../assets/img/double-bell.png";
import { GoDotFill } from "react-icons/go";
import {
  emitEvent,
  listenToEvent,
  removeListener,
} from "@/services/socketService";
import dayjs from "dayjs";
import { Skeleton, Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearUnreadNotifications } from "@/store/notificationSlice";

export default function AdminNotifications() {
  const unreadNotifications = useSelector((state) => state.notification.unread);
  const loading = false;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleRead = (data) => {
      console.log("🔔 New notification received:", data);
    };
    listenToEvent("read-notifications", handleRead);

    const timer = setTimeout(() => {
      emitEvent("read-user-notifications", {});
    }, 1000);

    return () => {
      clearTimeout(timer);
      removeListener("read-notifications");
      dispatch(clearUnreadNotifications());
    };
  }, [dispatch]);

  const renderSkeletons = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="bg-[#F1F1F1] rounded-[10px] p-3 flex lg:flex-row flex-col justify-between mb-3 gap-4"
      >
        <div className="flex items-center gap-2">
          <Skeleton variant="circular" width={48} height={48} />
          <div className="flex flex-col gap-1">
            <Skeleton variant="text" width={180} height={24} />
            <Skeleton variant="text" width={250} height={20} />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <Skeleton variant="text" width={100} height={20} />
        </div>
      </div>
    ));
  };

  return (
    <div>
      <h4 className="font-semibold leading-normal text-[25px] text-gray-900 dark:text-gray-100">
        All Notifications
      </h4>
      <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">
        Manage user accounts and permissions with detailed views and actions,
        including the ability to edit, suspend, and close user profiles.
      </p>

      <div className="rounded-[20px] bg-gray-100 dark:bg-gray-800 p-3 mt-6">
        {loading ? (
          renderSkeletons()
        ) : unreadNotifications.length === 0 ? (
          <p className="text-gray-800 dark:text-gray-300">
            No unread notifications
          </p>
        ) : (
          unreadNotifications.map((notification) => (
            <div
              key={notification._id}
              className="bg-gray-200 dark:bg-gray-700 rounded-[10px] p-3 flex lg:flex-row flex-col justify-between mb-3 gap-4"
            >
              <div className="flex items-center gap-2">
                <img
                  src={DoubleBell}
                  alt=""
                  className="bg-black p-3 rounded-full w-12 h-12 max-w-12 object-contain"
                />
                <div>
                  <h6 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                    {notification.title}
                  </h6>
                  <p className="text-gray-800 dark:text-gray-300">
                    {notification.message}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 text-gray-800 dark:text-gray-300">
                {dayjs(notification.createdAt).format("DD MMM YYYY")}
                <GoDotFill className="text-gray-800 dark:text-gray-300" />
                <p>{dayjs(notification.createdAt).format("hh:mm A")}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

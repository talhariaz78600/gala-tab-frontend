import React, { useEffect } from "react";
import Profile from "../../assets/img/profile.png";
import { Link, useNavigate } from "react-router";
import { IoPencil } from "react-icons/io5";
import PersonalInfo from "./PersonalInfo";
import { useDispatch, useSelector } from "react-redux";
import {
  emitEvent,
  listenToEvent,
  removeListener,
} from "@/services/socketService";
import { addOrUpdateChat, setActiveChat } from "@/store/chatSlice";

export default function ProfileDetails({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleJumpToInbox = (userId) => {
    emitEvent("get-user-single-chat", {
      receiverId: userId,
      chatType: user?.role === "admin" ? "contact" : "service",
    });
  };

  useEffect(() => {
    const handleSingleChat = (chatData) => {
      dispatch(addOrUpdateChat(chatData?.chatScreenBody));
      dispatch(setActiveChat(chatData?.chatScreenBody?.chatId));

      if (user?.role === "admin") {
        navigate("/admin-dashboard/contact-support", {
          state: { chatId: chatData?.chatScreenBody?.chatId },
        });
      } else if (user?.role === "vendor") {
        navigate("/Vendor-Inbox");
      } else {
        navigate("/User-Inbox");
      }
    };

    listenToEvent("get-single-chat", handleSingleChat);
    return () => {
      removeListener("get-single-chat", handleSingleChat);
    };
  }, [dispatch, navigate, user?.role]);

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 p-3 border rounded-[20px] shadow-[0px_0px_24px_0px_#00000012] mt-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <img
                  className="size-[100px] max-w-[100px] rounded-full object-cover"
                  src={data?.profilePicture || Profile}
                  alt=""
                />
                <div className="absolute bottom-[5px] right-[9px] w-4 h-4 bg-[#0A8A01] rounded-full border border-white-2"></div>
              </div>
              <div>
                <h5 className="font-semibold sm:text-xl text-sm">
                  {data?.fullName}
                </h5>
                <p className="text-base font-medium text-[#202224] dark:text-white">
                  {data?.role}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 ms-auto justify-end">
            {(data?.status === "active" || data?.status === "Active") && (
              <button
                onClick={() => handleJumpToInbox(data?._id)}
                className="flex items-center gap-2 border border-[#000000] text-[#ffffff] px-4 py-2 rounded-[8px] bg-black shadow-[0px_10px_20px_0px_#0000001A]"
              >
                Jump to Inbox
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <PersonalInfo data={data} />
      </div>
    </div>
  );
}

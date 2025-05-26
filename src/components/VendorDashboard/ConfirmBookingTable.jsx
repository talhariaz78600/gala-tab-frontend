import React, { useEffect } from "react";
import guestimg from "../../assets/img/guest-img.png";
import decoration from "../../assets/img/decoration.png";
import CalenderIcon from "../../assets/img/calendar-icon.png";
import ChatIcon from "../../assets/img/chat-icon.png";
import vuReview from "../../assets/img/vu-review.png";
import { Link, useNavigate } from "react-router";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import { getDuration } from "@/utils/getDuration";
import {
  emitEvent,
  listenToEvent,
  removeListener,
} from "@/services/socketService";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateChat, setActiveChat } from "@/store/chatSlice";

export default function ConfirmBookingTable({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleJumpToInbox = (userId) => {
    emitEvent("get-user-single-chat", {
      receiverId: userId,
      chatType: user?.role === "admin" ? "contact" : "service",
    });
  };

  const columns = [
    { Header: "Service Name" },
    { Header: "Guest" },
    { Header: "Check-In Date" },
    { Header: "Check-Out Date" },
    { Header: "Time Duration" },
    { Header: "Status" },
    { Header: "Actions" },
  ];

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
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
        <thead>
          <tr>
            {columns.map((col, index) => {
              if (
                col.Header === "Actions" &&
                !data?.some((row) => row.status !== "completed")
              ) {
                return null;
              }
              return (
                <th
                  className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                  key={index}
                >
                  {col.Header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="font-medium">
          {data?.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="p-4 bg-white dark:bg-gray-800 text-center"
              >
                No data found
              </td>
            </tr>
          )}
          {data?.map((row) => (
            <tr key={row.id}>
              <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                <div className="flex items-center">
                  {(() => {
                    const coverMedia = row?.service?.media?.find(
                      (m) => m.cover
                    );
                    if (!coverMedia) return null;

                    return coverMedia.type === "video" ? (
                      <video
                        src={coverMedia.url || "/video-default.png"}
                        className="lg:max-w-[180px] max-w-[80px] aspect-[2/1] rounded-[10px] object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={coverMedia.url || "/video-default.png"}
                        alt="Cover"
                        className="lg:max-w-[180px] max-w-[80px] aspect-[2/1] rounded-[10px] object-cover"
                      />
                    );
                  })()}
                  <button
                    onClick={() =>
                      navigate(
                        `/vendor-dashboard/booking-details/${row?.service?._id}`,
                        {
                          state: { data: row, mode: "all" },
                        }
                      )
                    }
                    className="ms-4 max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {row.service.title}
                  </button>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <Avatar
                    onClick={() =>
                      navigate("/vendor-dashboard/client-profile", {
                        state: { id: row?.user?._id },
                      })
                    }
                    src={row?.user?.profilePicture || guestimg}
                    alt=""
                    className="cursor-pointer"
                  />
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row.user.fullName}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 text-[#D92D20]">
                {dayjs(row.checkIn).format("MMMM D, YYYY h:mm A")}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 text-[#D92D20]">
                {dayjs(row?.checkOut).format("MMMM D, YYYY h:mm A")}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 ">
                {getDuration(row?.checkIn, row?.checkOut)}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <p
                  className={`p-2 min-w-[100px] text-center rounded-full font-semibold text-sm
      ${
        row?.status === "booked"
          ? "bg-[#E6F4EA] text-[#34A853]"
          : row?.status === "pending"
          ? "bg-[#FFF5E6] text-[#F79009]"
          : row?.status === "completed"
          ? "bg-[#E6EEFF] text-[#155EEF]"
          : "bg-gray-200 text-gray-600"
      }`}
                >
                  {row?.status?.charAt(0).toUpperCase() + row?.status?.slice(1)}
                </p>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                {row?.status !== "completed" && (
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleJumpToInbox(row?.user?._id)}>
                      <img
                        className="size-12 max-w-12"
                        src={ChatIcon}
                        alt="img"
                      />
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/vendor-dashboard/calendar`, {
                          state: { date: row?.checkIn },
                        })
                      }
                    >
                      <img
                        className="size-12 max-w-12"
                        src={CalenderIcon}
                        alt="img"
                      />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

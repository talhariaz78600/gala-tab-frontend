import React, { useEffect } from "react";
import ImgList from "../../../assets/img/list-detail2.png";
import LikeButton from "../../../components/LandingPage/LikeButton";
import { FaStar } from "react-icons/fa";
import ProfileName from "../../../assets/img/profile-name.png";
import Profile from "../../../assets/img/profile.png";
import { Link, useNavigate } from "react-router";
import CancelBookingModal from "../../../components/UserDashboard/CancelBookingModal";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrUpdateChat, setActiveChat } from "@/store/chatSlice";
import {
  emitEvent,
  listenToEvent,
  removeListener,
} from "@/services/socketService";

const ConfirmBooking = ({ data }) => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const { activeChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const handleOpen = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };
  const handleClose = () => setOpen(false);

  const handleJumpToInbox = (userId) => {
    emitEvent("get-user-single-chat", {
      receiverId: userId,
      chatType: "service",
    });
  };

  useEffect(() => {
    const handleSingleChat = (chatData) => {
      console.log("chatData", chatData);

      dispatch(addOrUpdateChat(chatData?.chatScreenBody));
      dispatch(setActiveChat(chatData?.chatScreenBody?.chatId));

      navigate("/user-inbox");
    };

    listenToEvent("get-single-chat", handleSingleChat);

    return () => {
      removeListener("get-single-chat", handleSingleChat);
    };
  }, [dispatch, navigate]);

  return (
    <div>
      <div className="grid xl:grid-cols-2 gap-4">
        {data?.length === 0 && (
          <div className="text-center">
            <p className="text-[#1C1C1C] dark:text-white text-sm font-medium">
              No data found
            </p>
          </div>
        )}
        {data?.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-white dark:bg-gray-800 rounded-xl grid lg:grid-cols-2 gap-4"
          >
            <div className="relative">
              {(() => {
                const coverMedia = item?.service?.media?.find((m) => m.cover);
                if (!coverMedia) return null;
                return coverMedia.type === "video" ? (
                  <video
                    src={coverMedia.url || "/video-default.png"}
                    className="h-[200px] w-full object-cover rounded-[10px]"
                    controls
                  />
                ) : (
                  <img
                    src={coverMedia.url || "/video-default.png"}
                    alt="Cover"
                    className="h-[200px] w-full object-cover rounded-[10px]"
                  />
                );
              })()}
              {item.verified && (
                <div className="absolute top-2 left-3">
                  <p className="text-[#1C1C1C] text-xs font-medium bg-white p-2 rounded-md">
                    Verified listing
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <h5 className="font-medium text-base">
                      {item.service.title}
                    </h5>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium text-base">Status:</h5>
                      <p className="text-[#34A853] text-sm font-medium">
                        {item.status}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-[#484848] dark:text-white font-medium text-sm">
                  {item.service.description}
                </p>
                <div>
                  <h5 className="font-medium text-base">Vendor Profile</h5>
                  <div className="flex items-center gap-3 mt-5">
                    <div className="relative">
                      <Avatar
                        onClick={() =>
                          navigate("/user-dashboard/vendor-profile", {
                            state: { id: item?.vendor?._id },
                          })
                        }
                        src={item?.vendor?.profilePicture || Profile}
                        alt=""
                        className="w-20 h-20 object-cover  cursor-pointer"
                      />
                      <div className="absolute bottom-0 right-0">
                        <img src={ProfileName} alt="" />
                      </div>
                    </div>
                    <div>
                      <h6 className="text-sm">
                        {item.vendor.firstName} {item.vendor.lastName}
                      </h6>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <h4 className="text-base font-medium">Total Guests:</h4>
                    <p className="text-[#484848] dark:text-white text-sm font-medium">
                      {item.guests}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <h4 className="text-base font-medium">Total Price:</h4>
                    <p className="text-[#484848] dark:text-white text-sm font-medium">
                      {item.totalPrice}
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-2">
                <div>
                  <button
                    onClick={() => handleJumpToInbox(item?.vendor?._id)}
                    className="bg-[#000] font-medium border border-black text-white py-2 w-full inline-block text-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                  >
                    Jump to Inbox
                  </button>
                </div>
                <div>
                  {item.status === "pending" && (
                    <button
                      onClick={() => handleOpen(item)}
                      className="bg-[#D92D20] border border-black text-white py-2 w-full inline-block text-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                    >
                      Cancel Request
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CancelBookingModal
        open={open}
        handleClose={handleClose}
        data={selectedRow}
      />
    </div>
  );
};

export default ConfirmBooking;

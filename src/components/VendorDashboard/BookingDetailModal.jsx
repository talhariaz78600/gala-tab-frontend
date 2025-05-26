import React from "react";
import { RiCloseCircleFill } from "react-icons/ri";
import decoration from "../../assets/img/decoration.png";
import { Link } from "react-router";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import guestimg from "../../assets/img/guest-img.png";
import clockIcon from "../../assets/img/clockIcon.png";
import dollorIcon from "../../assets/img/dollorIcon.png";
import teamIcon from "../../assets/img/teamIcon.png";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useUpdateBookingVendorMutation } from "@/api/apiSlice";

export default function BookingDetailModal({ handleClose, data }) {
  const checkIn = dayjs(data.checkIn);
  const checkOut = dayjs(data.checkOut);

  const durationInHours = checkOut.diff(checkIn, "hour");
  const durationInMinutes = checkOut.diff(checkIn, "minute");

  const formattedduration = `${durationInHours} hour(s) ${
    durationInMinutes % 60
  } minute(s)`;

  const bookingInfo = [
    {
      title: "Service Name",
      value: data?.service.title || "Decoration Wedding",
    },
    {
      title: "Guest",
      value: data?.user.fullName || "requestpersonname",
    },
    {
      title: "Check-In Date",
      value: dayjs(data.checkIn).format("MMMM D, YYYY") || "Date",
    },
    {
      title: "Time Duration",
      value: formattedduration || "4hr min",
    },
  ];

  const GuestInfo = [
    {
      title: "Guest Name",
      Icon: guestimg,
      value: data?.user.fullName || "requestpersonname",
    },
    {
      title: "Total Guest",
      Icon: teamIcon,
      value: data?.guests || "0",
    },
    {
      title: "Total Time",
      Icon: clockIcon,
      value: formattedduration || "4hr min",
    },
    {
      title: "Price",
      Icon: dollorIcon,
      value: data?.totalPrice || "0",
    },
  ];

  const [updateBookingVendor, { isLoading }] = useUpdateBookingVendorMutation();

  const handleUpdate = async (id, status) => {
    try {
      const response = await updateBookingVendor({ id, data: { status } });

      if (response?.data?.status === "success") {
        toast.success("Status updated successfully!");
        handleClose();
      } else {
        toast.error("Failed to update status. Please try again.");
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("An error occurred while updating status.");
    }
  };
  return (
    <div>
      <div className="p-4 flex justify-between items-center flex-wrap-reverse border-b border-[#CDCDCD]">
        <div className=" w-full sm:w-[calc(100%-52px)]">
          <p className="text-base min-[480px]:text-[20px] sm:text-[18px] text-center font-semibold">
            Booking Request & Guest Information Details
          </p>
        </div>
        <button className="ms-auto mb-1 sm:mb-0">
          <RiCloseCircleFill
            className="text-[24px] text-[#D92D20]"
            onClick={handleClose}
          />
        </button>
      </div>
      <div className="p-4 max-h-[calc(100vh-200px)] scroll-x-hidden overflow-y-auto">
        <div className="bg-[#F7F7F7] dark:bg-gray-800 border border-[#D5D5D5] p-3 rounded-[20px]">
          <div className="flex items-center justify-between gap-2">
            <p className="sm:text-lg font-semibold"> {data.service.title}</p>
            <Link
              to="/vendor-dashboard/calendar"
              className="flex items-center gap-2 text-[#3551B6]"
            >
              Go Calendar <LuSquareArrowOutUpRight />{" "}
            </Link>
          </div>
          <div className="flex items-center justify-between gap-4 mt-2 flex-wrap">
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <img
                className="w-[150px] rounded-[10px] aspect-video object-cover"
                src={data.service.media.find((img) => img.cover)?.url}
                alt="img"
              />
              <div className="max-w-[130px]">
                <p className="font-medium text-nowrap overflow-hidden text-ellipsis">
                  {data.service.title}
                </p>
              </div>
            </div>
            <div className="grid min-[480px]:grid-cols-2 md:grid-cols-4 gap-4 w-full lg:w-[calc(100%-310px)]">
              {bookingInfo.map((item) => (
                <div key={item.title}>
                  <p className="sm:text-lg font-semibold">{item.title}</p>
                  <p className="font-medium text-[#34A853]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-4 justify-between ">
            <p className="sm:text-lg font-semibold">Guest Information</p>
          </div>
          <div className="mt-4">
            <div className="grid min-[480px]:grid-cols-2 md:grid-cols-4 gap-4 max-w-[900px]">
              {GuestInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col h-full justify-between"
                >
                  <p className="sm:text-lg font-semibold">{item.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <img
                      className={`${
                        item.title === "Guest Name"
                          ? "w-[50px] h-[50px] rounded-full object-cover"
                          : "sm:size-7 size-4 object-contain"
                      }`}
                      src={item.Icon}
                      alt="img"
                    />
                    <p className="font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* <div className="mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-[#0C1421] ps-1" htmlFor="Welcome-Message">
                Welcome Message
              </label>
              <textarea
                className="block w-full border border-[#D4D7E3] rounded-[10px] placeholder:text-[#8897AD] placeholder:text-[14px] focus:outline-none resize-none p-4 bg-[#F7FBFF]"
                name="Welcome-Message"
                id="Welcome-Message"
                placeholder="Type here"
              ></textarea>
            </div>
            <div>
              <label className="text-[#0C1421] ps-1" htmlFor="Internal-Notes">
                Internal Notes
              </label>
              <textarea
                className="block w-full border border-[#D4D7E3] rounded-[10px] placeholder:text-[#8897AD] placeholder:text-[14px] focus:outline-none resize-none p-4 bg-[#F7FBFF]"
                name="Internal-Notes"
                id="Internal-Notes"
                placeholder="Type here"
              ></textarea>
            </div>
          </div>
        </div> */}
        <div className="mt-16 px-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => {
                handleUpdate(data._id, "booked");
                handleClose();
              }}
              disabled={isLoading}
              className="bg-[#34A853] text-white py-3 rounded-[10px] shadow-[0px_10px_20px_0px_#0000001A]"
            >
              Accept
            </button>
            <button
              onClick={() => {
                handleUpdate(data._id, "rejected");
                handleClose();
              }}
              disabled={isLoading}
              className="bg-[#D92D20] text-white py-3 rounded-[10px] shadow-[0px_10px_20px_0px_#0000001A]"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

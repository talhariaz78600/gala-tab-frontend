import React from "react";
import editIcon from "../../../assets/img/chat-icon.png";
import deleteIcon from "../../../assets/img/calendar-icon.png";
import { Link, useNavigate } from "react-router";
import stripe from "../../../assets/img/list-detail3.png";
import guest from "../../../assets/img/guest-img2.png";
import Modal from "@mui/material/Modal";
import BookingDetailModal from "../../../components/UserDashboard/BookingDetailModal";
import { Avatar } from "@mui/material";
import CalenderIcon from "../../../assets/img/calendar-icon.png";
import ChatIcon from "../../../assets/img/chat-icon.png";
import dayjs from "dayjs";
import { useUpdateBookingVendorMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";
import { getDuration } from "@/utils/getDuration";

const ConfirmBooking = ({ data, mode }) => {
  const navigate = useNavigate();
  const columns = [
    { Header: "Service Name" },
    { Header: "Guest" },
    { Header: "Check-In Date" },
    { Header: "Check-Out Date" },
    { Header: "Time Duration" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const [updateBookingVendor, { isLoading }] = useUpdateBookingVendorMutation();

  const handleUpdate = async (id, status) => {
    try {
      const response = await updateBookingVendor({ id, data: { status } });

      if (response?.data?.status === "success") {
        toast.success("Status updated successfully!");
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
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0">
        <thead>
          <tr>
            {columns.map((col, index) => {
              if (col.Header === "Action" && mode === "all") {
                return null;
              }
              if (
                col.Header === "Action" &&
                mode === "admin" &&
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
              <td colSpan={columns.length} className="p-4 bg-white text-center">
                No data found
              </td>
            </tr>
          )}

          {data?.map((row, index) => (
            <tr key={index}>
              {/* Service Name */}
              <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                <div className="flex items-center gap-3">
                  {(() => {
                    const coverMedia = row?.service?.media?.find(
                      (m) => m.cover
                    );
                    if (!coverMedia) return null;

                    return coverMedia.type === "video" ? (
                      <video
                        src={coverMedia.url}
                        className="lg:max-w-[180px] max-w-[80px] aspect-[2/1] rounded-[10px] object-cover"
                        controls
                      />
                    ) : (
                      <img
                        src={coverMedia.url}
                        alt="Cover"
                        className="lg:max-w-[180px] max-w-[80px] aspect-[2/1] rounded-[10px] object-cover"
                      />
                    );
                  })()}

                  <p
                    onClick={() =>
                      navigate(
                        `/admin-dashboard/Admin-Booking-Details/${row?.service?._id}`,
                        {
                          state: { data: row, mode },
                        }
                      )
                    }
                    className="cursor-pointer"
                  >
                    {row?.service?.title}
                  </p>
                </div>
              </td>

              {/* Guest */}
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <Avatar src={row?.user?.profilePicture} alt="" />
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row?.user?.fullName}
                  </p>
                </div>
              </td>

              {/* Check-In Date */}
              <td className="p-4 bg-white dark:bg-gray-800 text-[#D92D20]">
                {dayjs(row?.checkIn).format("MMMM D, YYYY h:mm A")}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 text-[#D92D20]">
                {dayjs(row?.checkOut).format("MMMM D, YYYY h:mm A")}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 text-[#D92D20]">
                {getDuration(row?.checkIn, row?.checkOut)}
              </td>

              {/* Status */}
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

              {/* Action Buttons */}
              {mode === "admin" && row.status !== "completed" && (
                <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                  {row.status === "pending" ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdate(row?._id, "booked")}
                        className="lg:p-4 p-2 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A] text-center border border-black min-w-[100px] text-white px-6 bg-[#34A853]"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdate(row?._id, "rejected")}
                        className="lg:p-4 p-2 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A] text-center border border-black min-w-[100px] text-white px-6 bg-[#D92D20]"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {/* <Link to="/inbox">
                        <img
                          className="size-12 max-w-12"
                          src={ChatIcon}
                          alt="Chat"
                        />
                      </Link> */}
                      <button
                        onClick={() =>
                          navigate(`/admin-dashboard/calendar`, {
                            state: { date: row?.checkIn },
                          })
                        }
                      >
                        <img
                          className="size-12 max-w-12"
                          src={CalenderIcon}
                          alt="Calendar"
                        />
                      </button>
                    </div>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <Loader loading={isLoading} />
    </div>
  );
};

export default ConfirmBooking;

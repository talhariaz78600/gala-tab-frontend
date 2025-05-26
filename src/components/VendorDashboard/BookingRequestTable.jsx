import React from "react";
import guestimg from "../../assets/img/guest-img.png";
import decoration from "../../assets/img/decoration.png";
import { Link } from "react-router";
import Modal from "@mui/material/Modal";
import BookingDetailModal from "./BookingDetailModal";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";
import { useUpdateBookingVendorMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../loader/Loader";
import { getDuration } from "@/utils/getDuration";

export default function BookingRequestTable({ data }) {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpen = (selectedRow) => {
    setSelectedRow(selectedRow);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const [updateBookingVendor, { isLoading }] = useUpdateBookingVendorMutation();

  const columns = [
    { Header: "Service Name" },
    { Header: "Guest" },
    { Header: "Check-In Date" },
    { Header: "Check-Out Date" },
    { Header: "Time Duration" },
    { Header: "Status" },
    { Header: "Actions" },
  ];

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
      <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                key={col.accessor}
              >
                {col.Header}
              </th>
            ))}
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

                  <p
                    onClick={() => handleOpen(row)}
                    className="ms-4 max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
                  >
                    {row?.service?.title}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <Avatar src={row?.user?.profilePicture || guestimg} alt="" />
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row?.user?.fullName}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 text-[#D92D20]">
                {dayjs(row?.checkIn).format("MMMM D, YYYY h:mm A")}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 text-[#D92D20]">
                {dayjs(row?.checkOut).format("MMMM D, YYYY h:mm A")}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 text-[#344054] dark:text-white">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Loader loading={isLoading} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1100px] bg-white dark:bg-gray-800 rounded-[20px]">
          <BookingDetailModal handleClose={handleClose} data={selectedRow} />
        </div>
      </Modal>
    </div>
  );
}

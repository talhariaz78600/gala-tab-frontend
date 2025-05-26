import React, { useState } from "react";
import guest from "../../assets/img/guest-img2.png";
import { Link } from "react-router";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import serviceImg from "../../assets/img/serviceImg.png";
import StarRatingCustomSize from "./StarRatingCustomSize";
import DeletePopup from "../DeletePopup";
import StarRating from "../UserDashboard/StarRating";
import dayjs from "dayjs";

import Profile from "../../assets/img/profile.png";
import { useDeleteReviewMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

export default function ReviewListTable({ data }) {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const columns = [
    { Header: "Service Name" },
    { Header: "Service Owner" },
    { Header: "Email" },
    { Header: "Reviews Dates" },
    { Header: "Rating" },
    { Header: "Star" },
    { Header: "Action" },
  ];

  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();

  const handleDelete = async () => {
    try {
      await deleteReview(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                key={index}
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
                colSpan={columns.length}
                className="p-4 bg-white dark:bg-gray-800 text-center"
              >
                No data found
              </td>
            </tr>
          )}
          {data?.map((row, index) => (
            <tr key={index}>
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                  {(() => {
                    const coverMedia = row?.service?.media?.find(
                      (m) => m.cover
                    );
                    if (!coverMedia) return null;

                    return coverMedia.type === "video" ? (
                      <video
                        src={coverMedia.url || "/video-default.png"}
                        className="h-12 w-64 rounded-full object-cover me-2 max-w-[70px]"
                      />
                    ) : (
                      <img
                        src={coverMedia.url || "/video-default.png"}
                        alt="Cover"
                        className="h-12 w-64  rounded-full object-cover me-2 max-w-[70px]"
                      />
                    );
                  })()}
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row?.service?.title}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                  <img
                    className="size-12 rounded-full  object-cover me-2 max-w-[50px]"
                    src={row?.serviceOwner?.profilePicture}
                    alt=""
                  />
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row?.serviceOwner?.firstName} {row?.serviceOwner?.lastName}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                {row?.serviceOwner?.email}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                {" "}
                <p>{dayjs(data.updatedAt).format("MM/DD/YYYY")}</p>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">{row.rating}</td>
              <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                <StarRating isInteractive={false} rating={row.rating} />
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <button onClick={() => setDeleteOpen(row._id)}>
                  <img
                    className="w-[50px] aspect-square max-w-[50px]"
                    src={deleteIcon}
                    alt="Delete"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
      <Loader loading={isDeleting} />
    </div>
  );
}

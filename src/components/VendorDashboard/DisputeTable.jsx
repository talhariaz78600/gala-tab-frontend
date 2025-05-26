import React, { useState } from "react";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import { Link, useNavigate } from "react-router";
import messageIcon from "../../assets/img/messageIcon.png";
import { IoSearch } from "react-icons/io5";
import DeletePopup from "../DeletePopup";
import { useDeleteDisputeMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

export default function DisputeTable({ data, type }) {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const columns = [
    { Header: "Property ID" },
    { Header: "Property" },
    { Header: "Description of Dispute" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const [deleteDispute, { isLoading }] = useDeleteDisputeMutation();

  const handleDelete = async () => {
    try {
      await deleteDispute(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
          <thead>
            <tr>
              {columns.map((col, index) => (
                <th
                  className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium last:text-end"
                  key={index}
                >
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-medium">
            {data?.length === 0 && (
              <tr className="bg-white dark:bg-gray-800">
                <td colSpan={columns.length} className="p-4 text-center">
                  No data available
                </td>
              </tr>
            )}
            {data?.map((row, index) => (
              <tr key={index}>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                  {row.propertyID}
                </td>
                <td
                  className="p-4 bg-white dark:bg-gray-800"
                  onClick={() =>
                    navigate(
                      type === "vendor"
                        ? `/vendor-dashboard/dispute-details`
                        : `/user-dashboard/dispute-details`,
                      {
                        state: { id: row._id },
                      }
                    )
                  }
                >
                  <p className="cursor-pointer">{row?.property?.title}</p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  <p
                    title={row.desc}
                    className="w-[400px] text-wrap line-clamp-2 overflow-hidden"
                  >
                    {row.description}
                  </p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">{row.status}</td>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() =>
                        navigate(
                          type === "vendor"
                            ? `/vendor-dashboard/edit-dispute`
                            : `/user-dashboard/edit-dispute`,
                          {
                            state: { data: row },
                          }
                        )
                      }
                    >
                      <img
                        className="w-[50px] aspect-square max-w-[50px]"
                        src={editIcon}
                        alt=""
                      />
                    </button>

                    {/* <Link to="/Vendor-Inbox">
                      <img
                        className="w-[50px] aspect-square max-w-[50px]"
                        src={messageIcon}
                        alt=""
                      />
                    </Link> */}
                    <button onClick={() => setDeleteOpen(row._id)}>
                      <img
                        className="w-[50px] aspect-square max-w-[50px]"
                        src={deleteIcon}
                        alt=""
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
      <Loader loading={isLoading} />
    </div>
  );
}

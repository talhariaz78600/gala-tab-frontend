import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import { IoSearch } from "react-icons/io5";
import DeletePopup from "../DeletePopup";
import {
  useDiscountDeleteMutation,
  useDiscountUpdateMutation,
} from "@/api/apiSlice";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

export default function PromoDiscountTable({ data }) {
  const navigate = useNavigate();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteDiscount, { isLoading: isDeleteLoading }] =
    useDiscountDeleteMutation();

  const [updateDiscount, { isLoading: isUpdating }] =
    useDiscountUpdateMutation();

  const handleDelete = async () => {
    try {
      await deleteDiscount(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };
  const columns = [
    { Header: "Discount Name" },
    { Header: "Discount Type" },
    { Header: "Start-End Date" },
    { Header: "Percentage or Max Discount" },

    { Header: "Min Amount in Cart" },
    { Header: "Max Total Usage" },
    { Header: "Discount Code" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    try {
      const response = await updateDiscount({
        id,
        data: { status: newStatus },
      }).unwrap();

      if (response.status === "success") {
        toast.success("Status updated");
      } else {
        toast.error(response.message || "Update failed");
      }
    } catch (error) {
      toast.error("Failed to update status");
      console.error("Update error:", error);
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
                <td colSpan={columns?.length} className="text-center">
                  No data found
                </td>
              </tr>
            )}
            {data?.map((row, index) => (
              <tr key={row.index} id={`row-${index + 1}`}>
                <td className="p-4 bg-white dark:bg-gray-800 ">
                  <p className="max-w-[100px] text-wrap">{row?.discountName}</p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-800 ">
                  {row?.discountType}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800 ">
                  <p className="max-w-[100px] text-wrap">
                    {new Date(row.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(row.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </td>

                <td className="p-4 bg-white dark:bg-gray-800  text-center">
                  {row?.percentage != null
                    ? `${row.percentage}%`
                    : `$ ${row?.maxDiscount}`}
                </td>

                <td className="p-4 bg-white dark:bg-gray-800 ">
                  {row.minAmountInCart}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800 ">
                  {row.maxTotalUsage}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800 ">
                  {row?.discountCode}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800 ">
                  <div className="relative group">
                    <button
                      onClick={() => toggleStatus(row._id, row.status)}
                      className={`${
                        row.status === "Active"
                          ? "text-[#34A853]"
                          : "text-[#EA3548]"
                      }`}
                    >
                      {row.status}
                    </button>
                    <div
                      className={`absolute clip-message right-full bottom-full transform p-2 ${
                        row.status === "Active"
                          ? "bg-[#BE3516]"
                          : "bg-[#34A853]"
                      } text-white text-[14px] rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-[0px_10px_24px_0px_#00000033]`}
                    >
                      {`Click to ${
                        row.status === "Active" ? "Inactive" : "Active"
                      }`}
                    </div>
                  </div>
                </td>
                <td className="p-4 bg-white dark:bg-gray-800  rounded-e-[10px]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/vendor-dashboard/edit-discount/${row._id}`, {
                          state: { data: row },
                        })
                      }
                    >
                      <img
                        className="w-[50px] aspect-square max-w-[50px]"
                        src={editIcon}
                        alt=""
                      />
                    </button>
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
      <Loader loading={isDeleteLoading} />
    </div>
  );
}

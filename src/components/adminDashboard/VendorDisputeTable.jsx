import React from "react";
import { useNavigate } from "react-router";
import guestImg from "../../assets/img/guest-img.png";
import { IoSearch } from "react-icons/io5";
import { useUpdateAdminDisputeMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";

export default function VendorDisputeTable({ data }) {
  const navigate = useNavigate();
  const [updateAdminDispute] = useUpdateAdminDisputeMutation();

  const columns = [
    { Header: "Property ID" },
    { Header: "Property" },
    { Header: "Vendor Name" },
    { Header: "Description of Dispute" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const handleStatusChange = async (id, status) => {
    try {
      const response = await updateAdminDispute({ id, data: { status } });

      if (response?.data.status === "success") {
        toast.success(`Dispute successfully marked as ${status}`, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error(
          response?.message || "Something went wrong while updating status",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      }
    } catch (error) {
      console.error("Dispute update error:", error);
      toast.error("Failed to update dispute status", {
        position: "top-right",
        autoClose: 3000,
      });
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
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 bg-white dark:bg-gray-800 "
                >
                  No data available
                </td>
              </tr>
            )}

            {data?.map((row, index) => (
              <tr key={index}>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                  {row.propertyID}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  <p
                    className="cursor-pointer"
                    onClick={() =>
                      navigate("/admin-dashboard/dispute-details", {
                        state: { id: row._id },
                      })
                    }
                  >
                    {row.property.title}
                  </p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  <div className="flex items-center">
                    <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {row?.vendor?.firstName} {row?.vendor?.lastName}
                    </p>
                  </div>
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  <p
                    title={row.description}
                    className="w-[400px] text-wrap line-clamp-2 overflow-hidden"
                  >
                    {row.description}
                  </p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  <p className="cursor-pointer">{row.status}</p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleStatusChange(row._id, "Review")}
                      className="text-white font-medium bg-[#3551B6] border border-black p-3 min-w-[120px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleStatusChange(row._id, "Accept")}
                      className="text-white font-medium bg-[#34A853] border border-black p-3 min-w-[120px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleStatusChange(row._id, "Reject")}
                      className="text-white font-medium bg-[#D92D20] border border-black p-3 min-w-[120px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

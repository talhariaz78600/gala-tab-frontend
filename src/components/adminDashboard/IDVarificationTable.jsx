import React, { useState } from "react";
import guest from "../../assets/img/guest-img2.png";
import { Link, useNavigate } from "react-router";
import { useGetIDKYCListQuery, useUpdateKYCMutation } from "@/api/apiSlice";
import PaginationComponent from "../Pagination/TablePagination";
import Loader from "../loader/Loader";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import Profile from "../../assets/img/profile.png";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import { IoSearch } from "react-icons/io5";

export default function IDVarificationTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetIDKYCListQuery({
    page: page + 1,
    limit,
    search: delayedSearch,
  });
  const columns = [
    { Header: "Vendor Name" },
    { Header: "Phone Number" },
    { Header: "Email" },
    { Header: "Status" },
    { Header: "Request Date" },
    { Header: "Action" },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [updateKyc, { isLoading: isUpdating }] = useUpdateKYCMutation();

  const handleStatusChange = async (id, status) => {
    const loadingToast = toast.loading("Updating status...");

    try {
      if (!id || !status) {
        throw new Error("Invalid user ID or status");
      }

      const response = await updateKyc({
        id,
        data: { status },
      }).unwrap();

      toast.update(loadingToast, {
        render: response?.message || `User status updated `,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.update(loadingToast, {
        render:
          err?.data?.message ||
          "Failed to update user status. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  return (
    <div>
      <div className="flex flex-wrap justify-end gap-4">
        <label className="w-full md:max-w-[450px]" htmlFor="search">
          <div className="flex items-center bg-white dark:bg-gray-700 p-3 border rounded-[10px]">
            <IoSearch />
            <input
              className="w-full px-2 bg-white dark:bg-gray-700 focus:outline-none"
              type="search"
              name="search"
              id="search"
              placeholder="Search Keyword"
              value={searchValue}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>
        </label>
      </div>

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
            {data?.data?.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 bg-white dark:bg-gray-700 "
                >
                  No data found
                </td>
              </tr>
            )}
            {data?.data.map((row, index) => (
              <tr key={index}>
                <td className="p-4 bg-white dark:bg-gray-700 rounded-s-[10px]">
                  <div className="flex items-center">
                    <img
                      className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                      src={row.profilePicture || Profile}
                      alt=""
                    />

                    <button
                      onClick={() => {
                        navigate("/admin-dashboard/ID-Verification-Details", {
                          state: { data: row },
                        });
                      }}
                      className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                      {row?.user?.firstName} {row?.user?.lastName}
                    </button>
                  </div>
                </td>
                <td className="p-4 bg-white dark:bg-gray-700">
                  {row?.user?.contact}
                </td>
                <td className="p-4 bg-white dark:bg-gray-700">
                  {row?.user?.email}
                </td>
                <td className="p-4 bg-white dark:bg-gray-700">
                  <p
                    className={`max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis ${
                      row.status ? "text-[#34A853]" : "text-[#D92D20]"
                    }`}
                  >
                    {row.status}
                  </p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-700">
                  <p>{dayjs(data.uploadedAt).format("MM/DD/YYYY")}</p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-700 rounded-e-[10px]">
                  <div className="flex items-center gap-3">
                    <button
                      className="text-white bg-[#34A853] font-semibold p-3 min-w-[100px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                      onClick={() => {
                        handleStatusChange(row._id, "approved");
                      }}
                    >
                      Approve
                    </button>
                    <button
                      className="text-white bg-[#D92D20] font-semibold p-3 min-w-[100px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                      onClick={() => {
                        handleStatusChange(row._id, "abandoned");
                      }}
                    >
                      Reject
                    </button>
                    <button
                      className="text-white bg-[#9e9c1d] font-semibold p-3 min-w-[100px] rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
                      onClick={() => {
                        handleStatusChange(row._id, "pending");
                      }}
                    >
                      Re-Verify
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Loader loading={isLoading} />
      </div>
      <PaginationComponent
        currentPage={page}
        totalPages={data?.totalVendorKYCDocuments}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}

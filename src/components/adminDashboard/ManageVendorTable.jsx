import React from "react";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import { Link, useNavigate } from "react-router";
import guest from "../../assets/img/guest-img2.png";
import eyeIcon from "../../assets/img/eyeIcon.png";
import serviceImg from "../../assets/img/serviceImg.png";
import DeletePopup from "../DeletePopup";
import { useState } from "react";
import {
  useGetAccountUserQuery,
  useUpdateAccountUserMutation,
} from "@/api/apiSlice";
import PaginationComponent from "../Pagination/TablePagination";
import Loader from "../loader/Loader";
import { Popover } from "@mui/material";
import elipsis from "../../assets/img/elipsis.png";
import { toast } from "react-toastify";
import Profile from "../../assets/img/profile.png";
import { IoSearch } from "react-icons/io5";
import useDebouncedSearch from "../hooks/useDebouncedSearch";

const statusOptions = ["Active", "Inactive", "Suspend", "Delete"];

export default function ManageVendorTable() {
  const navigate = useNavigate();
  const [role, setRole] = useState("vendor");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUserId, setSelectedUserId] = React.useState(null);

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { data, isLoading } = useGetAccountUserQuery({
    page: page + 1,
    limit,
    role,
    search: delayedSearch,
  });

  const [updateAccountUser] = useUpdateAccountUserMutation();

  const columns = [
    { Header: "Vendor Name" },
    { Header: "Phone Number" },
    { Header: "Email" },
    // { Header: "Service Type" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = async (userId, status) => {
    const loadingToast = toast.loading("Updating status...");

    try {
      if (!userId || !status) {
        throw new Error("Invalid user ID or status");
      }

      const response = await updateAccountUser({
        id: userId,
        data: { status },
      }).unwrap();

      toast.update(loadingToast, {
        render: response?.message || `User status updated to ${status}`,
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
    } finally {
      handleClose();
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
        <button
          onClick={() => {
            navigate("/admin-dashboard/add-new-vendor");
          }}
          className="flex items-center gap-2 border border-black text-black dark:text-white dark:bg-black  px-6 py-4 rounded-[8px] shadow-[0px_10px_17px_0px_#FD636312] bg-white"
        >
          Add Vendor
        </button>
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
            {data?.data?.map((row, index) => (
              <tr key={index}>
                <td className="p-4 bg-white dark:bg-gray-700 rounded-s-[10px]">
                  <div className="flex items-center">
                    <img
                      className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                      src={row.profilePicture || Profile}
                      alt=""
                    />
                    <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {row?.firstName} {row?.lastName}
                    </p>
                  </div>
                </td>
                <td className="p-4 bg-white dark:bg-gray-700">
                  {row?.contact}
                </td>
                <td className="p-4 bg-white dark:bg-gray-700">{row?.email}</td>
                {/* <td className="p-4 bg-white">
                <div className="flex items-center">
                  <img
                    className="h-12 w-16 rounded-full object-cover me-2 max-w-16"
                    src={row.serviceImg}
                    alt=""
                  />
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row.serviceName}
                  </p>
                </div>
              </td> */}
                <td className="p-4 bg-white dark:bg-gray-700">
                  <p
                    className={`p-3 min-w-[100px] flex justify-center rounded-full text-sm ${
                      row?.status === "Active"
                        ? "bg-[#34A85333] text-[#34A853]"
                        : row?.status === "Suspend"
                        ? "text-[#C13515] bg-[#F3D7D0]"
                        : row?.status === "Inactive"
                        ? "text-[#666766] bg-[#91939233]"
                        : ""
                    }`}
                  >
                    {row?.status}
                  </p>
                </td>
                <td className="p-4 bg-white dark:bg-gray-700 rounded-e-[10px]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigate(`/admin-dashboard/Vendor-details/${row._id}`, {
                          state: { data: row },
                        });
                      }}
                    >
                      <img
                        className="w-[50px] aspect-square max-w-[50px]"
                        src={eyeIcon}
                        alt=""
                      />
                    </button>
                    <td className="p-4 bg-white dark:bg-gray-700 rounded-e-[10px]">
                      <div className="flex items-center justify-end gap-3">
                        <button onClick={(e) => handleClick(e, row._id)}>
                          <img
                            className="size-12 max-w-12"
                            src={elipsis}
                            alt="img"
                          />
                        </button>
                        <Popover
                          id={id}
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          sx={{
                            "& .MuiPopover-paper": {
                              boxShadow: "0px 0px 14px 0px #0000001A",
                              borderRadius: "10px",
                            },
                          }}
                        >
                          <ul className="min-w-[120px] bg-white dark:bg-gray-700 p-2">
                            {statusOptions.map((status) => (
                              <li key={status}>
                                <button
                                  onClick={() =>
                                    handleStatusChange(selectedUserId, status)
                                  }
                                  className="p-2 w-full hover:bg-[#F7F7F7] rounded-[10px] text-start text-sm font-medium"
                                >
                                  {status}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </Popover>
                      </div>
                    </td>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalUsers}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
        <Loader loading={isLoading} />
      </div>
    </div>
  );
}

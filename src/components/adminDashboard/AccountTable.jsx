import React from "react";
import guestimg from "../../assets/img/guest-img.png";
import elipsis from "../../assets/img/elipsis.png";
import { Popover } from "@mui/material";
import { useNavigate } from "react-router";
import { IoSearch } from "react-icons/io5";
import { useUpdateAccountUserMutation } from "@/api/apiSlice";
import { toast } from "react-toastify";
import { useState } from "react";

const statusOptions = ["Active", "Inactive", "Suspend", "Delete"];

export default function AccountTable({ data, selectedIds, setSelectedIds }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const [updateAccountUser] = useUpdateAccountUserMutation();

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const columns = [
    { Header: "Full Name" },
    { Header: "Primary Role" },
    { Header: "Phone Number" },
    { Header: "Email" },
    { Header: "Status" },
    { Header: "Actions" },
  ];

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
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
          <thead>
            <tr>
              <th className="bg-black text-white text-left px-4 py-5 text-lg rounded-s-[10px] font-medium">
                <input
                  className="size-6 min-w-6 accent-black"
                  type="checkbox"
                  checked={
                    data?.length > 0 && selectedIds.length === data.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(data.map((row) => row._id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
              </th>
              {columns.map((col, index) => (
                <th
                  className="bg-black text-white text-left px-4 py-5 text-lg last:rounded-e-[10px] last:text-end font-medium"
                  key={index}
                >
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-medium">
            {data?.length > 0 ? (
              data?.map((row, index) => (
                <tr key={index}>
                  <td className="p-4 rounded-s-[10px] bg-white dark:bg-gray-800">
                    <input
                      className="size-6 min-w-6 accent-black"
                      type="checkbox"
                      checked={selectedIds.includes(row._id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedIds((prev) => [...prev, row._id]);
                        } else {
                          setSelectedIds((prev) =>
                            prev.filter((id) => id !== row._id)
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="p-4 bg-white dark:bg-gray-800">
                    <div className="flex items-center">
                      {/* <img
                      className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                      src={row.guestimg}
                      alt=""
                    /> */}
                      <p
                        onClick={() =>
                          navigate("/admin-dashboard/vendor-account-profile", {
                            state: { data: row },
                          })
                        }
                        className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis cursor-pointer"
                      >
                        {row.firstName} {row.lastName}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 bg-white dark:bg-gray-800">{row.role}</td>
                  <td className="p-4 bg-white dark:bg-gray-800">
                    {row.contact}
                  </td>
                  <td className="p-4 bg-white dark:bg-gray-800">{row.email}</td>
                  <td className="p-4 bg-white dark:bg-gray-800">
                    <p
                      className={`p-3 min-w-[100px] flex justify-center rounded-full text-sm ${
                        row.status === "Active"
                          ? "bg-[#34A85333] text-[#34A853]"
                          : row.status === "Suspend"
                          ? "text-[#C13515] bg-[#F3D7D0]"
                          : row.status === "Inactive"
                          ? "text-[#666766] bg-[#91939233]"
                          : ""
                      }`}
                    >
                      {row.status}
                    </p>
                  </td>
                  <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
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
                        <ul className="min-w-[120px] bg-white dark:bg-gray-800  p-2">
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
                </tr>
              ))
            ) : (
              <p className="text-center text-lg font-medium text-black py-4">
                No data available{" "}
              </p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

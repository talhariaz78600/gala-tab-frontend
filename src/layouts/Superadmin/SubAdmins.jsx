import PaginationComponent from "@/components/Pagination/TablePagination";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import TableMui from "@/mui/TableMui";
import {
  useGetAccountUserQuery,
  useLazySubAdminExportQuery,
  useSubAdminUpdateMutation,
  useUpdateAccountUserMutation,
} from "@/api/apiSlice";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import { AiOutlineKey } from "react-icons/ai";
import { IoKeySharp, IoSearch } from "react-icons/io5";
import { useSelector } from "react-redux";

import Profile from "../../assets/img/profile.png";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { toast } from "react-toastify";
import { Popover } from "@mui/material";

import elipsis from "../../assets/img/elipsis.png";
import ExportSelect from "@/components/VendorDashboard/ExportSelect";

const statusOptions = ["Active", "Inactive", "Suspend", "Delete"];
export default function SubAdmins() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const user = useSelector((state) => state.auth.user);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetAccountUserQuery({
    page: page + 1,
    limit,
    role: "admin",
    search: delayedSearch,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [selectedUserId, setSelectedUserId] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [subAdminUpdate, { isLoading: subAdminUpdating }] =
    useSubAdminUpdateMutation();

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [updateAccountUser] = useUpdateAccountUserMutation();

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleStatusToggle = async (value) => {
    const newStatus = value.status === "Active" ? "Inactive" : "Active";

    try {
      const response = await subAdminUpdate({
        id: value._id,
        data: { status: newStatus },
      });

      if (response?.data?.status === "success") {
        toast.success(`Status updated to ${newStatus}!`);
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Something went wrong.");
    }
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

  const handleClick = (event, userId) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [
    triggerfile,
    { data: pdfData, error: pdfError, isLoading: isPdfLoading },
  ] = useLazySubAdminExportQuery();

  const handleExportChange = async (type) => {
    console.log("Selected export type:", type);

    try {
      const response = await triggerfile({ type });

      if (response?.data?.status === "success" && response.data.dataUrl) {
        const dataUrl = response.data.dataUrl;

        const link = document.createElement("a");
        link.href = dataUrl;

        const fileName = type === "pdf" ? "export.pdf" : "export.xlsx";
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("File downloaded:", fileName);
      } else {
        console.error("Export failed or no data URL received.");
      }
    } catch (error) {
      console.error("Error while exporting file:", error);
    }
  };

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100vh-130px)] rounded-[20px]">
      <div className="flex items-center justify-between flex-wrap  p-5 border-b">
        <p className="text-[28px] leading-normal font-semibold ">
          Sub Admins List
        </p>

        <div className="flex items-center gap-4">
          <label className="w-full md:min-w-[450px]" htmlFor="search">
            <div className="flex items-center bg-white  dark:bg-gray-700 p-3 border rounded-[10px]">
              <IoSearch />
              <input
                className="w-full px-2 bg-white dark:bg-gray-700"
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
              navigate("/admin-dashboard/Add-New-Sub-Admin");
            }}
            className="font-medium w-full border bg-white dark:bg-gray-700 border-black p-3 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
          >
            Add New Sub Admin
          </button>
          <ExportSelect onChange={handleExportChange} />
        </div>
      </div>
      <div className="p-5">
        <TableMui
          loading={isLoading}
          th={{
            fullName: "Full Name",
            templateId: "Primary Role",
            contact: "Phone Number",
            email: "Email",
            status: "Status",
            action: "Action",
          }}
          td={data?.data || []}
          customFields={[
            {
              name: "fullName",
              data: (value, data) => {
                console.log("value", value);

                return (
                  <div className="flex items-center gap-2">
                    <img
                      className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                      src={data?.profilePicture || Profile}
                      alt=""
                      onError={(e) => {
                        e.target.src = Profile;
                      }}
                    />
                    <p className="text-[16px]">{value || "N/A"}</p>
                  </div>
                );
              },
            },
            {
              name: "templateId",
              data: (value, data) => {
                console.log("value", value);

                return (
                  <>
                    <p className="text-[16px]">
                      {value?.templateName || "N/A"}
                    </p>
                  </>
                );
              },
            },
            {
              name: "status",
              data: (data, value) => {
                return (
                  <div className="relative group">
                    <button
                      onClick={() => handleStatusToggle(value)}
                      disabled={subAdminUpdating}
                      className={`${
                        value.status === "Active"
                          ? "text-[#34A853]"
                          : "text-[#EA3548]"
                      }`}
                    >
                      {value.status}
                    </button>
                    <div
                      className={`absolute clip-message right-full bottom-full transform p-2 ${
                        value.status === "Active"
                          ? "bg-[#BE3516]"
                          : "bg-[#34A853]"
                      } text-white text-[14px] rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-[0px_10px_24px_0px_#00000033]`}
                    >
                      {`Click to ${
                        value.status === "Active" ? "Inactive" : "Active"
                      }`}
                    </div>
                  </div>
                );
              },
            },

            {
              name: "action",
              data: (value, task) => (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      navigate(`/admin-dashboard/edit-Sub-Admin/${task._id}`, {
                        state: { data: task },
                      })
                    }
                  >
                    <img
                      className="w-[50px] aspect-square max-w-[50px]"
                      src={editIcon}
                      alt="Edit"
                    />
                  </button>

                  {user.adminRole === "admin" && (
                    <button
                      onClick={() =>
                        navigate(
                          `/admin-dashboard/sub-admin/change-password/${task._id}`,
                          {
                            state: { data: task },
                          }
                        )
                      }
                      className="w-[50px] h-[50px] flex items-center justify-center rounded-[8px] bg-[#e5e5e5] text-[#1E1E1E] text-2xl shadow-sm hover:bg-[#e0e0e0] transition"
                      title="Change Password"
                    >
                      <IoKeySharp />
                    </button>
                  )}
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={(e) => handleClick(e, task._id)}>
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
                      <ul className="min-w-[120px] bg-white dark:bg-[#1E1E1E] p-2">
                        {statusOptions.map((status) => (
                          <li key={status} className=" ">
                            <button
                              onClick={() =>
                                handleStatusChange(selectedUserId, status)
                              }
                              className="p-2 w-full hover:bg-[#F7F7F7] dark:hover:bg-[#1E1E1E] rounded-[10px] text-start text-sm font-medium"
                            >
                              {status}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Popover>
                  </div>
                </div>
              ),
            },
          ]}
        />
        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalUsers}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}

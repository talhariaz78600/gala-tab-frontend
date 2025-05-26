import React, { useState } from "react";
import guest from "../../assets/img/guest-img2.png";
import eyeIcon from "../../assets/img/eyeIcon.png";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import { Link, useNavigate } from "react-router";
import { Business } from "@mui/icons-material";
import DeletePopup from "../DeletePopup";
import TableMui from "@/mui/TableMui";
import {
  useGetTaxForumListQuery,
  useTextForumVerifyMutation,
} from "@/api/apiSlice";
import PaginationComponent from "../Pagination/TablePagination";
import Loader from "../loader/Loader";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuItem, IconButton } from "@mui/material";
import { toast } from "react-toastify";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import { IoSearch } from "react-icons/io5";

export default function TaxForumTable() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetTaxForumListQuery({
    page: page + 1,
    limit,
    search: delayedSearch,
  });

  const [textForumVerify, { isLoading: isUpdating }] =
    useTextForumVerifyMutation();

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
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
      <div className="p-5">
        <TableMui
          loading={isLoading}
          th={{
            vendorId: "Vendor Country Name",
            businessName: "Business Name",
            taxClassification: "Tax Classification",
            taxId: "Tax ID",
            deliveryForm: "Delivery Form ",
            status: "Status",
            taxDocument: "Tax Document",
            action: "Action",
          }}
          td={data?.data || []}
          customFields={[
            {
              name: "vendorId",
              data: (data, value) => {
                return (
                  <div>
                    <p>{data?.country?.country}</p>
                  </div>
                );
              },
            },
            {
              name: "deliveryForm",
              data: (data, value) => {
                return (
                  <div>
                    <p>
                      {data === "email"
                        ? "Delivered by Email"
                        : "Electronically Only"}
                    </p>
                  </div>
                );
              },
            },
            {
              name: "taxDocument",
              data: (data, value) => {
                return (
                  <div>
                    <p>{value?.taxDocument ? "Attached" : "Not Attached"}</p>
                  </div>
                );
              },
            },
            {
              name: "status",
              data: (data) => {
                const status = data?.toLowerCase() ?? "pending";

                const getStatusLabel = (status) => {
                  switch (status) {
                    case "approved":
                      return "Approved";
                    case "rejected":
                      return "Rejected";
                    case "pending":
                      return "Pending";
                    case "inprogress":
                      return "In Progress";
                    default:
                      return "Unknown";
                  }
                };

                const getStatusColor = (status) => {
                  switch (status) {
                    case "approved":
                      return "text-green-600";
                    case "rejected":
                      return "text-red-600";
                    case "pending":
                    case "inprogress":
                      return "text-yellow-600";
                    default:
                      return "text-gray-500";
                  }
                };

                return (
                  <div>
                    <p className={`${getStatusColor(status)} capitalize`}>
                      {getStatusLabel(status)}
                    </p>
                  </div>
                );
              },
            },

            {
              name: "action",
              data: (value, task) => {
                const [anchorEl, setAnchorEl] = React.useState(null);
                const open = Boolean(anchorEl);

                const handleMenuClick = (event) => {
                  setAnchorEl(event.currentTarget);
                };

                const handleClose = () => {
                  setAnchorEl(null);
                };

                const handleStatusChange = async (status) => {
                  try {
                    console.log("ID:", task._id, "Status Selected:", status);

                    const response = await textForumVerify({
                      id: task._id,
                      data: { status },
                    });

                    if (response?.data?.status === "success") {
                      toast.success(`Status updated to ${status}!`);
                    } else {
                      toast.error(
                        response?.data?.message ||
                          "Failed to update status. Please try again."
                      );
                    }
                  } catch (error) {
                    console.error("Status update error:", error);
                    toast.error(
                      "Something went wrong. Please try again later."
                    );
                  } finally {
                    handleClose();
                  }
                };

                return (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        navigate(`/admin-dashboard/Tax-Profile`, {
                          state: { data: task },
                        })
                      }
                    >
                      <img
                        className="w-[50px] aspect-square max-w-[50px]"
                        src={eyeIcon}
                        alt="eye"
                      />
                    </button>

                    {/* Three dots menu */}
                    <div>
                      <button
                        onClick={handleMenuClick}
                        className="w-[50px] h-[50px] flex items-center justify-center rounded-[8px] bg-[#e5e5e5] text-[#1E1E1E] text-2xl shadow-sm hover:bg-[#e0e0e0] transition"
                        title="Edit"
                      >
                        <BsThreeDotsVertical />
                      </button>

                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                      >
                        {["pending", "approved", "rejected", "inprogress"].map(
                          (status) => (
                            <MenuItem
                              key={status}
                              onClick={() => handleStatusChange(status)}
                            >
                              {status === "pending"
                                ? "Resubmit"
                                : status === "inprogress"
                                ? "In Progress"
                                : status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                            </MenuItem>
                          )
                        )}
                      </Menu>
                    </div>
                  </div>
                );
              },
            },
          ]}
        />
        <Loader loading={isUpdating} />
        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalTaxForums || 0}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}

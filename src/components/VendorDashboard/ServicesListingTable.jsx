import React, { useState } from "react";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import calendarIcon from "../../assets/img/calendar-icon.png";
import { Link, useNavigate } from "react-router";
import {
  useDeleteServiceMutation,
  useGetServiceListingQuery,
} from "@/api/apiSlice";
import Loader from "../loader/Loader";
import PaginationComponent from "../Pagination/TablePagination";
import { format } from "date-fns";
import useFilters from "../hooks/useFilter";
import DeletePopup from "../DeletePopup";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
export default function ServicesListingTable({
  startDate,
  endDate,
  modalFilters,
}) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const formatDate = (date) => {
    if (!date) return;
    return format(new Date(date), "yyyy-MM-dd");
  };

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetServiceListingQuery({
    page: page + 1,
    limit,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
    serviceTypeIds: modalFilters["Vendor Type"],
    status: modalFilters["Status"],
    dateFilter: modalFilters["Date"],
    search: delayedSearch,
  });

  const [deleteService, { isLoading: isDeleteLoading }] =
    useDeleteServiceMutation();

  const handleDelete = async () => {
    try {
      await deleteService(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { Header: "Service Name" },
    { Header: "Service Type" },
    { Header: "Total Cost" },
    { Header: "Total Booking" },
    { Header: "Service Status" },
    { Header: "Status" },
    { Header: "Actions" },
  ];

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
            {isLoading && <Loader loading={isLoading} />}

            {!isLoading && data?.data?.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 bg-white dark:bg-gray-700 "
                >
                  No data available
                </td>
              </tr>
            )}
            {data?.data?.map((row) => (
              <tr key={row._id}>
                <td className="p-4 bg-white dark:bg-gray-700 rounded-s-[10px]">
                  <div className="flex items-center gap-2">
                    {(() => {
                      const coverMedia = row?.media?.find((m) => m.cover);
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
                    <p className="ms-4">{row.title}</p>
                  </div>
                </td>
                <td className="p-4 bg-white  dark:bg-gray-700 ">
                  {row?.serviceTypeId?.name}
                </td>
                <td className="p-4 bg-white  dark:bg-gray-700 ">
                  $ {Number(row?.totalPrice).toLocaleString("en-US")}
                </td>
                <td className="p-4 bg-white  dark:bg-gray-700 ">
                  {row?.totalBookings || "0"}
                </td>
                <td className="p-4 bg-white  dark:bg-gray-700 ">
                  {row.completed ? "Completed" : "In-Complete"}
                </td>
                <td className="p-4 bg-white  dark:bg-gray-700 ">
                  <p className="text-[#34A853]">{row.status}</p>
                </td>
                <td className="p-4 bg-white  dark:bg-gray-700  rounded-e-[10px]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (user?.role === "vendor") {
                          navigate(`/vendor-dashboard/services/${row._id}`);
                        } else {
                          navigate(`/admin-dashboard/services/${row._id}`);
                        }
                      }}
                    >
                      <img
                        className="w-50px aspect-square max-w-[50px]"
                        src={editIcon}
                        alt=""
                      />
                    </button>
                    <button onClick={() => setDeleteOpen(row._id)}>
                      <img
                        className="w-50px aspect-square max-w-[50px]"
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

        <DeletePopup
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
        />
        <Loader loading={isLoading || isDeleteLoading} />
      </div>
      <PaginationComponent
        currentPage={page}
        totalPages={data?.totalCount}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}

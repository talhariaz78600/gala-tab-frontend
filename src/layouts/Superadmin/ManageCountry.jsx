import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  useCountryDeleteMutation,
  useCountryUpdateMutation,
  useGetCountryListQuery,
} from "@/api/apiSlice";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import TableMui from "@/mui/TableMui";
import PaginationComponent from "@/components/Pagination/TablePagination";
import Loader from "@/components/loader/Loader";
import DeletePopup from "@/components/DeletePopup";
import { toast } from "react-toastify";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { IoSearch } from "react-icons/io5";

export default function ManageCountry() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();

  const { data, isLoading } = useGetCountryListQuery({
    page: page + 1,
    limit,
    search: delayedSearch,
  });

  const [deleteCountry, { isLoading: deleteLoading }] =
    useCountryDeleteMutation();

  const [countryUpdate, { isLoading: isUpdating }] = useCountryUpdateMutation();

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleDelete = async () => {
    try {
      await deleteCountry(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  const handleStatusToggle = async (value) => {
    const newStatus = value.status === "Active" ? "Inactive" : "Active";

    try {
      const response = await countryUpdate({
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

  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100vh-130px)] rounded-[20px]">
      <div className="flex items-center flex-wrap gap-4 justify-between p-5 border-b">
        <p className="text-[28px] leading-normal font-semibold">
          Manage Country
        </p>
        <div className="ms-auto">
          <Link
            to="/admin-dashboard/add-Country"
            className="font-medium inline-block border border-black p-3 bg-white dark:bg-gray-800 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
          >
            Add Country
          </Link>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap justify-end gap-4">
          <label className="w-full md:max-w-[450px]" htmlFor="search">
            <div className="flex items-center bg-white dark:bg-gray-800 p-3 border rounded-[10px]">
              <IoSearch />
              <input
                className="w-full px-2 dark:bg-gray-800"
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
        <TableMui
          loading={isLoading}
          th={{
            country: "Country Name",
            region: "Region",
            currency: "Currency",
            status: "Status",
            action: "Action",
          }}
          td={data?.data || []}
          customFields={[
            {
              name: "status",
              data: (data, value) => {
                return (
                  <div className="relative group">
                    <button
                      onClick={() => handleStatusToggle(value)}
                      disabled={isUpdating}
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
                      navigate(`/admin-dashboard/edit-Country/${task._id}`, {
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
                  <button onClick={() => setDeleteOpen(task._id)}>
                    <img
                      className="w-[50px] aspect-square max-w-[50px]"
                      src={deleteIcon}
                      alt="Delete"
                    />
                  </button>
                </div>
              ),
            },
          ]}
        />
        <Loader loading={deleteLoading} />
        <PaginationComponent
          currentPage={page}
          totalPages={data?.totalCountries || 0}
          itemsPerPage={limit}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />

        <DeletePopup
          open={deleteOpen}
          onClose={() => setDeleteOpen(false)}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
}

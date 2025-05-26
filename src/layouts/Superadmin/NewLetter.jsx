import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import React from "react";

import deleteIcon from "../../assets/img/delete-icon.png";
import { IoSearch } from "react-icons/io5";
import {
  useDeleteNewsLetterMutation,
  useGetNewsLetterListQuery,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import PaginationComponent from "@/components/Pagination/TablePagination";
import { useState } from "react";
import { toast } from "react-toastify";
import DeletePopup from "@/components/DeletePopup";
import MessageModal from "@/components/adminDashboard/MessageModal";
import { Modal } from "@mui/material";
const NewLetter = () => {
  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();
  const [selectedIds, setSelectedIds] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteNewsLetter] = useDeleteNewsLetterMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { data, isLoading } = useGetNewsLetterListQuery({
    page: page + 1,
    limit,
    search: delayedSearch,
  });

  const columns = [{ Header: "Email" }, { Header: "Actions" }];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    try {
      await deleteNewsLetter(deleteOpen);
      toast.success("Deleted successfully!");
      setDeleteOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete. Please try again.");
    }
  };

  return (
    <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] dark:bg-[#1E1E1E] rounded-[20px]">
      <div className="flex items-center justify-between flex-wrap  p-5 border-b">
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          News Letter
        </h1>
        <div className="flex items-center gap-4">
          <label className="w-full md:min-w-[450px]" htmlFor="search">
            <div className="flex items-center bg-white dark:bg-gray-800 p-3 border rounded-[10px]">
              <IoSearch />
              <input
                className="w-full px-2 dark:bg-gray-800"
                type="search"
                name="search"
                id="search"
                placeholder="Search Email"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </label>

          <button
            onClick={handleOpen}
            className="p-3 border w-full border-black bg-black text-white font-medium rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
          >
            Send Mail With Text
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
          <thead>
            <tr>
              <th className="bg-black text-white text-left px-4 py-5 text-lg rounded-s-[10px] font-medium">
                <input
                  className="size-6 min-w-6 accent-black"
                  type="checkbox"
                  checked={
                    data?.data?.length > 0 &&
                    selectedIds.length === data?.data?.length
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedIds(data?.data?.map((row) => row._id));
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
            {data?.data?.length > 0 ? (
              data?.data?.map((row, index) => (
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

                  <td className="p-4 bg-white dark:bg-gray-800">{row.email}</td>

                  <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => setDeleteOpen(row._id)}>
                        <img
                          className="size-12 max-w-12"
                          src={deleteIcon}
                          alt="img"
                        />
                      </button>
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

      <DeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />

      <PaginationComponent
        currentPage={page}
        totalPages={data?.totalNewsletters}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <Loader loading={isLoading} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] bg-white rounded-[20px]">
          <MessageModal
            handleClose={handleClose}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            mode="newsletter"
          />
        </div>
      </Modal>
    </div>
  );
};

export default NewLetter;

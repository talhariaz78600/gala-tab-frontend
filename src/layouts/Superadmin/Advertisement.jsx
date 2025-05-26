import React, { useState } from "react";
import decoration from "../../assets/img/decoration.png";
import EditIcon from "../../assets/img/edit-icon.png";
import { Link } from "react-router";
import DeletePopup from "../../components/DeletePopup";
import AdvertisementModal from "./AdvertisementModal";
import deleteIcon from "../../assets/img/delete-icon.png";
import {
  useAdvertisementDeleteMutation,
  useGetAdvertisementListQuery,
} from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import { toast } from "react-toastify";
import PaginationComponent from "@/components/Pagination/TablePagination";

const Advertisement = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const { data, isLoading } = useGetAdvertisementListQuery({
    page: page + 1,
    limit,
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const columns = [
    { Header: "Image" },
    { Header: "Link" },
    { Header: "Actions" },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const [deleteAdvertisement, { isLoading: isDeleteLoading }] =
    useAdvertisementDeleteMutation();

  const handleDelete = async () => {
    try {
      await deleteAdvertisement(deleteOpen);
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

  return (
    <div>
      <div className="text-end mb-5">
        <button
          type="button"
          onClick={() => {
            setSelectedRow(null);
            handleOpen();
          }}
          className="bg-white py-3 px-5 rounded-lg border border-black text-black font-medium text-sm"
        >
          Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-nowrap">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.Header}
                  className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                >
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-medium">
            {data?.data?.length === 0 && (
              <tr>
                <td colSpan={3} className="py-5 text-center">
                  No data found
                </td>
              </tr>
            )}
            {data?.data?.map((row) => (
              <tr key={row.id}>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                  <img
                    className="w-[180px] aspect-[2/1] rounded-[10px] object-cover"
                    src={row.image}
                    alt=""
                  />
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  <a
                    href={row.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {row.link}
                  </a>
                </td>

                <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedRow(row);
                        handleOpen();
                      }}
                    >
                      <img className="size-12" src={EditIcon} alt="Edit" />
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
      </div>
      <PaginationComponent
        currentPage={page}
        totalPages={data?.totalCount}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      <DeletePopup
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
      />
      <Loader loading={isLoading} />
      <AdvertisementModal
        open={open}
        handleClose={handleClose}
        data={selectedRow}
      />
    </div>
  );
};

export default Advertisement;

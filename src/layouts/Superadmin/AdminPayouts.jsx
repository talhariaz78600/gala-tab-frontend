import { useGetAdminPayoutsListQuery } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import PaginationComponent from "@/components/Pagination/TablePagination";
import TableMui from "@/mui/TableMui";
import React, { useState } from "react";
import PayButtonWithModal from "./PayButtonWithModal";
import { FiCheckCircle, FiCreditCard } from "react-icons/fi";
import useDebouncedSearch from "@/components/hooks/useDebouncedSearch";
import { IoSearch } from "react-icons/io5";

const AdminPayouts = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { searchValue, delayedSearch, handleSearchChange } =
    useDebouncedSearch();
  const { data, isLoading } = useGetAdminPayoutsListQuery({
    page: page + 1,
    limit,
    search: delayedSearch,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = [
    { Header: "Vendor Name" },
    { Header: "Service Name" },
    { Header: "Total Price" },
    { Header: "Amount Pay to Vendor" },
    { Header: "Status" },
    { Header: "Payment" },
  ];
  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100dvh-130px)] rounded-[20px] p-5">
      <div className="flex items-center justify-between">
        <p className="text-[28px] font-semibold">Payouts List</p>
        <div className="flex flex-row items-center gap-4">
          <label className="w-full md:min-w-[450px]" htmlFor="search">
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
            {!isLoading && data?.data?.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 bg-white dark:bg-gray-800"
                >
                  No data available
                </td>
              </tr>
            )}
            {data?.data?.map((row) => (
              <tr key={row._id}>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={row?.vendor.profilePicture || "/default-image.jpg"}
                      alt="decoration"
                    />{" "}
                    <p className="ms-4">
                      {row.vendor.firstName} {row.vendor.lastName}
                    </p>
                  </div>
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  {" "}
                  {row?.service.title}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  $ {row?.booking?.totalPrice}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  $ {row?.amount}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800">
                  <p className="text-[#34A853]">{row.status}</p>
                </td>

                <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                  <div className="flex items-center gap-2">
                    <button
                      disabled
                      className={`flex items-center gap-2 font-semibold text-sm px-4 py-2 rounded-xl transition-all duration-300 shadow-md
        ${
          row.status === "completed"
            ? "bg-green-100 text-gray-500 cursor-not-allowed border border-green-500"
            : "bg-black text-white hover:bg-gray-900 hover:shadow-lg"
        }`}
                    >
                      {row.status === "completed" ? (
                        <>
                          <FiCheckCircle className="text-green-500" />
                          Paid
                        </>
                      ) : (
                        <>
                          <FiCreditCard />
                          Not Paid
                        </>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PayButtonWithModal
        open={open}
        handleClose={handleClose}
        selectedId={selectedId}
      />
      <PaginationComponent
        currentPage={page}
        totalPages={data?.totalPayments}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
      <Loader loading={isLoading} />
    </div>
  );
};

export default AdminPayouts;

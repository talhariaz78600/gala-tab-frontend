import { useGetUserLogsListQuery } from "@/api/apiSlice";
import Loader from "@/components/loader/Loader";
import PaginationComponent from "@/components/Pagination/TablePagination";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useLocation } from "react-router";

const LogDetail = () => {
  const location = useLocation();
  const { id } = location.state || {};
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const { data, refetch, isLoading } = useGetUserLogsListQuery(
    { id, params: { page: page + 1, limit } },

    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { Header: "Name" },
    { Header: "Action Performed" },
    { Header: "Time" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold"> Logs Details</h3>
        <button
          className="bg-black text-white py-3 px-5 flex items-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A] ms-auto"
          onClick={() => refetch()}
        >
          Refresh Logs
        </button>
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
            {data?.logs?.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 bg-white rounded-[10px] dark:bg-gray-800"
                >
                  No data available
                </td>
              </tr>
            )}

            {data?.logs?.map((row) => (
              <tr key={row.id}>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                  {row.action}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800 ">
                  {row.description}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-r-[10px]">
                  {dayjs(row.createdAt).format("MMMM D, YYYY h:mm A")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationComponent
        currentPage={page}
        totalPages={data?.totalLogs}
        itemsPerPage={limit}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />

      <Loader loading={isLoading} />
    </div>
  );
};

export default LogDetail;

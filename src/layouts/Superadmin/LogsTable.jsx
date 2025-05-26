import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link, useNavigate } from "react-router";

const LogsTable = ({ data }) => {
  const navigate = useNavigate();
  const columns = [{ Header: "Name" }, { Header: "Actions" }];

  const listingData = [
    {
      name: "admin1",
    },
  ];
  return (
    <div>
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
            {data?.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center p-4 bg-white rounded-[10px] dark:bg-gray-800"
                >
                  No data available
                </td>
              </tr>
            )}
            {data?.map((row) => (
              <tr key={row.id}>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                  {row.fullName}
                </td>
                <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        navigate("/admin-dashboard/logs-detail", {
                          state: { id: row._id },
                        })
                      }
                    >
                      <MdOutlineRemoveRedEye className="bg-[#f5f5f5] dark:bg-gray-800 p-2 text-4xl rounded-lg" />{" "}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsTable;

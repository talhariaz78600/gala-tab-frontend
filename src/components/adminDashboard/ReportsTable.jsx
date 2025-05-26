import * as React from "react";
import guest from "../../assets/img/guest-img2.png";
import { Link } from "react-router";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";

export default function ReportsTable({ data }) {
  const columns = [
    { Header: "Years Of Month" },
    { Header: "Days Available" },
    { Header: "Days Booked" },
    { Header: "Revenue" },
    { Header: "Days Booked Completed" },
    { Header: "Average Rate Booked Day" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                className="bg-white dark:bg-black text-left px-4 py-5 text-lg font-medium border-t border-b first:border-s last:border-e first:rounded-s-[10px] last:rounded-e-[10px]"
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
              <td colSpan={columns.length} className="py-5 text-center">
                No data found
              </td>
            </tr>
          )}

          {data?.map((row) => (
            <tr key={row.id}>
              <td className="p-6 bg-white dark:bg-gray-800 rounded-s-[10px]">
                <p className="text-[#3551B6]">{row.yearsOfMonth}</p>
              </td>
              <td className="p-6 bg-white dark:bg-gray-800 ">
                <p className="text-[#3551B6]">{row.daysAvailable}</p>
              </td>
              <td className="p-6 bg-white dark:bg-gray-800 ">
                <p>{row.daysBooked}</p>
              </td>

              <td className="p-6 bg-white dark:bg-gray-800 ">
                <p className="text-[#3551B6]">{row.revenue}</p>
              </td>
              <td className="p-6 bg-white dark:bg-gray-800 ">
                <p className="text-[#0A8A01]">{row.daysBookedCompleted}</p>
              </td>
              <td className="p-6 bg-white dark:bg-gray-800  rounded-e-[10px]">
                <p className="text-[#0A8A01]">{row.averageRateBookedDay} %</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

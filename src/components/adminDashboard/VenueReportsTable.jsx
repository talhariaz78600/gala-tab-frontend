import React from "react";

export default function VenueReportsTable({ data, mode = "vendor" }) {
  const columns = [
    ...(mode === "admin"
      ? [{ Header: "Vendor Name", accessor: "vendorName" }]
      : []),
    { Header: "Service Name", accessor: "serviceName" },
    { Header: "Pending Bookings", accessor: "pendingBookings" },
    { Header: "Confirm Bookings", accessor: "bookedBookings" },
    { Header: "Cancelled Bookings", accessor: "cancelledBookings" },
    { Header: "Rejected Bookings", accessor: "rejectedBookings" },
    { Header: "Complete Bookings", accessor: "completedBookings" },
  ];

  return (
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
              <td colSpan="6" className="text-center">
                No Data Found
              </td>
            </tr>
          )}
          {data?.map((row) => (
            <tr key={row?._id}>
              {mode === "admin" && (
                <td className="p-4 bg-white dark:bg-gray-800">
                  <div className="flex items-center">
                    <img
                      className="w-16 h-12 rounded-full object-cover me-2 max-w-16"
                      src={row?.vendor?.profilePicture || "/default-image.jpg"}
                      alt=""
                    />
                    <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                      {row?.vendor?.firstName} {row?.vendor?.lastName}
                    </p>
                  </div>
                </td>
              )}
              <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                <div className="flex items-center">
                  {(() => {
                    const coverMedia = row?.media?.find((m) => m.cover);
                    if (!coverMedia) return null;

                    return coverMedia.type === "video" ? (
                      <video
                        src={coverMedia.url || "/video-default.png"}
                        className="h-12 w-64 rounded-full object-cover me-2 max-w-[70px]"
                      />
                    ) : (
                      <img
                        src={coverMedia.url || "/video-default.png"}
                        alt="Cover"
                        className="h-12 w-64 rounded-full object-cover me-2 max-w-[70px]"
                      />
                    );
                  })()}
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row?.title}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                {row?.pendingBookings || 0}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                {row?.bookedBookings || 0}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                {row?.cancelledBookings || 0}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                {row?.rejectedBookings || 0}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                {row?.completedBookings || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

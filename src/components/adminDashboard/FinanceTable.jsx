import React from "react";
import guest from "../../assets/img/guest-img2.png";
import { Link } from "react-router";
import deleteIcon from "../../assets/img/delete-icon.png";
import stripe from "../../assets/img/stripe.png";
import paypal from "../../assets/img/paypal-logo.png";
import paytm from "../../assets/img/paytm.png";
import worldpay from "../../assets/img/worldpay.png";
import serviceImg from "../../assets/img/serviceImg.png";
import downloadIcon from "../../assets/img/downloadIcon.png";
import DeletePopup from "../DeletePopup";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function FinanceTable({ data }) {
  const columns = [
    { Header: "Bank" },
    { Header: "Service Type" },
    { Header: "Guest Name" },
    { Header: "Email" },
    { Header: "Date" },
    { Header: "Total Amount" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const generatePDF = (row) => {
    const doc = new jsPDF();

    // Gala Tab Branding Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("Gala Tab", 14, 15);

    // Section Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text("Transaction Details", 14, 25);

    // Draw a line for visual separation
    doc.setDrawColor(200, 200, 200);
    doc.line(14, 28, 196, 28);

    // Transaction Table
    autoTable(doc, {
      startY: 35,
      head: [["Field", "Value"]],
      body: [
        ["Bank", row.bank || "-"],
        ["Service", row?.bookingId?.service?.title || "-"],
        ["Guest Name", row.customerId?.fullName || "-"],
        ["Date", dayjs(row.createdAt).format("MMMM D, YYYY h:mm A")],
        ["Total Amount", `$${row.totalAmount.toFixed(2)}`],
        ["Status", row.status],
      ],
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: 255,
        fontSize: 12,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      styles: {
        fontSize: 11,
        cellPadding: 6,
        overflow: "linebreak",
      },
      margin: { top: 10 },
    });

    doc.save(`transaction-${row?.customerId?.fullName || "data"}.pdf`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] font-medium"
                key={index}
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
                className="p-4 bg-white text-center dark:bg-gray-800"
              >
                No data found
              </td>
            </tr>
          )}
          {data?.map((row, index) => (
            <tr key={index}>
              <td className="p-4 bg-white dark:bg-gray-800">
                <p className="max-w-[150px] truncate">
                  {row?.bank
                    ? row?.bank.charAt(0).toUpperCase() + row?.bank.slice(1)
                    : "-"}
                </p>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                  {(() => {
                    const coverMedia = row?.bookingId?.service.media?.find(
                      (m) => m.cover
                    );
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
                  <p className="max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row?.bookingId?.service?.title}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                  <img
                    className="size-12 rounded-full object-cover me-2 max-w-[50px]"
                    src={row?.customerId?.profilePicture || guest}
                    alt=""
                  />
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row?.customerId?.fullName}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 ">
                {row.customerId?.email}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 ">
                {dayjs(row.createdAt).format("MMMM D, YYYY h:mm A")}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 ">
                ${row?.totalAmount}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <p
                  className={`py-2 text-[14px] min-w-[100px] text-center px-5 rounded-full ${
                    row.status === "Paid"
                      ? "text-[#34A853] bg-[#34A85333]"
                      : "text-[#EA3548] bg-[#F3D7D0]"
                  }`}
                >
                  {row?.status}
                </p>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                <div className="flex items-center gap-2">
                  <button onClick={() => generatePDF(row)}>
                    <img
                      className="w-[50px] aspect-square max-w-[50px]"
                      src={downloadIcon}
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
  );
}

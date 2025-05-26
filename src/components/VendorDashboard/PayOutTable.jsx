import React from "react";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import calendarIcon from "../../assets/img/calendar-icon.png";
import { Link } from "react-router";
import stripe from "../../assets/img/stripe.png";
import paypallogo from "../../assets/img/paypal-logo.png";
import paytm from "../../assets/img/paytm.png";
import payoneer from "../../assets/img/payoneer.png";
import worldpay from "../../assets/img/worldpay.png";
import guest from "../../assets/img/guest-img2.png";
import downloadIcon from "../../assets/img/downloadIcon.png";
import DeletePopup from "../DeletePopup";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PayOutTable({ data }) {
  const columns = [
    { Header: "Service Name" },
    { Header: "Total Price" },
    { Header: "Date" },
    { Header: " Amount Received" },
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
        ["Service", row?.booking?.service?.title || "-"],
        ["Vendor Name", row.vendorId?.fullName || "-"],
        ["Date", dayjs(row.createdAt).format("MMMM D, YYYY h:mm A")],
        ["Total Amount", `$${row?.booking?.totalPrice.toFixed(2)}`],
        ["Amount Received", `$${row?.amount.toFixed(2)}`],
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

    doc.save(`transaction-${row?.booking?.service?.title || "data"}.pdf`);
  };

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
              <td colSpan="5" className="py-5 text-center">
                No data found
              </td>
            </tr>
          )}
          {data?.map((row, index) => (
            <tr key={index}>
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row?.booking?.service?.title}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                $ {row.booking?.totalPrice}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                {dayjs(row.createdAt).format("DD-MM-YYYY")}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">$ {row.amount}</td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <p
                  className={`p-2 min-w-[100px] text-center rounded-full ${
                    row.status === "completed"
                      ? "text-[#34A853] bg-[#34A85333]"
                      : "text-[#C13515] bg-[#C1351533]"
                  }`}
                >
                  {row.status}
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

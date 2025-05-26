import React, { useState } from "react";
import { Link } from "react-router";
import editIcon from "../../assets/img/edit-icon.png";
import stripe from "../../assets/img/stripe.png";
import paypal from "../../assets/img/paypal-logo.png";
import paytm from "../../assets/img/paytm.png";
import worldpay from "../../assets/img/worldpay.png";
import payoneer from "../../assets/img/payoneer.png";
import DeletePopup from "../DeletePopup";

export default function Payment() {
  const columns = [
    { Header: "Type" },
    { Header: "Name On Account" },
    { Header: "Account Number" },
    { Header: "Status" },
    { Header: "Actions" },
  ];

  const initialpaymentData = [
    {
      bank: stripe,
      name: "Kevin",
      account: "**** **** **** 9090",
      status: "Active",
    },
    {
      bank: paypal,
      name: "Q",
      account: "**** **** **** 9090",
      status: "Active",
    },
    {
      bank: paytm,
      name: "Kevin",
      account: "**** **** **** 9090",
      status: "Inactive",
    },
    {
      bank: worldpay,
      name: "Q",
      account: "**** **** **** 9090",
      status: "Inactive",
    },
    {
      bank: payoneer,
      name: "Kevin",
      account: "**** **** **** 9090",
      status: "Active",
    },
  ];

  const [paymentData, setpaymentData] = useState(initialpaymentData);

  const toggleStatus = (index) => {
    const updatedData = [...paymentData];
    updatedData[index].status =
      updatedData[index].status === "Active" ? "Inactive" : "Active";
    setpaymentData(updatedData);
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
          {paymentData.map((row, index) => (
            <tr key={row.index} id={`row-${index + 1}`}>
              <td className="p-4 bg-white dark:bg-gray-800 rounded-s-[10px]">
                <div>
                  <img
                    className="h-[25px] object-contain"
                    src={row.bank}
                    alt="img"
                  />
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">{row.name}</td>
              <td className="p-4 bg-white dark:bg-gray-800 font-semibold">
                {row.account}
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="relative group">
                  <button
                    onClick={() => toggleStatus(index)}
                    className={`${
                      row.status === "Active"
                        ? "text-[#34A853]"
                        : "text-[#EA3548]"
                    }`}
                  >
                    {row.status}
                  </button>
                  <div
                    className={`absolute clip-message right-full bottom-full transform p-2 ${
                      row.status === "Active" ? "bg-[#BE3516]" : "bg-[#34A853]"
                    } text-white text-[14px] rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-[0px_10px_24px_0px_#00000033]`}
                  >
                    {`Click to ${
                      row.status === "Active" ? "Inactive" : "Active"
                    }`}
                  </div>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                <div className="flex items-center gap-2">
                  <Link to="/admin-dashboard/add-Payment">
                    <img
                      className="w-[50px] aspect-square max-w-[50px]"
                      src={editIcon}
                      alt=""
                    />
                  </Link>
                  <DeletePopup />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

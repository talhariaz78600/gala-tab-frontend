import React, { useState } from "react";
import { Link } from "react-router";
import editIcon from "../../assets/img/edit-icon.png";
import deleteIcon from "../../assets/img/delete-icon.png";
import DeletePopup from "../DeletePopup";

export default function PromoDiscountTable() {
  const columns = [
    { Header: "Discount ID" },
    { Header: "Discount Name" },
    { Header: "Discount Type" },
    { Header: "Start-End Date" },
    { Header: "Percentage" },
    { Header: "Max Discount" },
    { Header: "Min Amount in Cart" },
    { Header: "Max Total Usage" },
    { Header: "Discount Code" },
    { Header: "Status" },
    { Header: "Action" },
  ];

  const initialCountryData = [
    {
      id: "1234",
      name: "Discount name here",
      type: "Percentage",
      startDate: "31-05-2025",
      endDate: "31-06-2025",
      percentage: "25%",
      maxDisc: "1000",
      minAmount: "2500",
      MaxUsage: "1000",
      code: "XYZA-001",
      status: "Active",
    },
    {
      id: "1234",
      name: "Discount name here",
      type: "Percentage",
      startDate: "31-05-2025",
      endDate: "31-06-2025",
      percentage: "25%",
      maxDisc: "1000",
      minAmount: "2500",
      MaxUsage: "1000",
      code: "XYZA-001",
      status: "Inactive",
    },
    {
      id: "1234",
      name: "Discount name here",
      type: "Percentage",
      startDate: "31-05-2025",
      endDate: "31-06-2025",
      percentage: "25%",
      maxDisc: "1000",
      minAmount: "2500",
      MaxUsage: "1000",
      code: "XYZA-001",
      status: "Active",
    },
    {
      id: "1234",
      name: "Discount name here",
      type: "Percentage",
      startDate: "31-05-2025",
      endDate: "31-06-2025",
      percentage: "25%",
      maxDisc: "1000",
      minAmount: "2500",
      MaxUsage: "1000",
      code: "XYZA-001",
      status: "Inactive",
    },
    {
      id: "1234",
      name: "Discount name here",
      type: "Percentage",
      startDate: "31-05-2025",
      endDate: "31-06-2025",
      percentage: "25%",
      maxDisc: "1000",
      minAmount: "2500",
      MaxUsage: "1000",
      code: "XYZA-001",
      status: "Active",
    },
  ];

  const [CountryData, setCountryData] = useState(initialCountryData);

  const toggleStatus = (index) => {
    const updatedData = [...CountryData];
    updatedData[index].status =
      updatedData[index].status === "Active" ? "Inactive" : "Active";
    setCountryData(updatedData);
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
          {CountryData.map((row, index) => (
            <tr key={row.index} id={`row-${index + 1}`}>
              <td className="p-4 bg-white rounded-s-[10px]">{row.id}</td>
              <td className="p-4 bg-white">
                <p className="max-w-[100px] text-wrap">{row.name}</p>
              </td>
              <td className="p-4 bg-white">{row.type}</td>
              <td className="p-4 bg-white">
                <p className="max-w-[100px] text-wrap">
                  {row.startDate} , {row.endDate}
                </p>
              </td>
              <td className="p-4 bg-white">{row.percentage}</td>
              <td className="p-4 bg-white">{row.maxDisc}</td>
              <td className="p-4 bg-white">{row.minAmount}</td>
              <td className="p-4 bg-white">{row.MaxUsage}</td>
              <td className="p-4 bg-white">{row.code}</td>
              <td className="p-4 bg-white">
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
              <td className="p-4 bg-white rounded-e-[10px]">
                <div className="flex items-center gap-2">
                  <Link to="/admin-dashboard/add-discount">
                    <img
                      className="w-[50px] aspect-square max-w-[50px]"
                      src={editIcon}
                      alt=""
                    />
                  </Link>
                  <DeletePopup/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

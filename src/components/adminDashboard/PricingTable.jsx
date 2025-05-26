import React from "react";
import guestimg from "../../assets/img/guest-img.png";
import Modal from "@mui/material/Modal";
import reset from "../../assets/img/reset.png";
import PricingModal from "./PricingModal";
import { useState } from "react";

export default function PricingTable({ data, defaultPriceData }) {
  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpen = (row) => {
    setOpen(true);
    setSelectedRow(row);
  };
  const handleClose = () => setOpen(false);

  const columns = [
    { Header: "Vendor Name" },
    { Header: "Default Pricing Percentage " },
    { Header: "Custom Pricing Percentage" },
    { Header: "Actions" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-3 text-nowrap border-spacing-x-0 ">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th
                className="bg-black text-white text-left px-4 py-5 text-lg first:rounded-s-[10px] last:rounded-e-[10px] last:text-end font-medium"
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
                className="py-5 text-center dark:bg-gray-800"
              >
                No data found
              </td>
            </tr>
          )}
          {data?.map((row, index) => (
            <tr key={index}>
              <td className="p-4 bg-white dark:bg-gray-800">
                <div className="flex items-center">
                  <p className="max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                    {row.fullName}
                  </p>
                </div>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                {defaultPriceData} %
              </td>
              <td className="p-4 bg-white dark:bg-gray-800">
                <p>{row?.customPricingPercentage || "0"} %</p>
              </td>
              <td className="p-4 bg-white dark:bg-gray-800 rounded-e-[10px]">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => handleOpen(row)}>
                    <img className="size-12 max-w-12" src={reset} alt="img" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ m: 2 }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] bg-white rounded-[20px]">
          <PricingModal
            handleClose={handleClose}
            data={selectedRow}
            defaultPriceData={defaultPriceData}
          />
        </div>
      </Modal>
    </div>
  );
}

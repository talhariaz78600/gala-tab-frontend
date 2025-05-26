import React from "react";
import { IoCloseCircle } from "react-icons/io5";
import CustomCheckbox from "./CustomCheckbox";

export default function QuickFilters() {
  const vendortypes = ["Venues", "Decorations", "Catering", "Cakes", "DJ’s"];
  const Date = ["Today", "Last week", "This week", "Last Month", "Next Month"];
  const Status = [
    "Already Booked",
    "In Progress",
    "Cancelled",
    "Active",
    "Action Required Listing",
  ];

  return (
    <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_17px_0px_#ECECEC]">
      <div className="flex items-center justify-between bg-[#E7E7E9] p-5 border-b border-[#CDCDCD]">
        <p className="text-[#3551B6] text-[20px] font-semibold">
          Quick filters
        </p>
        <button>
          <IoCloseCircle className="text-[#979797] text-[28px]" />
        </button>
      </div>
      <form action="">
        <div className="p-5 grid grid-cols-3 gap-5">
          <div className="bg-[#E7E7E9] rounded-[10px] p-3">
            <p className="text-[#3551B6] text-[18px] font-semibold">
              Vendor Type
            </p>
            <div className="flex flex-col gap-3 mt-4">
              {vendortypes.map((type, index) => (
                <CustomCheckbox key={index} name={type} />
              ))}
            </div>
          </div>
          <div className="bg-[#E7E7E9] rounded-[10px] p-3">
            <p className="text-[#3551B6] text-[18px] font-semibold">Date</p>
            <div className="flex flex-col gap-3 mt-4">
              {Date.map((date, index) => (
                <CustomCheckbox key={index} name={date} />
              ))}
            </div>
          </div>
          <div className="bg-[#E7E7E9] rounded-[10px] p-3">
            <p className="text-[#3551B6] text-[18px] font-semibold">Status</p>
            <div className="flex flex-col gap-3 mt-4">
              {Status.map((status, index) => (
                <CustomCheckbox key={index} name={status} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-5 pb-5">
          <button type="reset" className="font-medium underline">
            Clear
          </button>
          <button
            type="submit"
            className="font-medium text-white bg-black py-3 px-10 rounded-[7px]"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}

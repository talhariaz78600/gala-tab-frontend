import React from "react";
import revenueIcon from "../../assets/img/revenue-icon.png";
import { FaArrowTrendUp } from "react-icons/fa6";

export default function PayoutCard(props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 rounded-[14px] shadow-[8px_10px_34px_0px_#00000014] w-full">
      <div className="flex items-center">
        <img className="size-11 max-w-11 me-2" src={props.img} alt="img" />
        <p className="text-lg">{props.title}</p>
      </div>
      <div className="mt-2 flex flex-wrap gap-2 justify-between items-center">
        <p className="font-semibold text-[28px]">
          ${Number(props.amount).toLocaleString()}
        </p>
        {/* <div className="py-1 px-2 ms-auto text-xs flex items-center font-medium rounded-full bg-[#32F0CD]">
          <FaArrowTrendUp className="me-1" /> <span>+{props.increament}</span>
        </div> */}
      </div>
    </div>
  );
}

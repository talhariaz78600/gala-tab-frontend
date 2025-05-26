import React from "react";
import PaymentGatewayTable from "../../components/adminDashboard/PaymentGatewayTable";
import { Link } from "react-router";

export default function PaymentGateway() {
  return (
    <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] min-h-[calc(100vh-130px)] rounded-[20px]">
      <div className="flex items-center gap-4 flex-wrap justify-between p-5 border-b">
        <p className="text-[24px] sm:text-[28px] leading-normal font-semibold">
          Payments Gateway Details List
        </p>
        <div className="ms-auto">
          <button className="font-medium border inline-block bg-white dark:bg-gray-800 border-black p-3 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]">
            Add Payment
          </button>
        </div>
      </div>
      <div className="p-5">
        <PaymentGatewayTable />
      </div>
    </div>
  );
}

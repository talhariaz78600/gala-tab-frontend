import React from "react";
import BasicSelect from "../../components/VendorDashboard/BasicSelect";
import DateRangePicker from "../../components/DatePicker/DateRangePicker";
import { Link } from "react-router";
import PromoDiscountTable from "../../components/adminDashboard/PromoDiscountTable";
import { IoSearch } from "react-icons/io5";

export default function PromoDiscount() {
  return (
    <div className="min-h-[calc(100dvh-130px)] bg-[#F7F7F7] rounded-[20px]">
      <div className="flex justify-between items-center flex-wrap border-b border-[#D6D6D6] p-5 gap-5 w-full">
        <div className="">
          <p className="text-[28px] leading-normal font-semibold">
            Promo Discount Codes
          </p>
        </div>
        <div className="flex flex-wrap-reverse items-center justify-end gap-4 ms-auto">
          <DateRangePicker />
          <Link
            to="/admin-dashboard/add-discount"
            className="font-medium border border-black bg-white p-3 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]"
          >
            Add New Discount Code
          </Link>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-end">
          <label className="w-full max-w-[500px]" htmlFor="search">
            <div className="flex items-center bg-white p-3 border rounded-[10px]">
              <IoSearch />
              <input
                className="w-full px-2"
                type="search"
                name="search"
                id="search"
              />
            </div>
          </label>
        </div>
        <PromoDiscountTable />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router";
import CarateDark from "../../assets/img/CarateDark.png";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AddDiscount() {
  return (
    <form action="/admin-dashboard/promo-discount">
      <div className="bg-[#F7F7F7] min-h-[calc(100vh-130px)] rounded-[20px] p-5 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div>
              <Link to="/admin-dashboard/promo-discount"><IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" /></Link>
            </div>
            <p className="text-[24px] font-semibold">Add Promo Discount Code</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-4 mt-5 max-w-[1000px]">
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Discount ID
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Discount Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Discount Type
              </label>
              <select
                style={{
                  backgroundImage: `url(${CarateDark})`,
                  backgroundPosition: "calc(100% - 10px) center",
                }}
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 pe-8 w-full bg-no-repeat appearance-none"
                name=""
                id=""
              >
                <option value="" hidden selected>
                  Select Here
                </option>
                <option value="">Percentage</option>
                <option value="">Flat</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Start-End Date
              </label>
              <input
                type="date"
                placeholder="Type here"
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Percentage
              </label>
              <select
                style={{
                  backgroundImage: `url(${CarateDark})`,
                  backgroundPosition: "calc(100% - 10px) center",
                }}
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 pe-8 w-full bg-no-repeat appearance-none"
                name=""
                id=""
              >
                <option value="" hidden selected>
                  Select Here
                </option>
                <option value="">10%</option>
                <option value="">15%</option>
                <option value="">20%</option>
                <option value="">25%</option>
                <option value="">30%</option>
                <option value="">35%</option>
              </select>
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Allowed Maximum Discount
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Minimum Amount in Cart
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Minimum Total Usage
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Discount Code
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Add Canva File
              </label>
              <input
                type="file"
                placeholder="Type here"
                className="bg-white shadow-[0px_8px_24px_0px_#00000012] rounded-[10px] p-4 w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-12">
          <div>
            <Link
              to="/admin-dashboard/promo-discount"
              className="flex justify-center bg-[#E7E7E7] py-2 rounded-full px-6 border w-52"
            >
              Cancel
            </Link>
          </div>
          <div>
            <button className="text-white bg-black py-2 px-6 border w-52 rounded-full">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

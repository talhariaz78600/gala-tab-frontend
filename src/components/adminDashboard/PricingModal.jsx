import React from "react";
import guestimg from "../../assets/img/guest-img.png";
import { IoCloseCircle } from "react-icons/io5";
import { useUpdateCustomPricingMutation } from "@/api/apiSlice";
import Loader from "../loader/Loader";
import { useState } from "react";
import { toast } from "react-toastify";

export default function PricingModal({ handleClose, data, defaultPriceData }) {
  const [customPercentage, setCustomPercentage] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCustomPercentage(value);
    }
  };

  const [updateCustomPricing, { isLoading }] = useUpdateCustomPricingMutation();

  const handleSave = async (e) => {
    e.preventDefault();
    if (!customPercentage) {
      toast.error("Custom Pricing Percentage cannot be empty!");
      return;
    }

    try {
      const res = await updateCustomPricing({
        id: data._id,
        data: { customPricingPercentage: Number(customPercentage) },
      }).unwrap();

      if (res?.status === "success") {
        toast.success("Custom Pricing Percentage updated successfully!");
        handleClose();
      } else {
        toast.error(res?.message || "Failed to update custom pricing.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_17px_0px_#ECECEC] dark:shadow-[0px_0px_17px_0px_rgb(50_50_50_/_0.7)] bg-white dark:bg-[#1e1e1e]">
        <div className="flex items-center justify-between bg-[#E7E7E9] dark:bg-[#2a2a2a] p-5 border-b border-[#CDCDCD] dark:border-[#444]">
          <p className="text-[#3551B6] dark:text-[#7ea0ff] sm:text-[20px] font-semibold">
            Reset custom pricing percentage
          </p>
          <button onClick={handleClose}>
            <IoCloseCircle className="text-[#979797] dark:text-gray-400 text-[28px]" />
          </button>
        </div>
        <div className="max-h-[calc(100dvh-200px)] overflow-y-auto">
          <div className="grid min-[480px]:grid-cols-2 gap-4 px-5 pt-5">
            <div>
              <p className="text-[#3551B6] dark:text-[#7ea0ff] font-medium sm:text-[20px]">
                Vendor Name:
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* <img className="size-12 rounded-full" src={guestimg} alt="img" /> */}
              <p className="font-medium text-lg overflow-hidden text-ellipsis text-black dark:text-gray-200">
                {data?.fullName}
              </p>
            </div>
            <div>
              <p className="text-[#3551B6] dark:text-[#7ea0ff] font-medium sm:text-[20px]">
                Default Pricing Percentage:
              </p>
            </div>
            <div>
              <p className="font-medium sm:text-[20px] text-black dark:text-gray-200">
                {defaultPriceData} %
              </p>
            </div>
            <div>
              <p className="text-[#3551B6] dark:text-[#7ea0ff] font-medium sm:text-[20px]">
                Custom Pricing Percentage Now:
              </p>
            </div>
            <div>
              <p className="font-medium sm:text-[20px] text-black dark:text-gray-200">
                {data?.customPricingPercentage || "0"} %
              </p>
            </div>
          </div>
          <div className="px-5 mt-4">
            <label
              className="sm:text-lg font-medium text-black dark:text-gray-300"
              htmlFor=""
            >
              Custom Pricing Percentage
            </label>
            <input
              className="border border-[#D5D5D5] dark:border-[#555] block w-full shadow-[0px_8px_24px_0px_#00000012] dark:shadow-none p-4 bg-white dark:bg-[#2a2a2a] rounded-[10px] text-black dark:text-gray-200"
              placeholder="Type here"
              type="text"
              value={customPercentage}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex p-5 mt-10">
            <button
              onClick={(e) => handleSave(e)}
              className="font-medium text-white bg-black dark:bg-gray-800 py-3 px-10 rounded-[7px] ms-auto hover:bg-gray-900 dark:hover:bg-gray-700 transition"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <Loader loading={isLoading} />
    </>
  );
}

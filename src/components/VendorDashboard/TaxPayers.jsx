import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import AddTaxInfoModdal from "./AddTaxInfoModdal";

export default function () {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div
        className="bg-[#F7F7F7] p-3 border border-[#D5D5D5] rounded-[10px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {isOpen ? (
            <FaChevronDown className="text-[20px] me-2" />
          ) : (
            <FaChevronRight className="text-[20px] me-2" />
          )}
          <p className="text-lg font-semibold">Amenities Details</p>
        </div>
      </div>

      {isOpen && (
        <div>
          <div className="flex items-center flex-wrap-reverse gap-4 justify-between mt-5 border-b pb-5">
            <div>
              <p className="font-semibold sm:text-[28px] text-lg">Taxpayer information</p>
              <p className="sm:text-lg mt-5">
                Tax info is required for most countries/regions.
              </p>
            </div>
            <div className="ms-auto">
              <AddTaxInfoModdal />
            </div>
          </div>
          <div className="flex items-center flex-wrap-reverse gap-4 justify-between mt-5 border-b pb-5">
            <div>
              <p className="font-semibold sm:text-[28px] text-lg">Value Added Tax (VAT)</p>
              <p className="sm:text-lg mt-5">
                If you are VAT-registered, please add your VAT ID.
              </p>
            </div>
            <div className="ms-auto">
              <button className="bg-black text-white py-3 px-5 flex items-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A] ms-auto">
                Add VAT ID Number
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

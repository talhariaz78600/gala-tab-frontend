import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router";

export default function TaxDocuments() {
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
          <p className="text-lg font-semibold">Tax documents</p>
        </div>
      </div>

      {isOpen && (
        <div>
          <div className="mt-5">
            <p>
              Tax documents required for filing taxes are available to review
              and download here.
            </p>
            <p>
              You can also file taxes using detailed earnings info, available in
              the.
            </p>
            <div className="mt-5">
              <Link className="bg-black inline-block text-white py-3 px-5 rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A]">
                Earnings summary
              </Link>
            </div>
          </div>
          <div className="mt-5 border-b pb-5">
            <div>
              <p className="font-semibold text-[28px]">2024</p>
              <p className="text-lg mt-5">No tax document issued</p>
            </div>
          </div>
          <div className="mt-5 border-b pb-5">
            <div>
              <p className="font-semibold text-[28px]">2023</p>
              <p className="text-lg mt-5">No tax document issued</p>
            </div>
          </div>
          <div className="mt-5 border-b pb-5">
            <div>
              <p className="font-semibold text-[28px]">2022</p>
              <p className="text-lg mt-5">No tax document issued</p>
            </div>
          </div>
          <div className="flex items-center flex-wrap-reverse gap-4 justify-between mt-5 border-b pb-5">
            <div>
              <p className="text-lg">For tax documents issued prior to 2020,</p>
            </div>
            <div className="ms-auto">
              <button className="bg-black text-white py-3 px-5 flex items-center rounded-[8px] shadow-[0px_10px_20px_0px_#0000001A] ms-auto">
                Gala Tab Support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

export default function OfferAmenities({ title = "Offer Amenities", data }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div
        className="bg-white dark:bg-gray-800 p-3 border border-[#D5D5D5] rounded-[10px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {isOpen ? (
            <FaChevronDown className="text-[20px] me-2" />
          ) : (
            <FaChevronRight className="text-[20px] me-2" />
          )}
          <p className="sm:text-lg font-semibold">{title}</p>
        </div>
      </div>

      {isOpen && (
        <div className="p-3 bg-[#E7E7E7] dark:bg-gray-800 mt-3 rounded-[10px]">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {data?.map((item, index) => (
              <div key={index}>
                <p className="font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

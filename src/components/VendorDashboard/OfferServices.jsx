import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

export default function OfferServices() {
  const [isOpen, setIsOpen] = useState(true);

  const OfferServices = [
    "Outside food allowed",
    "All-inclusive",
    "Outside alcohol allowed",
    "Space Rental Only",
    "Clean up included",
  ];

  return (
    <div>
      <div
        className="bg-white p-3 border border-[#D5D5D5] rounded-[10px] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {isOpen ? (
            <FaChevronDown className="text-[20px] me-2" />
          ) : (
            <FaChevronRight className="text-[20px] me-2" />
          )}
          <p className="text-lg font-semibold">Offer Amenities</p>
        </div>
      </div>

      {isOpen && (
        <div className="p-3 bg-[#E7E7E7] mt-3 rounded-[10px]">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {OfferServices.map((item, index) => (
              <div key={index}>
                <p className="font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from "react";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

export default function ServicesAvailability() {
  const [isOpen, setIsOpen] = useState(false);

  const ServicesAvailability = [
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
          <p className="text-lg font-semibold">Services Availability</p>
        </div>
      </div>

      {isOpen && (
        <div className="p-3">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ServicesAvailability.map((item, index) => {
              const formatedId = item.replace(/\s+/g, "-");
              return (
                <div className="flex items-center p-3" key={index}>
                  <input
                    className="size-6 min-w-6 me-3 accent-black"
                    type="checkbox"
                    name="AmenitiesDetails"
                    id={formatedId}
                  />
                  <label className="text-lg font-medium" htmlFor={formatedId}>
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

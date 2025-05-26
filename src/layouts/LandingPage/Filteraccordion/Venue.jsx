import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import PriceRangeSlider from "./PriceRangeSlider";
import InputNumber from "../../../components/VendorDashboard/InputNumber";

const Venue = () => {
  const [capacity, setCapacity] = useState(345);
  const [restrooms, setRestrooms] = useState(2);
  const [guestCount, setGuestCount] = useState(0);
  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

  const checkboxArray = [
    {
      id: "ground",
      label: "Ground Floor",
    },
    {
      id: "Elevator",
      label: "Elevator",
    },
    {
      id: "stairs",
      label: "Stairs",
    },
    {
      id: "wheel",
      label: "Wheel chair accessible",
    },
    {
      id: "table",
      label: "Tables & Chair",
    },
    {
      id: "buffet",
      label: "Buffet Area",
    },
    {
      id: "bar",
      label: "Bar",
    },
    {
      id: "kitchen",
      label: "Kitchen",
    },
    {
      id: "fridge",
      label: "Fridge",
    },
    {
      id: "cooler",
      label: "Coolers",
    },
    {
      id: "stove",
      label: "Stove",
    },
    {
      id: "microwave",
      label: "Microwave",
    },
    {
      id: "food",
      label: "Outside food allowed",
    },
    {
      id: "indoor",
      label: "Indoor",
    },
    {
      id: "outdoor",
      label: "Outdoor",
    },
    {
      id: "dressing",
      label: "Dressing room",
    },
    {
      id: "alcohol",
      label: "Outside Alcohol allowed",
    },
    {
      id: "suite",
      label: "Bridal Suite",
    },
    {
      id: "video",
      label: "Video",
    },
    {
      id: "sound",
      label: "Sound",
    },
    {
      id: "staff",
      label: "Service Staff",
    },
    {
      id: "wifi",
      label: "Wifi",
    },
    {
      id: "ac",
      label: "AC/Heat",
    },
    {
      id: "clean",
      label: "Clean up included",
    },
    {
      id: "space",
      label: "Space Rental Only",
    },
    {
      id: "inclusive",
      label: "All-inclusive",
    },
  ];

  return (
    <div>
      <form action="">
        <h5 className="font-medium text-xl">Types of Venues</h5>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 border-t border-b py-3 mt-3">
          <div>
            <div className="flex items-center justify-between gap-2 py-2 border-r pe-2">
              <div>
                <label className="text-[#535353]">Capacity</label>
              </div>
              <InputNumber count={guestCount} setCount={setGuestCount} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between gap-2 py-2">
              <div>
                <label className="text-[#535353]">Restrooms</label>
              </div>
              <InputNumber count={guestCount} setCount={setGuestCount} />
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 py-3 border-b">
          {checkboxArray.map((item) => (
            <div key={item.id} className="flex items-center gap-2 border-r p-1">
              <input
                type="checkbox"
                id={item.id}
                className="accent-black w-4 h-4 msx-w-[16px]"
              />
              <label htmlFor={item.id} className="text-[#535353]">
                {item.label}
              </label>
            </div>
          ))}
        </div>
        <div>
          <PriceRangeSlider />
        </div>
        <div className="flex justify-between items-center gap-3 py-3 border-b">
          <div>
            <input
              type="reset"
              value="Clear"
              className="underline text-black"
            />
          </div>
          <div>
            <button className="bg-black text-white py-2 px-9 rounded-md">
              Show 1000+ Venues
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Venue;

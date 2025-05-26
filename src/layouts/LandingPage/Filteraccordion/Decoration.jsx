import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import PriceRangeSlider from "./PriceRangeSlider";
import InputNumber from "../../../components/VendorDashboard/InputNumber";

const Decoration = () => {
  const [capacity, setCapacity] = useState(345);
  const [restrooms, setRestrooms] = useState(2);
  const [guestCount, setGuestCount] = useState(0);
  const increment = (setter, value) => setter(value + 1);
  const decrement = (setter, value) => setter(value > 0 ? value - 1 : 0);

  const checkboxArray = [
    {
      id: "shower",
      label: "Baby shower",
    },
    {
      id: "reveal",
      label: "Gender reveal",
    },
    {
      id: "sweet",
      label: "Sweet 16",
    },
    {
      id: "event",
      label: "Religious Event",
    },
    {
      id: "quin",
      label: "Quinceanera",
    },
    {
      id: "birth",
      label: "Milestone birthdays",
    },
    {
      id: "bride",
      label: "Bridal Showers",
    },
    {
      id: "wed",
      label: "Weddings",
    },
    {
      id: "ann",
      label: "Anniversary",
    },
    {
      id: "retire",
      label: "Retirements",
    },
    {
      id: "dance",
      label: "Dinner Dances",
    },
    {
      id: "c-eve",
      label: "Corporate events",
    },
    {
      id: "graduation",
      label: "Graduation",
    },
  ];

  return (
    <div>
      <form action="">
        <h5 className="font-medium text-xl">Type of Event</h5>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 border-t py-3 mt-3">
          <div>
            <div className="flex items-center justify-between gap-2 py-2 border-r pe-2">
              <div>
                <label className="text-[#535353]">Capacity</label>
              </div>
              <InputNumber count={guestCount} setCount={setGuestCount} />
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 border-t border-b py-3">
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
              Show 1000+ Events
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Decoration;

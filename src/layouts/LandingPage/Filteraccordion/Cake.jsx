import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import PriceRangeSlider from "./PriceRangeSlider";
import InputNumber from "../../../components/VendorDashboard/InputNumber";

const Cake = () => {
  const checkboxArray = [
    {
      id: "tier",
      label: "Tier",
    },
    {
      id: "sheet",
      label: "Sheet",
    },
    {
      id: "round",
      label: "Round",
    },
    {
      id: "square",
      label: "Square",
    },
    {
      id: "rectangle",
      label: "Rectangle",
    },
    {
      id: "custom_shape",
      label: "Custom Shape",
    },
    {
      id: "cream",
      label: "Cream",
    },
    {
      id: "fondant",
      label: "Fondant",
    },
  ];

  return (
    <div>
      <form action="">
        <h5 className="font-medium text-xl">Types of Cake</h5>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 border-t py-3 mt-3">
          <div>
            <div className="flex items-center justify-between gap-2 py-2 border-r pe-2">
              <div>
                <label className="text-[#535353]">Capacity</label>
              </div>
              <InputNumber initialCount={345} />
            </div>
          </div>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-4 py-3 border-b border-t">
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
              Show 1000+ Cake
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Cake;

import React, { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import PriceRangeSlider from "./PriceRangeSlider";
import InputNumber from "../../../components/VendorDashboard/InputNumber";

const CateringAcc = () => {
  const [guestCount, setGuestCount] = useState(0);
  const checkboxArray = [
    {
      id: "american",
      label: "American",
    },
    {
      id: "spanish",
      label: "Spanish",
    },
    {
      id: "sweet",
      label: "Sweet 16",
    },
    {
      id: "Cari",
      label: "Caribbean",
    },
    {
      id: "des",
      label: "Dessert table",
    },
    {
      id: "Indian",
      label: "Indian",
    },
    {
      id: "french",
      label: "French",
    },
    {
      id: "east",
      label: "Middle Eastern",
    },
    {
      id: "medi",
      label: "Mediterranean",
    },
    {
      id: "thai",
      label: "Thai",
    },
    {
      id: "lunch",
      label: "Lunch",
    },
    {
      id: "korean",
      label: "Korean",
    },
    {
      id: "breakfast",
      label: "Breakfast",
    },
    {
      id: "lunch2",
      label: "Lunch",
    },
    {
      id: "brunch",
      label: "Brunch",
    },
    {
      id: "Dinner",
      label: "Dinner",
    },
    {
      id: "Cocktail",
      label: "Cocktail",
    },
    {
      id: "Appitizers",
      label: "Appitizers",
    },
    {
      id: "Horderves",
      label: "Horderves",
    },
    {
      id: "Buffet2",
      label: "Buffet",
    },
    {
      id: "down",
      label: "Sit Down Dinner",
    },
    {
      id: "Dessert_table",
      label: "Dessert table",
    },
    {
      id: "Drop_of_Catering",
      label: "Drop of Catering",
    },
    {
      id: "Catering_full_setup",
      label: "Catering full setup",
    },
    {
      id: "Vegan",
      label: "Vegan",
    },
    {
      id: "Gluten_Free",
      label: "Gluten Free",
    },
    {
      id: "Kosher",
      label: "Kosher",
    },
    {
      id: "Halal",
      label: "Halal",
    },
    {
      id: "Dietary_Restrictions",
      label: "KoDietary Restrictionssher",
    },
    {
      id: "Package_Prefix_Menu",
      label: "Package Prefix Menu",
    },
    {
      id: "Custom_Menus",
      label: "Custom Menus",
    },
    {
      id: "Coffee",
      label: "Coffee",
    },
    {
      id: "Desserts",
      label: "Desserts",
    },
  ];

  return (
    <div>
      <form action="">
        <h5 className="font-medium text-xl">Type of Cuisine</h5>
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
              Show 1000+ Catering
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CateringAcc;

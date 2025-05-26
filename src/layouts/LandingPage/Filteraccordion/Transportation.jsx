import React, { useState } from "react";
import PriceRangeSlider from "./PriceRangeSlider";
import InputNumber from "../../../components/VendorDashboard/InputNumber";

const Transportation = () => {
  const [guestCount, setGuestCount] = useState(0);
  const checkboxArray = [
    {
      id: "bus",
      label: "Party Bus",
    },
    {
      id: "car",
      label: " Exotic Cars",
    },
    {
      id: "cars",
      label: "cars",
    },
  ];

  return (
    <div>
      <form action="">
        <h5 className="font-medium text-xl">Vehicle Type</h5>
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
        <div className="grid sm:grid-cols-2 gap-3 py-3">
          <div>
            <label htmlFor="" className="text-sm">
              Vehicle Type
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="country"
                name="country"
                autocomplete="country-name"
                className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
              >
                <option>Vehicle Type</option>
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Make
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="make"
                name="make"
                autocomplete="make-name"
                className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
              >
                <option>Make</option>
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Modal
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="Modal"
                name="Modal"
                autocomplete="Modal-name"
                className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
              >
                <option>Modal</option>
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Color
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="color"
                name="color"
                autocomplete="color-name"
                className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
              >
                <option>Color</option>
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Year
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="Year"
                name="Year"
                autocomplete="Year-name"
                className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
              >
                <option>Year</option>
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Gas/Ev
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="gas"
                name="gas"
                autocomplete="gas-name"
                className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
              >
                <option>gas</option>
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Seats
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="Seats"
                name="Seats"
                autocomplete="Seats-name"
                className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
              >
                <option>Seats</option>
              </select>
              <svg
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-black sm:size-8"
                viewBox="0 0 16 16"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
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
              Show 1000+ Transportation
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Transportation;

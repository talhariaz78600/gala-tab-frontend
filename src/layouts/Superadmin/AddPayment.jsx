import React from "react";
import Down from "../../assets/img/down.png";
import { Link } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";

const AddPayment = () => {
  return (
    <div>
      <form action="/admin-dashboard/payment-gateway">
        <div className="bg-[#F7F7F7] dark:bg-[#1e1e1e] rounded-[20px] min-h-[calc(100dvh-130px)] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b p-5">
              <div>
                <Link to="/admin-dashboard/payment-gateway">
                  <IoMdArrowRoundBack className="bg-white  text-black p-2 shadow-sm rounded-full text-4xl" />
                </Link>
              </div>
              <h4 className="font-semibold xl:text-3xl text-2xl">
                Add Payment
              </h4>
            </div>
            <div>
              <div className="grid xl:grid-cols-3 gap-3 p-5">
                <div className="xl:col-start-1 xl:col-end-3">
                  <div className="grid lg:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="" className="font-medium text-lg">
                        Country/region
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="country"
                          name="country"
                          autocomplete="country-name"
                          className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
                        >
                          <option>United States</option>
                          <option>New Zealand</option>
                          <option>Oman</option>
                          <option value="">Pakistan</option>
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
                      <label htmlFor="" className="font-medium text-lg">
                        Select Country Payment
                      </label>
                      <div className="mt-2 grid grid-cols-1">
                        <select
                          id="country"
                          name="country"
                          autocomplete="country-name"
                          className="col-start-1 shadow-md row-start-1 w-full appearance-none rounded-md bg-white py-3 pl-3 pr-8 text-base text-gray-900  -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-gray sm:text-sm/6"
                        >
                          <option>Select Country Payment</option>
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
                      <label htmlFor="" className="font-medium text-lg">
                        Name of Account
                      </label>
                      <input
                        type="text"
                        placeholder="Type here"
                        className="py-3 px-2 shadow-md w-full rounded-lg"
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="font-medium text-lg">
                        Account Number
                      </label>
                      <input
                        type="number"
                        placeholder="Type here"
                        className="py-3 px-2 shadow-md w-full rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 p-5 mt-5">
            <div>
              <Link
                to="/admin-dashboard/payment-gateway"
                className="bg-[#E7E7E7] text-black border rounded-full py-2 px-9"
              >
                Cancel
              </Link>
            </div>
            <div>
              <button className="bg-black text-white border rounded-full py-2 px-9">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPayment;

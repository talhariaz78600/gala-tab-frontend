import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaCirclePlus, FaRegCircleCheck } from "react-icons/fa6";
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";

const Rule = ({ mode = "new" }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const eventAllowed = watch("eventAllowed", "");
  const maxGuests = watch("maxGuests", "");
  const drugsAllowed = watch("drugsAllowed", "");
  const photography = watch("photography", "");
  const checkInTime = watch("checkInTime", "");
  const checkOutTime = watch("checkOutTime", "");

  const increment = () => {
    const currentValue = Number(watch("maxGuests")) || 0;
    setValue("maxGuests", currentValue + 1, { shouldDirty: true });
  };

  const decrement = () => {
    const currentValue = Number(watch("maxGuests")) || 0;
    setValue("maxGuests", currentValue > 1 ? currentValue - 1 : 1, {
      shouldDirty: true,
    });
  };

  return (
    <div className="py-5">
      <div
        className={`grid gap-4 ${
          mode === "new" ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {mode === "new" && (
          <div>
            <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
              Step 09
            </p>
            <div>
              <h2 className="text-[#171717] dark:text-white font-bold xl:text-6xl lg:text-5xl text-3xl mt-5">
                Set Your Rules Like a Pro!
              </h2>
              <p className="text-[#171717] dark:text-white mt-3 text-lg">
                Share your rules with guests after to service bookings
              </p>
            </div>
          </div>
        )}

        <div>
          {/* Events Allowed */}
          <div className="flex flex-wrap gap-2 items-center justify-between bg-[#F7F7F7]  border p-3 rounded-lg">
            <label className="text-[#202529] text-sm font-medium">
              Events Allowed
            </label>
            <div className="flex gap-3 items-center">
              <AiOutlineCloseCircle
                className={`text-2xl ${
                  eventAllowed === false ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() =>
                  setValue("eventAllowed", false, { shouldDirty: true })
                }
              />
              <input
                type="radio"
                className="hidden"
                {...register("eventAllowed")}
                value="false"
              />
              <FaRegCheckCircle
                className={`text-2xl ${
                  eventAllowed === true ? "text-green-500" : "text-gray-400"
                }`}
                onClick={() =>
                  setValue("eventAllowed", true, { shouldDirty: true })
                }
              />
              <input
                type="radio"
                className="hidden"
                {...register("eventAllowed")}
                value="true"
              />
            </div>
          </div>

          {/* Drugs Allowed */}
          <div className="flex flex-wrap gap-2 items-center justify-between bg-[#F7F7F7] border p-3 rounded-lg mt-3">
            <label className="text-[#202529] text-sm">
              Smoking, Vaping, E-Cigarettes Allowed
            </label>
            <div className="flex gap-3 items-center">
              <AiOutlineCloseCircle
                className={`text-2xl ${
                  drugsAllowed === false ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() =>
                  setValue("drugsAllowed", false, { shouldDirty: true })
                }
              />
              <input
                type="radio"
                className="hidden"
                {...register("drugsAllowed")}
                value="false"
              />
              <FaRegCheckCircle
                className={`text-2xl ${
                  drugsAllowed === true ? "text-green-500" : "text-gray-400"
                }`}
                onClick={() =>
                  setValue("drugsAllowed", true, { shouldDirty: true })
                }
              />
              <input
                type="radio"
                className="hidden"
                {...register("drugsAllowed")}
                value="true"
              />
            </div>
          </div>

          {/* Max Guests */}
          {/* Max Guests */}
          <div className="flex flex-wrap gap-2 items-center justify-between bg-[#F7F7F7] border p-3 rounded-lg mt-3">
            <label className="text-[#202529] text-sm">
              Max Number of Guests <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <FiMinusCircle
                className="text-xl text-[#717171] cursor-pointer"
                onClick={decrement}
              />

              <input
                type="number"
                value={watch("maxGuests") || 1}
                min={1}
                {...register("maxGuests", {
                  required: "Max guests is required",
                  min: {
                    value: 1,
                    message: "Minimum of 1 guest is required",
                  },
                  valueAsNumber: true,
                })}
                className="underline bg-transparent border-none w-12 text-center text-base focus:outline-none text-black"
              />

              <FiPlusCircle
                className="text-xl text-[#717171] cursor-pointer"
                onClick={increment}
              />
            </div>

            {errors.maxGuests && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxGuests.message}
              </p>
            )}
          </div>

          {/* Photography Allowed */}
          <div className="flex flex-wrap gap-2 items-center justify-between bg-[#F7F7F7] border p-3 rounded-lg mt-3">
            <label className="text-[#202529] text-sm">
              Commercial Photography & Filming Allowed
            </label>
            <div className="flex gap-3 items-center">
              <AiOutlineCloseCircle
                className={`text-2xl ${
                  photography === false ? "text-red-500" : "text-gray-400"
                }`}
                onClick={() =>
                  setValue("photography", false, { shouldDirty: true })
                }
              />
              <input
                type="radio"
                className="hidden"
                {...register("photography")}
                value="false"
              />
              <FaRegCheckCircle
                className={`text-2xl ${
                  photography === true ? "text-green-500" : "text-gray-400"
                }`}
                onClick={() =>
                  setValue("photography", true, { shouldDirty: true })
                }
              />
              <input
                type="radio"
                className="hidden"
                {...register("photography")}
                value="true"
              />
            </div>
          </div>

          {/* Check-in and Checkout Times */}
          <div className="mt-3">
            <h4 className="text-[#484848] dark:text-white font-medium text-lg">
              Check-in and Checkout Times
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {/* Check-in Time */}
              <div>
                <label className="text-[hsl(207,12%,14%)] dark:text-white text-sm font-semibold">
                  Check-in Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register("checkInTime", {
                    required: "Check-in time is required",
                  })}
                  className="border p-3 rounded-lg w-full text-black"
                />
                {errors.checkInTime && (
                  <p className="text-red-500 text-sm">
                    {errors.checkInTime.message}
                  </p>
                )}
              </div>

              {/* Checkout Time */}
              <div>
                <label className="text-[#202529] dark:text-white text-sm font-semibold">
                  Checkout Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  {...register("checkOutTime", {
                    required: "Checkout time is required",
                  })}
                  className="border p-3 rounded-lg w-full text-black"
                />
                {errors.checkOutTime && (
                  <p className="text-red-500 text-sm">
                    {errors.checkOutTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Additional House Rules */}
          <div className="mt-3">
            <label className="text-[#202529] dark:text-white font-semibold text-lg">
              Additional House Rules <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("additionalInfo", {
                required: "This field is required",
              })}
              placeholder="Type here"
              className="shadow rounded-xl border w-full p-3 bg-white text-black"
            ></textarea>
            {errors.additionalInfo && (
              <p className="text-red-500 text-sm">
                {errors.additionalInfo.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rule;

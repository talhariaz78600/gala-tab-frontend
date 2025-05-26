import React, { useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { FaCirclePlus } from "react-icons/fa6";
import { useFormContext, useController } from "react-hook-form";

const Availibility = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    field: capacityField,
    fieldState: { error: capacityError },
  } = useController({
    name: "noOfCapacity",
    control,
    rules: {
      validate: (value) =>
        value > 0 || "Capacity is required and must be greater than 0",
    },
    defaultValue: 0,
  });

  const {
    field: restroomField,
    fieldState: { error: restroomError },
  } = useController({
    name: "noOfRestrooms",
    control,
    rules: {
      validate: (value) =>
        value > 0 || "Restrooms are required and must be greater than 0",
    },
    defaultValue: 0,
  });

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
            Step 02
          </p>
          <div>
            <h2 className="text-[#171717] dark:text-white font-bold xl:text-5xl lg:text-5xl text-3xl mt-5">
              Let's Get the Basics on your Space!
            </h2>
            <p className="text-[#171717] dark:text-white mt-3 text-lg">
              Enter the type of space that most closely represents the physical
              space being listed.
            </p>
            <p className="text-[#171717] dark:text-white mt-3 text-lg">
              We’ll dive into the fun stuff, like photos and amenities a little
              later.
            </p>
          </div>
        </div>

        <div className="bg-[#F7F7F7] dark:bg-gray-800 rounded-2xl p-4">
          {/* Space Title Input */}
          <div>
            <label
              htmlFor="spaceTitle"
              className="text-[#202529] dark:text-white text-sm font-medium ml-4"
            >
              Enter Your Space Title
            </label>
            <input
              id="spaceTitle"
              type="text"
              {...register("spaceTitle", {
                required: "Space title is required",
              })}
              className={`w-full shadow px-3 py-2 rounded-lg border text-black ${
                errors.spaceTitle ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Type here"
            />
            {errors.spaceTitle && (
              <p className="text-red-500 text-sm">
                {errors.spaceTitle.message}
              </p>
            )}
          </div>

          <div className="mt-5">
            <h4 className="font-semibold text-xl">Service Availability</h4>

            {/* Capacity */}

            <div className="flex items-center justify-between gap-2 border-b py-2">
              <label className="text-[#535353] dark:text-white">Capacity</label>
              <div className="flex items-center gap-3">
                <FiMinusCircle
                  className="text-xl cursor-pointer"
                  onClick={() =>
                    capacityField.onChange(Math.max(capacityField.value - 1, 1))
                  }
                />
                <input
                  type="number"
                  min={1}
                  value={capacityField.value}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    capacityField.onChange(isNaN(val) ? 0 : val);
                  }}
                  className="w-16 text-center  bg-transparent    px-1 py-1"
                />
                <FaCirclePlus
                  className="text-xl cursor-pointer"
                  onClick={() =>
                    capacityField.onChange(capacityField.value + 1)
                  }
                />
              </div>
            </div>
            {capacityError && (
              <p className="text-red-500 text-sm">{capacityError.message}</p>
            )}

            {/* Restrooms */}
            {/* Restrooms */}
            <div className="flex items-center justify-between gap-2 border-b py-2 mt-4">
              <label className="text-[#535353] dark:text-white">
                Restrooms
              </label>
              <div className="flex items-center gap-3">
                <FiMinusCircle
                  className="text-xl cursor-pointer"
                  onClick={() =>
                    restroomField.onChange(Math.max(restroomField.value - 1, 1))
                  }
                />
                <input
                  type="number"
                  min={1}
                  value={restroomField.value}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    restroomField.onChange(isNaN(val) ? 0 : val);
                  }}
                  className="w-16 text-center  bg-transparent    px-1 py-1"
                />
                <FaCirclePlus
                  className="text-xl cursor-pointer"
                  onClick={() =>
                    restroomField.onChange(restroomField.value + 1)
                  }
                />
              </div>
            </div>
            {restroomError && (
              <p className="text-red-500 text-sm">{restroomError.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availibility;

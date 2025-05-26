import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const ServiceDescription = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const maxCharacters = 500;
  const title = watch("title", "");
  const description = watch("description", ""); // Watching the description field

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setValue("description", e.target.value);
    }
  };

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
            Step 03
          </p>
          <div>
            <h2 className="text-[#171717] dark:text-white font-bold xl:text-6xl lg:text-5xl text-3xl mt-5">
              Write a Description That Stands Out!
            </h2>
            <p className="text-[#171717] dark:text-white mt-3 text-lg">
              Tell guests what makes your place unique - share the magic!
            </p>
          </div>
        </div>
        <div>
          {/* Service Title */}
          <div>
            <label
              htmlFor="serviceTitle"
              className="text-[#202529] dark:text-white text-sm font-medium ml-4"
            >
              Enter Your Service Title
            </label>
            <input
              id="serviceTitle"
              type="text"
              {...register("title", { required: "Service title is required" })}
              className={`w-full shadow px-3 py-2  text-black rounded-lg border ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Type here"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Service Description */}
          <div className="mt-4">
            <textarea
              className={`w-full shadow px-3 py-2 text-black rounded-lg border focus-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              cols="10"
              rows="10"
              placeholder="Type here"
              aria-label="Service Description"
              {...register("description", {
                required: "Service description is required",
                maxLength: {
                  value: maxCharacters,
                  message: `Description cannot exceed ${maxCharacters} characters`,
                },
                validate: {
                  minWords: (value) => {
                    const wordCount = value
                      .trim()
                      .split(/\s+/)
                      .filter(Boolean).length;
                    return (
                      wordCount >= 3 || "Description must be at least 3 words"
                    );
                  },
                },
              })}
            ></textarea>

            <span
              className={`block mt-2 text-sm ${
                description.length === maxCharacters
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {description.length}/{maxCharacters} characters
            </span>

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDescription;

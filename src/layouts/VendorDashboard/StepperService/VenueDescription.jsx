import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

const VenueDescription = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const maxCharacters = 500;
  const description = watch("venueDescription", "");

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setValue("venueDescription", e.target.value, { shouldDirty: true });
    }
  };

  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
            Step 08
          </p>
          <div>
            <h2 className="text-[#171717] dark:text-white font-bold lg:text-5xl text-3xl mt-5">
              Write a Venue Description!
            </h2>
            <p className="text-[#171717] dark:text-white mt-3 text-lg">
              Tell guests what makes your place unique - share the magic!
            </p>
          </div>
        </div>
        <div>
          <div>
            <label
              htmlFor="serviceTitle"
              className="text-[#202529] dark:text-white text-sm font-medium ml-4"
            >
              Venue Description Title
            </label>
            <input
              id="serviceTitle"
              type="text"
              className={`w-full shadow px-3 py-2 text-black rounded-lg border  ${
                errors.venueTitle ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Type here"
              {...register("venueTitle", { required: "Title is required" })}
            />
            {errors.venueTitle && (
              <p className="text-red-500 text-sm mt-1">
                {errors.venueTitle.message}
              </p>
            )}
          </div>

          {/* Venue Description Textarea */}
          <div className="mt-4">
            <textarea
              className={`w-full shadow px-3 py-2 text-black rounded-lg border focus-none ${
                errors.venueDescription ? "border-red-500" : "border-gray-300"
              }`}
              cols="10"
              rows="10"
              placeholder="Type here"
              aria-label="Service Description"
              {...register("venueDescription", {
                required: "Description is required",
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
              value={description}
              onChange={handleInputChange}
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

            {errors.venueDescription && (
              <p className="text-red-500 text-sm mt-1">
                {errors.venueDescription.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueDescription;

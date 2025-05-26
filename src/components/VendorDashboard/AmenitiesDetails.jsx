import { useGetAmenitiesQuery } from "@/api/apiSlice";
import { CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

export default function AmenitiesDetails() {
  const [isOpen, setIsOpen] = useState(true);

  const { data, isLoading } = useGetAmenitiesQuery();
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedAmenities = watch("venuesAmenities") || [];

  return (
    <div>
      <div
        className="bg-white dark:bg-gray-800 p-3 border border-gray-300 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {isOpen ? (
            <FaChevronDown className="text-lg me-2" />
          ) : (
            <FaChevronRight className="text-lg me-2" />
          )}
          <p className="text-lg font-semibold">Amenities Details</p>
        </div>
      </div>

      {isOpen && (
        <div className="p-3">
          {isLoading ? (
            <div className="flex justify-center items-center py-4">
              <CircularProgress size={30} />
            </div>
          ) : data?.data?.length > 0 ? (
            data.data.map((category) => (
              <div key={category._id} className="mb-3">
                <div className="border-b pb-2 font-medium text-gray-700 dark:text-white">
                  {category.name}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2">
                  {category.categories.map((option) => (
                    <div key={option._id} className="flex items-center p-2">
                      <input
                        className="size-5 min-w-5 me-3 accent-black"
                        type="checkbox"
                        id={`option-${option._id}`}
                        {...register("venuesAmenities")}
                        value={option._id}
                        checked={selectedAmenities.includes(option._id)}
                        onChange={(e) => {
                          const newSelected = e.target.checked
                            ? [...selectedAmenities, option._id]
                            : selectedAmenities.filter(
                                (id) => id !== option._id
                              );
                          setValue("venuesAmenities", newSelected, {
                            shouldDirty: true,
                          });
                        }}
                      />
                      <label
                        className="text-sm sm:text-base"
                        htmlFor={`option-${option._id}`}
                      >
                        {option.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm text-center py-4">
              No data available
            </p>
          )}
        </div>
      )}
    </div>
  );
}

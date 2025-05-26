import { useAmenitiesCreateMutation } from "@/api/apiSlice";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { toast } from "react-toastify";

const AddAmenities = ({ handleClose, currentAmenity }) => {
  const [name, setName] = useState("");
  const [amenityCreate, { isLoading }] = useAmenitiesCreateMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Amenity name is required!");
      return;
    }

    try {
      await amenityCreate({
        id: currentAmenity,
        data: { categoryName: name },
      }).unwrap();
      toast.success("Amenity added successfully!");
      setName("");
      handleClose();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add amenity");
    }
  };

  return (
    <div className="rounded-[20px] overflow-hidden shadow-[0px_0px_17px_0px_#ECECEC] dark:shadow-[0px_0px_17px_0px_#1E293B] bg-white dark:bg-[#1E293B]">
      <div className="flex items-center justify-between bg-[#E7E7E9] dark:bg-[#334155] p-5 border-b border-[#CDCDCD] dark:border-[#475569]">
        <p className="text-[#3551B6] dark:text-[#93C5FD] sm:text-[20px] font-semibold">
          Add Amenities
        </p>
        <button onClick={handleClose}>
          <IoCloseCircle className="text-[#979797] dark:text-[#CBD5E1] text-[28px]" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-h-[calc(100dvh-200px)] overflow-y-auto"
      >
        <div className="p-5">
          <label
            className="text-lg font-medium text-black dark:text-white"
            htmlFor="amenity-name"
          >
            Name
          </label>
          <input
            type="text"
            id="amenity-name"
            className="block w-full resize-none border p-3 rounded-[8px] border-[#D5D5D5] dark:border-[#475569] bg-white dark:bg-[#1E293B] text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-400 shadow-[0px_8px_24px_0px_#00000012] dark:shadow-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter amenity name"
          />
        </div>

        <div className="flex p-5 mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="font-medium text-white bg-black dark:bg-blue-600 py-3 px-10 rounded-[7px] ms-auto disabled:opacity-50"
          >
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAmenities;

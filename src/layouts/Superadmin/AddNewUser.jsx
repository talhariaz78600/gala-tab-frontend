import React, { useState } from "react";
import SmallImagePreview from "./SmallImagePreview";
import SelectUserPermissions from "../../components/adminDashboard/SelectUserPermissions";
import Launch from "../../assets/img/Launch-BuleIcon.png";
import Reservations from "../../assets/img/Reservations-BuleIcon.png";
import Operations from "../../assets/img/Operations-BuleIcon.png";
import Forecasting from "../../assets/img/Forecasting-BuleIcon.png";
import Taxes from "../../assets/img/Taxes-BuleIcon.png";
import { Link } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";

const vendorPermissions = [
  { label: "Launch Details", icon: Launch },
  { label: "Reservations", icon: Reservations },
  { label: "Operations", icon: Operations },
  { label: "Forecasting", icon: Forecasting },
  { label: "Taxes/Financials", icon: Taxes },
];
export default function AddNewUser() {
  const [images, setImages] = useState([null]);

  const Roles = ["Staff Admin", "Vendor Manager", "Staff", "Venue Manager"];

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const sanitizeId = (role) => role.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return (
    <form action="/admin-dashboard/User-Management">
      <div className="bg-[#F7F7F7] min-h-[calc(100vh-130px)] rounded-[20px] p-5 flex flex-col justify-between">
        <div>
          <div>
            <div className="flex items-center gap-2">
              <div>
                <Link to="/admin-dashboard/User-Management">
                  <IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" />
                </Link>
              </div>
              <p className="text-[24px] font-semibold">Create a New User</p>
            </div>
            <div className="flex items-end gap-4 max-w-300px flex-wrap">
              <div className="w-full max-w-[150px] mt-6 mx-auto sm:mx-0 rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]">
                {images.map((image, index) => (
                  <SmallImagePreview
                    key={index}
                    index={index}
                    image={image}
                    onImageChange={handleImageChange}
                    onRemove={removeImage}
                    inputId="VendorImage"
                  />
                ))}
              </div>
              <div className="mx-auto sm:ms-0">
                <label
                  className="text-white inline-block bg-black py-3 px-6 shadow:[0px_14px_24px_0px_#7C7C7C66] rounded-full text-xs leading-normal"
                  htmlFor="VendorImage"
                >
                  Upload Image
                </label>
              </div>
            </div>
          </div>
          <div className="grid xl:grid-cols-2 gap-4 mt-5 max-w-[1000px]">
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="pl-4 w-full text-lg font-medium text-[#202529]"
              >
                Email
              </label>
              <select
                className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                name=""
                id=""
              >
                <option value="Select here" selected hidden disabled>
                  Select here
                </option>
              </select>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-lg font-medium text-[#202529]">
              Role Additional Roles
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-x-12 gap-y-4 mt-4">
              {Roles.map((role) => {
                const sanitizedId = sanitizeId(role);
                return (
                  <div className="flex items-center gap-2" key={sanitizedId}>
                    <input
                      className="size-6 min-w-6 accent-black"
                      type="checkbox"
                      name="Roles"
                      id={sanitizedId}
                    />
                    <label
                      className="text-[14px] font-medium"
                      htmlFor={sanitizedId}
                    >
                      {role}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-8">
            <p className="text-[24px] font-semibold">User Permissions</p>
            <div className="mt-8 overflow-x-auto pb-3">
              <div className="min-w-[1000px]">
                <SelectUserPermissions
                  data={vendorPermissions}
                  heading="Vendor Manager"
                />
              </div>
            </div>
            <div className="mt-8 overflow-x-auto pb-3">
              <div className="min-w-[1000px]">
                <SelectUserPermissions
                  data={vendorPermissions}
                  heading="Venue Manage"
                />
              </div>
            </div>
            <div className="mt-8 overflow-x-auto pb-3">
              <div className="min-w-[1000px]">
                <SelectUserPermissions
                  data={vendorPermissions}
                  heading="Staff"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-12">
          <div>
            <Link
              to="/admin-dashboard/User-Management"
              className=" flex justify-center bg-[#E7E7E7] py-2 rounded-full px-6 border w-52"
            >
              Cancel
            </Link>
          </div>
          <div>
            <button className="text-white bg-black py-2 px-6 border w-52 rounded-full">
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

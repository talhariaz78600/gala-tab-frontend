import React, { useState } from "react";
import SmallImagePreview from "./SmallImagePreview";
import { Link, useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  useGetSelectCityListQuery,
  useGetSelectCountryListQuery,
  useVendorCreateMutation,
} from "@/api/apiSlice";
import { Controller, useForm } from "react-hook-form";

import { HiEye, HiEyeOff } from "react-icons/hi";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

import Select from "react-select";
import { toast } from "react-toastify";
import { handleFileUpload } from "@/lib/handleFileUpload";
import Loader from "@/components/loader/Loader";

export default function AddNewVendor() {
  const navigate = useNavigate();
  const { data: countriesData, isLoading: countryLoading } =
    useGetSelectCountryListQuery();
  const { data: citiesData, isLoading: cityLoading } =
    useGetSelectCityListQuery();
  const [images, setImages] = useState([null]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("token");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm({});

  const [createVendor, { isLoading: vendorLoading }] =
    useVendorCreateMutation();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Validate Profile Picture
      if (!data.profilePicture) {
        toast.error("Profile Picture is required");
        return;
      }

      const countryCodeMatch = data.contact?.match(/^\+(\d{1,2})/);
      if (countryCodeMatch) {
        data.countryCode = `+${countryCodeMatch[1]}`;
      }

      const file = data.profilePicture;
      let uploadedUrl = "";

      if (file && typeof file !== "string") {
        uploadedUrl = await handleFileUpload(
          file,
          setIsLoading,
          setUploadProgress,
          token
        );
      }

      data.profilePicture = uploadedUrl || currentUser?.profilePicture;

      const response = await createVendor(data).unwrap();

      if (response?.status === "success") {
        toast.success("Profile updated successfully");
        navigate(-1);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      if (error.data?.error && typeof error.data.error === "object") {
        Object.entries(error.data.error).forEach(([field, message]) => {
          if (field !== "Error" && field !== "MongoServerError") {
            setError(field, { type: "manual", message });
          }
        });
      }

      const errorMessage =
        error.data?.message ||
        error.data?.error?.Error ||
        error.error ||
        "Profile update failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
      setValue("profilePicture", file, {
        shouldDirty: true,
      });
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
    setValue("profilePicture", null, {
      shouldDirty: true,
    });
  };

  // console.log("errors", errors);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#F7F7F7] min-h-[calc(100vh-130px)] rounded-[20px] p-5 flex flex-col justify-between">
          <div>
            <div>
              <div className="flex items-center gap-2">
                <div className="">
                  <Link to={-1}>
                    <IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" />
                  </Link>
                </div>
                <p className="text-[24px] font-semibold">Create a New Vendor</p>
              </div>
              <div className="flex items-end gap-4 flex-wrap max-w-[300px]">
                <div className="w-full max-w-[150px] mt-6 mx-auto sm:mx-0 rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]">
                  {images?.map((image, index) => (
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
                    className="text-white inline-block bg-black py-3 px-6 shadow:[0px_14px_24px_0px_#7C7C7C66] rounded-full text-xs leading-normal cursor-pointer"
                    htmlFor="VendorImage"
                  >
                    Upload Image
                  </label>
                </div>
              </div>
            </div>
            <div className="grid xl:grid-cols-2 gap-4 mt-5">
              {/* First Name */}
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529]">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529]">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Type here"
                  className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Office Number */}
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529]">
                  Office Number
                </label>
                <Controller
                  name="officeContact"
                  control={control}
                  rules={{
                    required: "Office number is required",
                    validate: (value) =>
                      isValidPhoneNumber(value || "") ||
                      "Invalid office number",
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      defaultCountry="PK"
                      placeholder="Enter phone number"
                      className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                    />
                  )}
                />
                {errors.officeContact && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.officeContact.message}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529]">
                  Mobile Number
                </label>
                <Controller
                  name="contact"
                  control={control}
                  rules={{
                    required: "Mobile number is required",
                    validate: (value) =>
                      isValidPhoneNumber(value || "") ||
                      "Invalid mobile number",
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      defaultCountry="PK"
                      placeholder="Enter phone number"
                      className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                    />
                  )}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {/* Emergency Number */}
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529]">
                  Emergency Number
                </label>
                <Controller
                  name="emergencyContact"
                  control={control}
                  rules={{
                    required: "Emergency number is required",
                    validate: (value) =>
                      isValidPhoneNumber(value || "") ||
                      "Invalid emergency number",
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      defaultCountry="PK"
                      placeholder="Enter phone number"
                      className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                    />
                  )}
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} // Toggles between password and text
                    placeholder="Type your password"
                    className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  >
                    {showPassword ? (
                      <HiEyeOff size={24} />
                    ) : (
                      <HiEye size={24} />
                    )}
                  </span>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529]">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                  {...register("companyName", {
                    required: "Company name is required",
                  })}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm pl-4">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              {/* Mailing Address */}
              <div>
                <label
                  htmlFor="mailingAddress"
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                >
                  Mailing Address
                </label>
                <input
                  id="mailingAddress"
                  type="text"
                  placeholder="Type here"
                  className="bg-white shadow-lg rounded-lg py-3 px-4 w-full"
                  {...register("address.mailingAddress")}
                />
                {errors?.address?.mailingAddress && (
                  <p className="text-red-500 text-sm mt-1 pl-4">
                    {errors?.address?.mailingAddress?.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                  htmlFor="country"
                >
                  Country
                </label>

                <Controller
                  name="country"
                  control={control}
                  rules={{ required: "Country is required" }}
                  render={({ field }) => {
                    const options = countriesData?.data?.map((country) => ({
                      value: country.id,
                      label: country.country,
                    }));

                    const selectedOption = options?.find(
                      (option) => option.value === field.value
                    );

                    return (
                      <Select
                        {...field}
                        value={selectedOption || null}
                        options={options}
                        placeholder="Select a country"
                        classNamePrefix="react-select"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            height: 50,
                            borderRadius: "8px",
                            backgroundColor: "#ffff",
                            boxShadow: "0px 8px 24px 0px #00000012",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                        onChange={(selected) => field.onChange(selected?.value)} // only store id
                      />
                    );
                  }}
                />

                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                  htmlFor="city"
                >
                  City
                </label>

                <Controller
                  name="city"
                  control={control}
                  rules={{ required: "City is required" }}
                  render={({ field }) => {
                    const options = citiesData?.data?.map((city) => ({
                      value: city.id,
                      label: city.city,
                    }));

                    const selectedOption = options?.find(
                      (option) => option.value === field.value
                    );

                    return (
                      <Select
                        {...field}
                        value={selectedOption || null}
                        options={options}
                        placeholder="Select a city"
                        classNamePrefix="react-select"
                        styles={{
                          control: (provided) => ({
                            ...provided,
                            height: 50,
                            borderRadius: "8px",
                            backgroundColor: "#ffff",
                            boxShadow: "0px 8px 24px 0px #00000012",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                        onChange={(selected) => field.onChange(selected?.value)}
                      />
                    );
                  }}
                />

                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-12">
            <div>
              <Link
                to={-1}
                className="flex justify-center bg-[#E7E7E7] py-2 rounded-full px-6 border w-52"
              >
                Cancel
              </Link>
            </div>
            <div>
              <button
                type="submit"
                className="text-white bg-black py-2 px-6 border w-52 rounded-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
      <Loader
        loading={isLoading || countryLoading || cityLoading || vendorLoading}
      />
    </>
  );
}

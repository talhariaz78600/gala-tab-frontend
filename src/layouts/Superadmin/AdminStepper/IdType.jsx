import React, { useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useFormContext } from "react-hook-form";

const ID_OPTIONS = [
  { label: "Driver's License", value: "driver_license" },
  { label: "Passport", value: "passport" },
  { label: "Government Identity ID", value: "national_id" },
];

const IdType = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    trigger,
  } = useFormContext();

  const selectedLicense = watch("documentType");
  const selectedCountry = watch("country");

  const countries = countryList().getData();

  register("country", { required: "Select issuing country/region" });

  const handleSelectLicense = (value) => {
    setValue("documentType", value, {
      shouldDirty: true,
      shouldValidate: true,
    });
    trigger("documentType");
  };

  const handleCountryChange = (selectedOption) => {
    setValue("country", selectedOption?.value || "", {
      shouldDirty: true,
      shouldValidate: true,
    });
    trigger("country");
  };

  return (
    <div className="py-7 w-full">
      <h4 className="md:text-4xl text-3xl font-semibold text-center">
        Choose an ID type to add
      </h4>
      <p className="text-center mt-4">
        We’ll need you to add an official government ID.
        <br />
        This step helps make sure you’re really you.
      </p>

      <div className="sm:max-w-3xl mx-auto md:mt-12 mt-5">
        {/* Country/Region Select */}
        <div className="mb-6">
          <Select
            options={countries}
            value={countries.find((c) => c.value === selectedCountry)}
            onChange={handleCountryChange}
            placeholder="Select issuing country/region"
            className="react-select-container"
            classNamePrefix="react-select"
            styles={{
              control: (base, state) => ({
                ...base,
                minHeight: "50px", // Increase height
                borderColor: errors.country ? "red" : base.borderColor,
                boxShadow: state.isFocused ? "0 0 0 1px #000" : base.boxShadow,
              }),
            }}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              Select issuing country/region
            </p>
          )}
        </div>

        {/* ID Type Options */}
        <div>
          {ID_OPTIONS.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelectLicense(option.value)}
              className={`flex justify-between items-center border-b py-4 px-4 cursor-pointer ${
                selectedLicense === option.value ? "bg-gray-100" : ""
              }`}
            >
              <label htmlFor={option.value}>{option.label}</label>
              <input
                type="radio"
                id={option.value}
                {...register("documentType", {
                  required: "Document type is required",
                })}
                value={option.value}
                checked={selectedLicense === option.value}
                className="w-4 h-4 accent-black"
                onChange={() => handleSelectLicense(option.value)}
              />
            </div>
          ))}
          {errors.license && (
            <p className="text-red-500 text-sm mt-2 ps-2">
              {errors.license.message}
            </p>
          )}
        </div>

        {/* Note */}
        <div className="mt-4">
          <p className="bg-[#F7F7F7] py-4 px-4 text-center rounded-lg text-sm">
            Your ID will be handled according to our Privacy Policy and won’t be
            shared with others.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IdType;

import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateMeMutation } from "@/api/auth";
import Loader from "@/components/loader/Loader";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUser } from "@/store/authSlice";
import Select from "react-select";
import {
  useGetSelectCityListQuery,
  useGetSelectCountryListQuery,
} from "@/api/apiSlice";
import { useEffect, useState } from "react";
import SmallImagePreview from "@/layouts/Superadmin/SmallImagePreview";
import { handleFileUpload } from "@/lib/handleFileUpload";
import { profileSchema } from "@/components/User/EditProfile/profileSchema";

const EditProfileInformation = ({ mode = "edit" }) => {
  const [images, setImages] = useState([null]);
  const navigate = useNavigate();
  const { data: countriesData, isLoading: countryLoading } =
    useGetSelectCountryListQuery();
  const { data: citiesData, isLoading: cityLoading } =
    useGetSelectCityListQuery();
  const currentUser = useSelector((state) => state.auth.user);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");

  const [updateProfile, { isLoading: updatingProfile }] = useUpdateMeMutation();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isValid, isDirty },
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      officeContact: currentUser?.officeContact || "",
      officeCountryCode: currentUser?.officeCountryCode || "",
      contact: currentUser?.contact || "",
      countryCode: currentUser?.countryCode || "",
      emergencyContact: currentUser?.emergencyContact || "",
      emergencyCountryCode: currentUser?.emergencyCountryCode || "",
      companyName: currentUser?.companyName || "",
      country: currentUser?.country || "",
      city: currentUser?.city || "",
      address: {
        mailingAddress: currentUser?.address?.mailingAddress || "",
      },
    },
  });

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
      setValue("profilePicture", file);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const processPhoneNumber = (phoneValue, currentCountryCode) => {
        if (!phoneValue) return { number: "", countryCode: currentCountryCode };

        if (!isValidPhoneNumber(phoneValue, currentCountryCode)) {
          toast.error("Invalid phone number format");
          return null;
        }

        const phoneNumber = parsePhoneNumber(phoneValue, currentCountryCode);

        return {
          number: phoneNumber.number.replace(/\s+/g, ""),
          countryCode: `+${phoneNumber.countryCallingCode}`,
          countryName: phoneNumber.country,
        };
      };

      const contactData = processPhoneNumber(data.contact, data.countryCode);
      const officeContactData = processPhoneNumber(
        data.officeContact,
        data.officeCountryCode
      );
      const emergencyContactData = processPhoneNumber(
        data.emergencyContact,
        data.emergencyCountryCode
      );

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

      const payload = {
        ...data,
        contact: contactData.number,
        countryCode: contactData.countryCode,
        officeContact: officeContactData.number,
        officeCountryCode: officeContactData.countryCode,
        emergencyContact: emergencyContactData.number,
        emergencyCountryCode: emergencyContactData.countryCode,
        ...(data.contact?.number && { contact: undefined }),
        ...(data.officeContact?.number && { officeContact: undefined }),
        ...(data.emergencyContact?.number && { emergencyContact: undefined }),
      };

      console.log("Submitting payload:", payload);

      const response = await updateProfile(payload).unwrap();
      if (response?.data) {
        dispatch(updateUser(response?.data));
      }

      toast.success("Profile updated successfully");
      // navigate("/user-dashboard/user-profile");
    } catch (error) {
      console.error("Update error:", error);

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
      setIsLoading(false); // <-- Reset loading state here
    }
  };

  useEffect(() => {
    if (currentUser?.profilePicture) {
      setImages([currentUser.profilePicture]);
    }
  }, [currentUser]);

  return (
    <div className="h-full">
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2">
              <div>
                <Link to={-1}>
                  <IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" />
                </Link>
              </div>
              <h4 className="font-semibold text-[24px] text-[#000000]">
                Profile Information
              </h4>
            </div>

            <div className="flex items-end gap-4 flex-wrap">
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
                  className="text-white cursor-pointer bg-black py-3 px-6 shadow:[0px_14px_24px_0px_#7C7C7C66] rounded-full text-xs leading-normal"
                  htmlFor="VendorImage"
                >
                  Upload Image
                </label>
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-4 mt-5">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Type here"
                  className={`bg-white shadow-lg rounded-lg py-3 px-4 w-full ${
                    errors.firstName ? "border border-red-500" : ""
                  }`}
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "Minimum 2 characters",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1 pl-4">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Type here"
                  className={`bg-white shadow-lg rounded-lg py-3 px-4 w-full ${
                    errors.lastName ? "border border-red-500" : ""
                  }`}
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Minimum 2 characters",
                    },
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1 pl-4">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  readOnly
                  value={currentUser?.email}
                  placeholder="Type here"
                  className={`bg-white shadow-lg rounded-lg py-3 px-4 w-full ${
                    errors.email ? "border border-red-500" : ""
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 pl-4">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label
                  htmlFor="contact"
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                >
                  Mobile Number
                </label>
                <Controller
                  name="contact"
                  control={control}
                  rules={{
                    required: "Mobile number is required",
                    validate: (value) => {
                      if (!value) return "Mobile number is required";
                      return (
                        isValidPhoneNumber(value) || "Invalid phone number"
                      );
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      international
                      defaultCountry={
                        currentUser?.countryCode?.replace("+", "") || "US"
                      }
                      onChange={(value) => {
                        field.onChange(value);
                        if (!value) {
                          setError("contact", {
                            type: "required",
                            message: "Mobile number is required",
                          });
                        } else if (!isValidPhoneNumber(value)) {
                          setError("contact", {
                            type: "invalid",
                            message: "Invalid phone number",
                          });
                        } else {
                          clearErrors("contact");
                        }
                      }}
                      onBlur={() => {
                        if (!field.value) {
                          setError("contact", {
                            type: "required",
                            message: "Mobile number is required",
                          });
                        }
                      }}
                      className={`bg-white shadow-lg rounded-lg py-1 px-4 w-full ${
                        errors.contact ? "border border-red-500" : ""
                      }`}
                      placeholder="Enter mobile number"
                    />
                  )}
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1 pl-4">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              {/* Office Number */}
              <div>
                <label
                  htmlFor="officeContact"
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                >
                  Office Number
                </label>
                <Controller
                  name="officeContact"
                  control={control}
                  rules={{
                    validate: (value) =>
                      !value ||
                      isValidPhoneNumber(value) ||
                      "Invalid phone number",
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      international
                      defaultCountry={
                        currentUser?.officeCountryCode?.replace("+", "") || "US"
                      }
                      onChange={(value) => {
                        field.onChange(value);
                        if (value && !isValidPhoneNumber(value)) {
                          setError("officeContact", {
                            type: "invalid",
                            message: "Invalid phone number",
                          });
                        } else {
                          clearErrors("officeContact");
                        }
                      }}
                      className={`bg-white shadow-lg rounded-lg py-1 px-4 w-full ${
                        errors.officeContact ? "border border-red-500" : ""
                      }`}
                      placeholder="Enter office number"
                    />
                  )}
                />
                {errors.officeContact && (
                  <p className="text-red-500 text-sm mt-1 pl-4">
                    {errors.officeContact.message}
                  </p>
                )}
              </div>

              {/* Emergency Number */}
              <div>
                <label
                  htmlFor="emergencyContact"
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                >
                  Emergency Number
                </label>
                <Controller
                  name="emergencyContact"
                  control={control}
                  rules={{
                    validate: (value) =>
                      !value ||
                      isValidPhoneNumber(value) ||
                      "Invalid phone number",
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      international
                      defaultCountry={
                        currentUser?.emergencyCountryCode?.replace("+", "") ||
                        "US"
                      }
                      onChange={(value) => {
                        field.onChange(value);
                        if (value && !isValidPhoneNumber(value)) {
                          setError("emergencyContact", {
                            type: "invalid",
                            message: "Invalid phone number",
                          });
                        } else {
                          clearErrors("emergencyContact");
                        }
                      }}
                      className={`bg-white shadow-lg rounded-lg py-1 px-4 w-full ${
                        errors.emergencyContact ? "border border-red-500" : ""
                      }`}
                      placeholder="Enter emergency number"
                    />
                  )}
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 text-sm mt-1 pl-4">
                    {errors.emergencyContact.message}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="pl-4 w-full text-lg font-medium text-[#202529]"
                >
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  placeholder="Type here"
                  className={`bg-white shadow-lg rounded-lg py-3 px-4 w-full ${
                    errors.companyName ? "border border-red-500" : ""
                  }`}
                  {...register("companyName")}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1 pl-4">
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

          {/* Action Buttons */}
          <div className="grid lg:grid-cols-2 max-w-[500px] gap-3 mt-12">
            <button
              type="button"
              onClick={() => reset()}
              className="bg-[#E7E7E7] py-2 rounded-full px-6 border"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updatingProfile}
              className={`text-white py-2 px-6 border rounded-full ${
                updatingProfile ? "bg-gray-400 cursor-not-allowed" : "bg-black"
              }`}
            >
              {updatingProfile ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
      <Loader loading={updatingProfile || isLoading} />
    </div>
  );
};

export default EditProfileInformation;

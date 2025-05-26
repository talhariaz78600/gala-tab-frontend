import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import GoogleImg from "../../../assets/img/google.png";
import FacebookImg from "../../../assets/img/facebook.png";
import { Controller, useForm } from "react-hook-form";
import {
  useGetSelectCityListQuery,
  useGetSelectCountryListQuery,
  useRegisterAdminMutation,
} from "../../../api/apiSlice";
import { toast } from "react-toastify";
import Loader from "../../../components/loader/Loader";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { parsePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import { Eye, EyeOff } from "lucide-react";
import Select from "react-select";
import { useContext } from "react";
import { ThemeContext } from "@/components/ThemeProvider";

const SignUp = () => {
  const { data: countriesData, isLoading: countryLoading } =
    useGetSelectCountryListQuery();
  const { data: citiesData, isLoading: cityLoading } =
    useGetSelectCityListQuery();
  const [registerAdmin, { isLoading }] = useRegisterAdminMutation();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countrySelect, setCountrySelect] = useState("");

  const [phoneValue, setPhoneValue] = useState();
  const location = useLocation();
  const { role } = location.state;
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  register("contact", {
    validate: (value) => {
      if (!value) return "Phone number is required";
      if (!isValidPhoneNumber(value))
        return "Please enter a valid phone number";
      return true;
    },
  });

  const handleCheckboxChange = (e) => {
    setTermsAccepted(e.target.checked);
  };
  const onSubmit = async (data) => {
    setFormSubmitted(true);

    if (!termsAccepted) {
      return toast.error("You must accept the terms first.");
    }

    if (!isValidPhoneNumber(phoneValue)) {
      setError("contact", {
        type: "invalid",
        message: "Invalid phone number format",
      });
      return;
    }

    try {
      const phoneNumber = parsePhoneNumber(phoneValue);
      const payload = {
        ...data,
        role,
        countryCode: `+${phoneNumber.countryCallingCode}`,
        countryName: phoneNumber.country,
        contact: phoneNumber.formatInternational().replace(/\s+/g, ""),
        providers: ["local"],
      };
      delete payload.confirmPassword;

      const response = await registerAdmin(payload).unwrap();

      if (response.status === "success") {
        toast.success(response.message || "Signup successful!");
        navigate("/auth/welcome/verification", {
          state: {
            email: data?.email,
            type: "signup",
            contact: payload.contact,
          },
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
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
        " failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  console.log("role:", role);

  return (
    <>
      <div className="py-5 ">
        <div className="flex flex-col items-center justify-center w-full h-full max-w-screen-lg mx-auto px-5 ">
          <div className="w-full border rounded-xl shadow-xl dark:bg-gray-800">
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h2 className="font-semibold sm:text-2xl text-lg">
                  Welcome To Gala Tab!
                </h2>
              </div>
              <div onClick={() => navigate("/")} className="cursor-pointer">
                <IoCloseCircle className="text-3xl text-slate-400" />
              </div>
            </div>
            <div className="flex items-center justify-center my-5">
              <div className="pl-3">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Gala Tab
                </h2>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="max-w-4xl mx-auto p-4">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-base font-normal" htmlFor="">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF] text-black"
                      placeholder="Enter First Name"
                      {...register("firstName", {
                        required: "First name is required",
                        shouldDirty: true,
                      })}
                      onBlur={(e) => {
                        // Additional validation on blur for better UX
                        if (!e.target.value) {
                          setError("firstName", {
                            type: "required",
                            message: "First Name is required",
                          });
                        }
                      }}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.firstName?.message}
                    </p>
                  </div>
                  <div>
                    <label className="text-base font-normal" htmlFor="">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF] text-black"
                      placeholder="Enter Last Name"
                      {...register("lastName", {
                        required: "Last name is required",
                        shouldDirty: true,
                      })}
                      onBlur={(e) => {
                        // Additional validation on blur for better UX
                        if (!e.target.value) {
                          setError("lastName", {
                            type: "required",
                            message: "Last Name is required",
                          });
                        }
                      }}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.lastName?.message}
                    </p>
                  </div>
                  <div>
                    <label className="text-base font-normal" htmlFor="">
                      Phone Number
                    </label>
                    <PhoneInput
                      international
                      placeholder="Enter phone number"
                      value={phoneValue}
                      onChange={(value) => {
                        setPhoneValue(value);
                        setValue("contact", value, { shouldValidate: true });
                        trigger("contact");
                      }}
                      onBlur={() => {
                        trigger("contact");
                      }}
                      className="border w-full rounded-lg p-2 bg-[#F7FBFF] border-gray-200 text-black"
                    />

                    {errors.contact && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.contact.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-base font-normal" htmlFor="">
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF] text-black"
                      placeholder="Enter Email Here"
                      {...register("email", {
                        required: "Email is required",
                        shouldDirty: true,
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Invalid email format",
                        },
                      })}
                      onBlur={(e) => {
                        // Additional validation on blur for better UX
                        if (!e.target.value) {
                          setError("email", {
                            type: "required",
                            message: "Email is required",
                          });
                        }
                      }}
                    />
                    <p className="text-red-500 text-sm">
                      {errors.email?.message}
                    </p>
                  </div>
                  <div>
                    <label className="text-base font-normal">Password</label>
                    <div className="relative w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF] text-black"
                        placeholder="Enter Password Here"
                        {...register("password", {
                          required: "Password is required",
                          shouldDirty: true,
                          minLength: {
                            value: 6,
                            message: "Minimum 6 characters",
                          },
                        })}
                        onBlur={(e) => {
                          // Additional validation on blur for better UX
                          if (!e.target.value) {
                            setError("password", {
                              type: "required",
                              message: "Password is required",
                            });
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    <p className="text-red-500 text-sm">
                      {errors.password?.message}
                    </p>
                  </div>
                  <div>
                    <label className="text-base font-normal">
                      Re-Enter Password
                    </label>
                    <div className="relative w-full">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="border-gray-200 border w-full rounded-lg p-2 bg-[#F7FBFF] text-black"
                        placeholder="Re-Enter Password"
                        {...register("confirmPassword", {
                          shouldDirty: true,
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                        onBlur={(e) => {
                          // Additional validation on blur for better UX
                          if (!e.target.value) {
                            setError("confirmPassword", {
                              type: "required",
                              message: "Confirm your Password",
                            });
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-base font-normal" htmlFor="country">
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
                                height: 40,
                                borderRadius: "8px",
                                backgroundColor: "#F7FBFF",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                backgroundColor: isDark ? "#374151" : "white",
                                borderRadius: 10,
                                boxShadow: "0px 8px 24px 0px #00000033",
                              }),
                              option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused
                                  ? isDark
                                    ? "#2563EB"
                                    : "#000"
                                  : isDark
                                  ? "#374151"
                                  : "white",
                                color: state.isFocused
                                  ? "white"
                                  : isDark
                                  ? "white"
                                  : "black",
                                cursor: "pointer",
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                            }}
                            onChange={(selected) => {
                              field.onChange(selected?.value);
                              setCountrySelect(selected?.label || "");
                            }}
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
                    <label className="text-base font-normal" htmlFor="city">
                      City
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: "City is required" }}
                      render={({ field }) => {
                        const filteredCities = citiesData?.data?.filter(
                          (city) =>
                            city.country?.toLowerCase() ===
                            countrySelect?.toLowerCase()
                        );

                        const options = filteredCities?.map((city) => ({
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
                            placeholder={
                              filteredCities?.length
                                ? "Select a city"
                                : "No cities for selected country"
                            }
                            isDisabled={!filteredCities?.length}
                            classNamePrefix="react-select"
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                height: 40,
                                borderRadius: "8px",
                                backgroundColor: "#F7FBFF",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                backgroundColor: isDark ? "#374151" : "white",
                                borderRadius: 10,
                                boxShadow: "0px 8px 24px 0px #00000033",
                              }),
                              option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isFocused
                                  ? isDark
                                    ? "#2563EB"
                                    : "#000"
                                  : isDark
                                  ? "#374151"
                                  : "white",
                                color: state.isFocused
                                  ? "white"
                                  : isDark
                                  ? "white"
                                  : "black",
                                cursor: "pointer",
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                            }}
                            onChange={(selected) =>
                              field.onChange(selected?.value)
                            }
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
                <p className="text-sm text-gray-600 dark:text-white mt-4">
                  Only countries and cities where we operate are listed. Please
                  select from the available options.
                </p>
                <div className="flex items-center mt-5">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-gray-900 rounded-lg"
                    onChange={handleCheckboxChange}
                    checked={termsAccepted}
                  />
                  <label className="ms-2 text-sm font-medium">
                    I agree to the Terms of Service and Privacy Policy.
                  </label>
                </div>

                {formSubmitted && !termsAccepted && (
                  <p className="text-red-500 text-sm mt-2">
                    You must accept the terms.
                  </p>
                )}

                <div className="mt-9 max-w-screen-sm mx-auto sm:px-14">
                  <button
                    disabled={isLoading}
                    type="submit"
                    className="font-medium text-white bg-[#1C1C1C] text-xl drop-shadow-[0px 16px 24px 0px #00000033;] w-full block text-center py-3 rounded-lg"
                  >
                    {isLoading ? "Signing up..." : "Signup"}
                  </button>
                </div>
              </div>
            </form>
            <div className="grid md:grid-cols-3 xs:grid-cols-6 gap-4 px-9">
              <div className="md:col-start-2 md:col-span-1 xs:col-start-2 xs:col-span-4">
                <button
                  onClick={() =>
                    window.open(
                      `${
                        import.meta.env.VITE_BACKEND_BASE_URL
                      }/auth/login/withGoogle?role=${role}`,
                      "_blank"
                    )
                  }
                  className="flex items-center bg-[#F7FBFF] text-black px-4 justify-center border py-2 rounded-lg w-full"
                  aria-label="Sign in with Google"
                >
                  <img src={GoogleImg} alt="Google" />
                  <p className="ms-2">Sign Up with Google</p>
                </button>
              </div>

              <div className="md:col-start-2 md:col-span-1 xs:col-start-2 xs:col-span-4">
                <button
                  onClick={() =>
                    window.open(
                      `${
                        import.meta.env.VITE_BACKEND_BASE_URL
                      }/auth/login/withFacebook?role=${role}`,
                      "_blank"
                    )
                  }
                  className="flex items-center justify-center bg-[#F7FBFF] text-black px-4 border py-2 rounded-lg w-full"
                  aria-label="Sign in with Facebook"
                >
                  <img src={FacebookImg} alt="Facebook" />
                  <p className="ms-2 text-base font-normal">
                    Sign Up with Facebook
                  </p>
                </button>
              </div>
            </div>

            <div className="py-4 bg-[#E7E7E9] dark:bg-gray-800 rounded-b-lg mt-3">
              <p className="text-center font-medium sm:text-lg text-sm">
                Don't you have an account?{" "}
                <Link to="/auth/welcome/login" className="text-[#5669FF]">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Loader loading={isLoading || countryLoading || cityLoading} />
    </>
  );
};

export default SignUp;

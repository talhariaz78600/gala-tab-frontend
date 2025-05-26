import React, { useEffect, useState } from "react";
import SmallImagePreview from "./SmallImagePreview";
import { Link, useLocation, useNavigate } from "react-router";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  ListItemText,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { RiCloseCircleFill } from "react-icons/ri";
import {
  useGetSelectTemplateListQuery,
  useGetTaskTemplateSelectListQuery,
  useSubAdminCreateMutation,
  useSubAdminUpdateMutation,
} from "@/api/apiSlice";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { handleFileUpload } from "@/lib/handleFileUpload";
import Loader from "@/components/loader/Loader";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";

export default function AddNewSubAdmin({ mode = "new" }) {
  const location = useLocation();
  const { data: user } = location.state || { data: null };

  const {
    register,
    setValue,
    setError,
    clearErrors,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues:
      {
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        contact: user?.contact,
        templateId: user?.templateId?._id,
        profilePicture: user?.profilePicture,
      } || {},
  });

  const navigate = useNavigate();
  const [images, setImages] = useState([null]);
  const { data, isLoading: optionLoading } = useGetSelectTemplateListQuery();
  const { data: taskData, isLoading: taskOptionLoading } =
    useGetTaskTemplateSelectListQuery();
  const [showPassword, setShowPassword] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneValue, setPhoneValue] = useState();
  const token = localStorage.getItem("token");
  const [selectedTaskTemplates, setSelectedTaskTemplates] = useState([]);
  const [imageError, setImageError] = useState("");
  const [taskTemplateError, setTaskTemplateError] = useState("");

  const handleTemplateChangeTask = (event) => {
    console.log(event.target.value);
    setSelectedTaskTemplates(event.target.value);
  };

  const [subAdminCreate, { isLoading: subAdminLoading }] =
    useSubAdminCreateMutation();

  const [subAdminUpdate, { isLoading: subAdminUpdating }] =
    useSubAdminUpdateMutation();

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
      setValue("profilePicture", file, { shouldDirty: true });
    }
  };

  const handleTemplateChange = (event) => {
    const selectedId = event.target.value;
    setValue("templateId", selectedId);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
    setValue("profilePicture", null, {
      shouldDirty: true,
    });
  };

  const onSubmit = async (formData) => {
    console.log("formData", images);

    if (images[0] === null || images[0] === undefined || images[0] === "") {
      setImageError("Please upload an image.");
      return;
    }
    setImageError("");

    if (selectedTaskTemplates.length === 0) {
      setTaskTemplateError("Please select at least one task template.");
      return;
    }
    setTaskTemplateError("");

    try {
      setIsLoading(true);
      clearErrors();

      if (!isValidPhoneNumber(phoneValue)) {
        setError("contact", {
          type: "invalid",
          message: "Invalid phone number format",
        });
        setIsLoading(false);
        return;
      }

      const file = formData.profilePicture;
      let uploadedUrl = "";

      if (file && typeof file !== "string") {
        uploadedUrl = await handleFileUpload(
          file,
          setIsLoading,
          setUploadProgress,
          token
        );
      }

      const phoneNumber = parsePhoneNumber(phoneValue);

      const finalPayload = {
        ...formData,
        countryCode: `+${phoneNumber.countryCallingCode}`,
        countryName: phoneNumber.country,
        contact: phoneNumber.formatInternational().replace(/\s+/g, ""),
        profilePicture: uploadedUrl || user?.profilePicture,
        tasks: selectedTaskTemplates,
      };

      const response =
        mode === "new"
          ? await subAdminCreate(finalPayload).unwrap()
          : await subAdminUpdate({
              id: user._id,
              data: finalPayload,
            }).unwrap();

      if (response.status === "success") {
        toast.success(response.message);
        navigate(-1);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Submission error:", error);

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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user?.contact) {
      setPhoneValue(user.contact);
    }
    if (user?.profilePicture) {
      setImages([user.profilePicture]);
    }
    if (user?.tasks) {
      setSelectedTaskTemplates(user.tasks);
    }
  }, [user]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-[#F7F7F7] dark:bg-[#1E1E1E] min-h-[calc(100vh-130px)] rounded-[20px] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div>
                <Link to={-1}>
                  <IoMdArrowRoundBack className="bg-white text-black p-2 shadow-sm rounded-full text-4xl" />
                </Link>
              </div>
              <p className="text-[24px] font-semibold">
                {mode === "new" ? "Add New" : "Edit"} Sub Admin
              </p>
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
            {errors.profilePicture && (
              <p className="text-red-500 text-sm pl-4 mt-3">
                {errors.profilePicture.message}
              </p>
            )}
            {imageError && (
              <p className="text-red-500 text-sm pl-4 mt-3">{imageError}</p>
            )}

            <div className="grid xl:grid-cols-2 gap-4 mt-9">
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529] dark:text-white">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="bg-white text-black shadow-lg rounded-lg py-3 px-4 w-full"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm pl-4 mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529] dark:text-white">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="bg-white text-black shadow-lg rounded-lg py-3 px-4 w-full"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm pl-4 mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="pl-4 w-full text-lg font-medium text-[#202529] dark:text-white"
                  htmlFor=""
                >
                  Phone Number
                </label>
                <PhoneInput
                  international
                  placeholder="Enter phone number"
                  value={phoneValue}
                  onChange={(value) => {
                    setPhoneValue(value);

                    if (!value) {
                      setError("contact", {
                        type: "required",
                        message: "Phone number is required",
                      });
                      return;
                    }

                    if (!isValidPhoneNumber(value)) {
                      setError("contact", {
                        type: "invalid",
                        message: "Please enter a valid phone number",
                      });
                    } else {
                      clearErrors("contact");
                    }
                  }}
                  onBlur={() => {
                    if (!phoneValue) {
                      setError("contact", {
                        type: "required",
                        message: "Phone number is required",
                      });
                    }
                  }}
                  className={
                    "border w-full rounded-lg p-2 py-3 text-black bg-[#ffff] border-none shadow-lg"
                  }
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact.message}
                  </p>
                )}
              </div>

              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529] dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  readOnly={mode === "edit"}
                  placeholder="Type here"
                  className="bg-white shadow-lg text-black rounded-lg py-3 px-4 w-full"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm pl-4 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {mode !== "edit" && (
                <div>
                  <label className="pl-4 w-full text-lg font-medium text-[#202529] dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Type here"
                      className="bg-white shadow-lg text-black rounded-lg py-3 px-4 w-full pr-10"
                      {...register(
                        "password",
                        mode !== "edit"
                          ? {
                              required: "Password is required",
                              minLength: {
                                value: 6,
                                message:
                                  "Password must be at least 6 characters",
                              },
                            }
                          : {}
                      )}
                    />
                    <span
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-600 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible />
                      ) : (
                        <AiOutlineEye />
                      )}
                    </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm pl-4 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529] dark:text-white">
                  Select Permission Template
                </label>
                <FormControl fullWidth>
                  <Select
                    onChange={handleTemplateChange}
                    displayEmpty
                    className="bg-white py-2 px-3 text-black   rounded-lg shadow-lg"
                    variant="standard"
                    disableUnderline
                    fullWidth
                    defaultValue={user?.templateId?._id || ""}
                    sx={{ color: "black" }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          borderRadius: 10,
                          overflowY: "auto",
                        },
                      },
                    }}
                    {...register("templateId", {
                      required: "Template selection is required",
                    })}
                    disabled={optionLoading}
                  >
                    <MenuItem value="" disabled>
                      Select Permission Template
                    </MenuItem>
                    {optionLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} />
                        <span className="ml-2">Loading...</span>
                      </MenuItem>
                    ) : (
                      data?.templates?.map((template) => (
                        <MenuItem key={template._id} value={template._id}>
                          {template.templateName}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {errors.templateId && (
                  <p className="text-red-500 text-sm pl-4 mt-1">
                    {errors.templateId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="pl-4 w-full text-lg font-medium text-[#202529] dark:text-white">
                  Select Task Templates
                </label>
                <FormControl fullWidth>
                  <Select
                    multiple
                    onChange={handleTemplateChangeTask}
                    displayEmpty
                    className="bg-white py-2 px-3 rounded-lg shadow-lg"
                    variant="standard"
                    disableUnderline
                    fullWidth
                    value={selectedTaskTemplates || []}
                    renderValue={(selected) => (
                      <div className="flex flex-wrap gap-2">
                        {selected?.map((value) => {
                          const template = taskData?.templates?.find(
                            (t) => t._id === value
                          );
                          return template ? (
                            <Chip
                              sx={{ backgroundColor: "#000", color: "#fff" }}
                              key={value}
                              label={template.templateName}
                              size="small"
                            />
                          ) : null;
                        })}
                      </div>
                    )}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 200,
                          borderRadius: 10,
                          overflowY: "auto",
                        },
                      },
                    }}
                    disabled={optionLoading}
                  >
                    <MenuItem value="" disabled>
                      Select Task Templates
                    </MenuItem>
                    {optionLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={20} />
                        <span className="ml-2">Loading...</span>
                      </MenuItem>
                    ) : (
                      taskData?.templates?.map((template) => (
                        <MenuItem key={template._id} value={template._id}>
                          <Checkbox
                            sx={{
                              color: "#000",
                              "&.Mui-checked": { color: "#000" },
                            }}
                            checked={selectedTaskTemplates.includes(
                              template._id
                            )}
                          />
                          <ListItemText primary={template.templateName} />
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
                {taskTemplateError && (
                  <p className="text-red-500 text-sm pl-4 mt-3">
                    {taskTemplateError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-12">
            <div>
              <button
                to={-1}
                className="flex justify-center bg-[#E7E7E7] text-black  py-2 rounded-full px-6 border w-52"
              >
                Cancel
              </button>
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
      <Loader loading={isLoading || subAdminLoading || subAdminUpdating} />
    </>
  );
}

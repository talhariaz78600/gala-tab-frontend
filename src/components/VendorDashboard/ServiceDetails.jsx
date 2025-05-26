import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import edit from "../../assets/img/edit-icon.png";
import { IoMdAdd } from "react-icons/io";
import ImgPreviewBox from "./ImgPreviewBox";
import fileEditIcon from "../../assets/img/fileediticon.png";
import { BiSolidPlusCircle, BiSolidMinusCircle } from "react-icons/bi";
import sendIcongreen from "../../assets/img/sendIcongreen.png";
import SearchIconBlue from "../../assets/img/SearchIconBlue.png";
import AmenitiesDetails from "./AmenitiesDetails";
import ServicesAvailability from "./ServicesAvailability";
import down from "../../assets/img/down.png";
import { IoCloseCircle, IoPencil } from "react-icons/io5";
import RulesRegulation from "./RulesRegulation";
import {
  useGetServiceDetailsQuery,
  useGetServiceTypeQuery,
  useServiceUpdateMutation,
} from "@/api/apiSlice";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import {
  CircularProgress,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  styled,
  Typography,
  Dialog,
} from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";
import { handleStep4Upload } from "@/lib/handleStep4Upload";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": { padding: theme.spacing(2) },
  "& .MuiDialogActions-root": { padding: theme.spacing(1) },
}));

const statusOptions = [
  { value: "Available", label: "Available" },
  { value: "Booked", label: "Booked" },
  { value: "Inactive", label: "In-Active" },
];

export default function ServiceDetails() {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state.auth.user);
  const { data: currentService, isLoading: isServiceLoading } =
    useGetServiceDetailsQuery(id, {
      skip: !id,
    });

  const methods = useForm({ values: currentService?.data });
  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    watch,
    clearErrors,
    getValues,
    formState: { errors },
  } = methods;

  const { dirtyFields } = useFormState({ control });

  const { data, isLoading: isServiceTypeLoading } = useGetServiceTypeQuery();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isTitleEditable, setIsTitleEditable] = useState(false);
  const [isDescEditable, setIsDescEditable] = useState(false);

  const uploadedFiles = watch("media") || [];

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files).map((file, index) => ({
      url: file,

      cover: uploadedFiles.length === 0 && index === 0,
    }));

    const updatedFiles = [...uploadedFiles, ...newFiles];
    setValue("media", updatedFiles, { shouldDirty: true });
  };

  const handleDelete = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index);

    // Ensure at least one file has cover: true
    if (updatedFiles.length > 0 && !updatedFiles.some((f) => f.cover)) {
      updatedFiles[0].cover = true;
    }

    setValue("media", updatedFiles, { shouldDirty: true });
  };
  const handleMakeCover = (index) => {
    const updatedFiles = uploadedFiles.map((item, i) => ({
      ...item,
      cover: i === index,
    }));

    setValue("media", updatedFiles, { shouldDirty: true });
  };

  const handleTitleEditClick = () => {
    setIsTitleEditable(true);
  };

  const handleTitleBlur = () => {
    setIsTitleEditable(false);
  };

  const handleDescEditClick = () => {
    setIsDescEditable(true);
  };

  const handleDescBlur = () => {
    setIsDescEditable(false);
  };

  const noOfCapacity = watch("noOfCapacity");
  const noOfRestrooms = watch("noOfRestrooms");

  // Capacity Handlers
  const handleCapacityDecrease = () => {
    setValue("noOfCapacity", Math.max(0, noOfCapacity - 1));
  };

  const handleCapacityIncrease = () => {
    setValue("noOfCapacity", noOfCapacity + 1);
  };

  const handleCapacityChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setValue("noOfCapacity", Number(value));
    }
  };

  // Restrooms Handlers
  const handleRestRoomsDecrease = () => {
    setValue("noOfRestrooms", Math.max(0, noOfRestrooms - 1));
  };

  const handleRestRoomsIncrease = () => {
    setValue("noOfRestrooms", noOfRestrooms + 1);
  };

  const handleRestRoomsChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setValue("noOfRestrooms", Number(value));
    }
  };

  const location = useLocation();

  const getFormAction = () => {
    if (location.pathname === "/admin-dashboard/service-detail") {
      return "/admin-dashboard/service-management";
    } else if (location.pathname === "/vendor-dashboard/services") {
      return "/vendor-dashboard/service-listing";
    }
    return "#";
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const selectedServiceTypeId = watch("serviceTypeId");
  const [autocomplete, setAutocomplete] = useState(null);

  const updateLocation = (formattedAddress, lat, lng, addressComponents) => {
    const getAddressComponent = (type) =>
      addressComponents?.find((component) => component.types.includes(type))
        ?.long_name;

    const locationData = {
      address: formattedAddress,
      city: getAddressComponent("locality") || "Unknown",
      state: getAddressComponent("administrative_area_level_1") || "",
      country: getAddressComponent("country") || "",
      postalCode: getAddressComponent("postal_code") || "N/A",
      latitude: lat,
      longitude: lng,
    };

    setValue("location", locationData, { shouldDirty: true });
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
            import.meta.env.VITE_GOOGLE_MAP_API_KEY
          }`;

          try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.status === "OK" && data.results.length > 0) {
              updateLocation(
                data.results[0].formatted_address,
                latitude,
                longitude,
                data.results[0].address_components
              );
            } else {
              alert(`Failed to fetch address details: ${data.status}`);
            }
          } catch (error) {
            console.error("Error fetching location details:", error);
            alert(
              "Error fetching location details. Check the console for details."
            );
          }
        },
        () => alert("Unable to retrieve your location.")
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (!place.geometry) return;

      updateLocation(
        place.formatted_address,
        place.geometry.location.lat(),
        place.geometry.location.lng(),
        place.address_components
      );
    }
  };

  const [serviceUpdate, { isLoading: isServiceUpdateLoading }] =
    useServiceUpdateMutation();

  const onSubmit = async (data) => {
    try {
      let patchData = Object.keys(dirtyFields).reduce((acc, field) => {
        acc[field] = data[field];
        return acc;
      }, {});

      // Check for new media (files that don't have an _id)
      const newMedia = data.media?.filter((item) => !item._id) || [];
      console.log("New media files to upload:", newMedia);

      if (newMedia.length > 0) {
        setIsLoading(true);

        try {
          const uploadedMediaData = await handleStep4Upload(
            newMedia,
            setIsLoading,
            setUploadProgress,
            token
          );

          patchData.media = [
            ...(data.media?.filter((item) => item._id) || []),
            ...uploadedMediaData.media,
          ];
        } catch (error) {
          console.error("Error uploading media:", error);
          toast.error("Failed to upload media. Please try again.");
        } finally {
          setIsLoading(false);
        }
      } else {
        patchData.media = [...(data.media || [])];
      }

      // Only update if there are changes
      if (Object.keys(patchData).length > 0) {
        try {
          await serviceUpdate({
            id,
            data: patchData,
          }).unwrap();

          toast.success("Data updated successfully!");
          if (user?.role === "vendor") {
            navigate("/vendor-dashboard/service-listing");
          } else {
            navigate("/admin-dashboard/service-management");
          }
          console.log("Update successful");
        } catch (error) {
          console.error("Error updating data:", error);
          toast.error("Failed to update data. Please try again.");
        }
      } else {
        console.log("No changes detected. Skipping update.");
        toast.info("No changes detected.");
      }
    } catch (error) {
      console.error("Unexpected error in onSubmit:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <div>
          <div className="flex flex-wrap gap-5 justify-end">
            <div className="flex items-center">
              <p className="text-lg font-medium text-[#202529] dark:text-white me-1">
                Status:
              </p>
              <select
                {...register("status", {
                  onChange: () =>
                    setValue("status", getValues("status"), {
                      shouldDirty: true,
                    }),
                })}
                className="text-lg font-medium px-2 py-1 border rounded-md focus:outline-none 
               bg-white text-black border-gray-300 
               dark:bg-[#1f2937] dark:text-white dark:border-gray-600"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-[#F7F7F7] dark:bg-[#1f2937] p-4 mt-6 rounded-[20px]">
            <form action={getFormAction()}>
              <div className="bg-black shadow-[0px_14px_34px_0px_#00000014] p-4 rounded-[10px]">
                <h3 className="font-semibold text-white text-lg">
                  Add Service Details
                </h3>
              </div>

              <h5 className="text-[17px] font-semibold leading-normal mt-3">
                Portfolio Photos
              </h5>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3 max-w-[1500px]">
                {uploadedFiles.map((image, index) => (
                  <ImgPreviewBox
                    key={index}
                    index={index}
                    image={image instanceof File ? image : image.url} // Handle File or URL
                    type={
                      image.type ||
                      (image instanceof File
                        ? image.type.split("/")[0]
                        : "image")
                    } // Determine type dynamically
                    isCover={image.cover}
                    onRemove={() => handleDelete(index)}
                    handleMakeCover={handleMakeCover}
                  />
                ))}

                {/* Upload Box */}
                <ImgPreviewBox onImageChange={handleFileChange} />
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mt-10 max-w-[1000px]">
                {/* Service Name */}
                <div>
                  <label
                    className="text-lg font-semibold"
                    htmlFor="ServiceName"
                  >
                    Service Name
                  </label>
                  <input
                    {...register("title", { required: "Title is required" })}
                    className="block w-full sm:p-4 p-3 border border-[#D5D5D5] text-black rounded-[5px] shadow-[0px_8px_24px_0px_#00000012]"
                    placeholder="Type service title here"
                    type="text"
                    id="ServiceName"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Service Type */}
                <div>
                  <label
                    className="text-lg font-semibold"
                    htmlFor="ServiceType"
                  >
                    Select Service Type
                  </label>
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={!!errors.serviceTypeId}
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      boxShadow: "0px 8px 24px 0px rgba(0, 0, 0, 0.12)",
                    }}
                  >
                    <Select
                      displayEmpty
                      {...register("serviceTypeId", {
                        required: "Service type is required",
                      })}
                      value={selectedServiceTypeId || ""}
                      onChange={(e) =>
                        setValue("serviceTypeId", e.target.value, {
                          shouldDirty: true,
                        })
                      }
                      sx={{
                        backgroundImage: `url(${down})`,
                        backgroundPosition: "calc(100% - 10px) center",
                        backgroundRepeat: "no-repeat",
                        color: "black",
                      }}
                    >
                      {isServiceTypeLoading ? (
                        <MenuItem disabled>
                          <CircularProgress size={24} />
                        </MenuItem>
                      ) : data?.data?.length > 0 ? (
                        data.data.map((service) => (
                          <MenuItem
                            key={service._id}
                            value={service._id}
                            sx={{ display: "flex", gap: "8px" }}
                          >
                            <span>{service.name}</span>
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem
                          disabled
                          className="text-gray-500 text-sm text-center py-2"
                        >
                          No data available
                        </MenuItem>
                      )}
                    </Select>
                    {errors.serviceTypeId && (
                      <FormHelperText>
                        {errors.serviceTypeId.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                </div>
              </div>

              <div className="mt-8 max-w-[800px]">
                <h3 className="text-[24px] leading-normal font-semibold">
                  Description
                </h3>

                {/* Title */}
                <div className="mt-3">
                  <label
                    className="text-lg font-semibold ps-3"
                    htmlFor="ServiceTitle"
                  >
                    Title
                  </label>
                  <div className="flex items-center sm:p-4 p-3 border bg-white border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]">
                    <input
                      {...register("title", { required: "Title is required" })}
                      className="block w-full focus:outline-none text-black"
                      placeholder="Type property title here"
                      type="text"
                      id="ServiceTitle"
                      readOnly={!isTitleEditable}
                      onBlur={handleTitleBlur}
                    />
                    <label
                      className="cursor-pointer ms-2"
                      onClick={handleTitleEditClick}
                      htmlFor="ServiceTitle"
                    >
                      <img
                        className="size-[5] max-w-5"
                        src={fileEditIcon}
                        alt="edit"
                      />
                    </label>
                  </div>
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="mt-8">
                  <label
                    className="text-lg font-semibold ps-3"
                    htmlFor="ServiceDesc"
                  >
                    Description
                  </label>
                  <div className="flex p-4 border bg-white text-black border-[#D5D5D5] rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]">
                    <textarea
                      {...register("description", {
                        required: "Description is required",
                        maxLength: {
                          value: 500,
                          message: "Description must not exceed 500 characters",
                        },
                      })}
                      rows={6}
                      className="w-full focus:outline-none resize-none"
                      id="ServiceDesc"
                      readOnly={!isDescEditable}
                      onBlur={handleDescBlur}
                    ></textarea>
                    <label
                      className="cursor-pointer ms-2"
                      onClick={handleDescEditClick}
                      htmlFor="ServiceDesc"
                    >
                      <img
                        className="size-[5] max-w-5"
                        src={fileEditIcon}
                        alt="edit"
                      />
                    </label>
                  </div>
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-[24px] leading-normal font-semibold">
                  Service Availability
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Capacity */}
                  <div className="flex flex-wrap justify-between gap-4 items-center border-b border-[#CDCDCD] pb-2 mt-3">
                    <p className="text-lg font-medium text-[#535353] dark:text-white">
                      Capacity
                    </p>
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <BiSolidMinusCircle
                            className={`text-2xl ${
                              noOfCapacity === 0
                                ? "text-[#9A9A9A]"
                                : "cursor-pointer"
                            }`}
                            onClick={handleCapacityDecrease}
                          />
                        </div>
                        <div>
                          <input
                            {...register("noOfCapacity", {
                              required: "Capacity is required",
                              min: { value: 0, message: "Cannot be negative" },
                            })}
                            type="text"
                            className="font-bold text-base bg-transparent border-b border-[#9A9A9A] text-center min-w-[20px]"
                            value={
                              noOfCapacity < 10
                                ? `0${noOfCapacity}`
                                : noOfCapacity
                            }
                            onChange={handleCapacityChange}
                            size={noOfCapacity?.toString().length}
                          />
                        </div>
                        <div>
                          <BiSolidPlusCircle
                            className="text-2xl cursor-pointer"
                            onClick={handleCapacityIncrease}
                          />
                        </div>
                      </div>
                      {errors.noOfCapacity && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.noOfCapacity.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Restrooms */}
                  <div className="flex flex-wrap justify-between gap-4 items-center border-b border-[#CDCDCD] pb-2 mt-3">
                    <p className="text-lg font-medium text-[#535353] dark:text-white">
                      Restrooms
                    </p>
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <BiSolidMinusCircle
                            className={`text-2xl ${
                              noOfRestrooms === 0
                                ? "text-[#9A9A9A]"
                                : "cursor-pointer"
                            }`}
                            onClick={handleRestRoomsDecrease}
                          />
                        </div>
                        <div>
                          <input
                            {...register("noOfRestrooms", {
                              required: "Restrooms count is required",
                              min: { value: 0, message: "Cannot be negative" },
                            })}
                            type="text"
                            className="font-bold text-base bg-transparent border-b border-[#9A9A9A] text-center min-w-[20px]"
                            value={
                              noOfRestrooms < 10
                                ? `0${noOfRestrooms}`
                                : noOfRestrooms
                            }
                            onChange={handleRestRoomsChange}
                            size={noOfRestrooms?.toString().length}
                          />
                        </div>
                        <div>
                          <BiSolidPlusCircle
                            className="text-2xl cursor-pointer"
                            onClick={handleRestRoomsIncrease}
                          />
                        </div>
                      </div>
                      {errors.noOfRestrooms && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.noOfRestrooms.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex gap-x-4 gap-y-2 justify-between flex-wrap-reverse">
                  <h3 className="text-[24px] leading-normal font-semibold">
                    Enter Your Venue Address
                  </h3>
                  <div
                    className="bg-[#32F0CD] flex items-center ms-auto p-1 rounded-full cursor-pointer"
                    onClick={handleUseCurrentLocation}
                  >
                    <img className="ms-auto" src={sendIcongreen} alt="img" />
                    <p className="text-xs font-medium mx-2">
                      Use my current location as a site office
                    </p>
                  </div>
                </div>
                <p className="sm:text-lg">
                  Your address stays private and is only shared with guests once
                  they’ve locked in a Venue.
                </p>

                <div className="bg-white flex items-center p-2 border border-[#D5D5D5] max-w-[600px] w-full mt-4 rounded-[10px] shadow-[0px_8px_24px_0px_#00000012]">
                  <img
                    className="size-9 max-w-9"
                    src={SearchIconBlue}
                    alt="img"
                  />

                  <Autocomplete
                    onLoad={(auto) => setAutocomplete(auto)}
                    onPlaceChanged={handlePlaceChanged}
                    className="w-full"
                  >
                    <input
                      className="w-full px-4 outline-none text-black border-none bg-transparent"
                      type="text"
                      placeholder="Enter your address"
                      {...register("location.address", {
                        required: "Address is required",
                      })}
                      value={watch("location.address") || ""}
                      onChange={(e) =>
                        setValue("location.address", e.target.value, {
                          shouldDirty: true,
                        })
                      }
                    />
                  </Autocomplete>
                </div>

                <p
                  onClick={handleClickOpen}
                  className="text-[#DB7F5B] underline text-sm mt-2 cursor-pointer"
                >
                  Enter manual address
                </p>

                {Object.keys(errors.location || {}).length > 0 && (
                  <p className="text-red-500 text-sm mt-1">
                    Please fill in all required fields in the manual address
                    form.
                  </p>
                )}

                <BootstrapDialog
                  sx={{
                    "& .MuiDialog-paper": {
                      maxWidth: "700px",
                      width: "100%",
                      borderRadius: "30px",
                    },
                    fontFamily: "tt_chocolate",
                  }}
                  open={open}
                >
                  <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }}>
                    <p className="sm:text-xl text-sm">Confirm your address</p>
                  </DialogTitle>
                  <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      color: "grey",
                    }}
                  >
                    <IoCloseCircle className="text-[#979797]" />
                  </IconButton>
                  <DialogContent dividers>
                    <Typography gutterBottom>
                      <form
                        className="max-w-[600px] mx-auto"
                        onSubmit={handleSubmit(
                          (data) => {
                            // If form is valid, close the modal
                            handleClose();
                          },
                          (errors) => {
                            // Prevent modal from closing if there are validation errors
                            console.log("Validation errors:", errors);
                          }
                        )}
                      >
                        <p>
                          Your address is only shared with guests after they’ve
                          made a reservation.
                        </p>

                        {/* Country / Region */}
                        <div className="mb-3">
                          <label>Country / region</label>
                          <input
                            type="text"
                            className="shadow bg-white text-black rounded-lg border w-full px-3 py-2"
                            placeholder="Type here"
                            {...register("location.country", {
                              validate: (value) =>
                                watch("location.address")
                                  ? !!value || "Country is required"
                                  : true,
                            })}
                          />
                          {errors.location?.country && (
                            <p className="text-red-500">
                              {errors.location.country.message}
                            </p>
                          )}
                        </div>

                        {/* Street Address */}
                        <div className="mb-3">
                          <label>Street address</label>
                          <input
                            type="text"
                            className="shadow bg-white text-black rounded-lg border w-full px-3 py-2"
                            placeholder="Type here"
                            {...register("location.address", {
                              required: "Address is required",
                            })}
                          />
                          {errors.location?.address && (
                            <p className="text-red-500">
                              {errors.location.address.message}
                            </p>
                          )}
                        </div>

                        {/* City / Town / Village */}
                        <div className="mb-3">
                          <label>City / town / village</label>
                          <input
                            type="text"
                            className="shadow bg-white text-black rounded-lg border w-full px-3 py-2"
                            placeholder="Type here"
                            {...register("location.city", {
                              validate: (value) =>
                                watch("location.address")
                                  ? !!value || "City is required"
                                  : true,
                            })}
                          />
                          {errors.location?.city && (
                            <p className="text-red-500">
                              {errors.location.city.message}
                            </p>
                          )}
                        </div>

                        {/* Province / State / Territory */}
                        <div className="mb-3">
                          <label>
                            Province / state / territory (if applicable)
                          </label>
                          <input
                            type="text"
                            className="shadow bg-white text-black rounded-lg border w-full px-3 py-2"
                            placeholder="Type here"
                            {...register("location.state", {
                              validate: (value) =>
                                watch("location.address")
                                  ? !!value || "State is required"
                                  : true,
                            })}
                          />
                          {errors.location?.state && (
                            <p className="text-red-500">
                              {errors.location.state.message}
                            </p>
                          )}
                        </div>

                        {/* Zip Code */}
                        <div className="mb-3">
                          <label>Zip Code (if applicable)</label>
                          <input
                            type="text"
                            className="shadow bg-white text-black rounded-lg border w-full px-3 py-2"
                            placeholder="Type here"
                            {...register("location.postalCode", {
                              validate: (value) => {
                                const addressFilled = watch("location.address");
                                if (addressFilled) {
                                  if (!value) return "Zip Code is required";
                                  if (Number(value) < 0)
                                    return "Zip Code cannot be negative";
                                } else {
                                  if (value && Number(value) < 0)
                                    return "Zip Code cannot be negative";
                                }
                                return true;
                              },
                            })}
                          />
                          {errors.location?.postalCode && (
                            <p className="text-red-500">
                              {errors.location.postalCode.message}
                            </p>
                          )}
                        </div>

                        {/* Latitude */}
                        <div className="mb-3">
                          <label>Latitude</label>
                          <input
                            type="text"
                            className="shadow bg-white text-black rounded-lg border w-full px-3 py-2"
                            placeholder="Latitude"
                            {...register("location.latitude", {
                              validate: (value) =>
                                watch("location.address")
                                  ? !!value || "Latitude is required"
                                  : true,
                            })}
                            readOnly
                          />
                          {errors.location?.latitude && (
                            <p className="text-red-500">
                              {errors.location.latitude.message}
                            </p>
                          )}
                        </div>

                        {/* Longitude */}
                        <div className="mb-3">
                          <label>Longitude</label>
                          <input
                            type="text"
                            className="shadow bg-white text-black rounded-lg border w-full px-3 py-2"
                            placeholder="Longitude"
                            {...register("location.longitude", {
                              validate: (value) =>
                                watch("location.address")
                                  ? !!value || "Longitude is required"
                                  : true,
                            })}
                            readOnly
                          />
                          {errors.location?.longitude && (
                            <p className="text-red-500">
                              {errors.location.longitude.message}
                            </p>
                          )}
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-between mt-4 gap-2">
                          <div>
                            <input
                              type="reset"
                              value="Clear"
                              className="underline"
                            />
                          </div>
                          <div>
                            <button
                              type="submit"
                              className="bg-black text-white p-2 px-9 rounded-md"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </Typography>
                  </DialogContent>
                </BootstrapDialog>

                {errors.location?.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.location.address.message}
                  </p>
                )}
              </div>

              <div className="mt-8">
                <AmenitiesDetails />
              </div>
              <div className="mt-8">
                <RulesRegulation />
              </div>
              <div className="mt-10 flex justify-center sm:justify-start items-center gap-x-8 gap-y-4 flex-wrap">
                <Link
                  to={getFormAction()}
                  className="min-w-[150px] flex justify-center bg-[#E7E7E7] text-black border border-[#D5D5D5] rounded-full p-3 font-medium"
                >
                  Cancel
                </Link>
                <button
                  onClick={handleSubmit(onSubmit)}
                  className="min-w-[150px] bg-[#000000] border border-[#000000] rounded-full p-3 font-semibold text-white shadow-[0px_10px_17px_0px_#FD636312]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </FormProvider>
      <Loader
        loading={
          isLoading ||
          isServiceTypeLoading ||
          isServiceLoading ||
          isServiceUpdateLoading
        }
      />
    </>
  );
}

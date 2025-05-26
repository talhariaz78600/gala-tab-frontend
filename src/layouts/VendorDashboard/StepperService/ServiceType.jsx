import { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import {
  FaBuilding,
  FaCamera,
  FaConciergeBell,
  FaUserFriends,
  FaRecordVinyl,
  FaMusic,
  FaVideo,
} from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import { useGetServiceTypeQuery } from "@/api/apiSlice";

const ServiceType = () => {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedServiceTypeId = watch("serviceTypeId");
  const { data, isLoading } = useGetServiceTypeQuery();

  return (
    <div className="py-12 ">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-[#202529] bg-[#E7E7E7]  border rounded-full w-[fit-content] px-5 py-2">
            Step 01
          </p>
          <div>
            <h2 className="text-[#171717] dark:text-white font-bold xl:text-6xl lg:text-5xl text-3xl mt-5">
              Which Best Describes Your Service?
            </h2>
            <p className="text-[#171717] dark:text-white mt-3 text-lg">
              Join thousands of Vendors renting their Service for meetings,
              events, and film and photo shoots.
            </p>
          </div>
        </div>
        <div>
          <div className="w-full max-w-md mx-auto p-4">
            <h2 className="text-xl font-semibold mb-4">
              What type of Service do you have?
            </h2>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.serviceTypeId}
            >
              <InputLabel id="service-select-label" className="dark:text-white">
                Select Service
              </InputLabel>

              <Select
                sx={{
                  backgroundColor: "#F7FBFF",
                  fontFamily: "tt_chocolates",
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3b82f6",
                  },
                }}
                className="dark:bg-gray-800 dark:text-white"
                labelId="service-select-label"
                label="Select Service"
                {...register("serviceTypeId", {
                  required: "Service is required",
                })}
                value={selectedServiceTypeId || ""}
                onChange={(e) =>
                  setValue("serviceTypeId", e.target.value, {
                    shouldDirty: true,
                  })
                }
                renderValue={(selected) => {
                  const selectedService = data?.data?.find(
                    (service) => service._id === selected
                  );
                  return (
                    <div className="flex items-center gap-2 dark:text-white">
                      {selectedService?.blackIcon && (
                        <img
                          className="size-5 object-contain dark:invert"
                          src={selectedService.blackIcon}
                          alt="icon"
                        />
                      )}
                      <span>{selectedService?.name}</span>
                    </div>
                  );
                }}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center py-2">
                    <CircularProgress size={24} />
                  </div>
                ) : data?.data?.length > 0 ? (
                  data.data.map((service) => {
                    const Icon = service.blackIcon;
                    return (
                      <MenuItem
                        key={service._id}
                        value={service._id}
                        sx={{
                          backgroundColor: "#F7FBFF",
                          fontFamily: "tt_chocolates",
                          "&.Mui-selected": {
                            backgroundColor: "#e0f2fe",
                            fontWeight: "bold",
                            color: "#1e40af",
                          },
                          "&.Mui-selected:hover": {
                            backgroundColor: "#bae6fd",
                          },
                          "&:hover": {
                            backgroundColor: "#e0f2fe",
                          },
                        }}
                        className="flex items-center gap-2 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                      >
                        {Icon && (
                          <img
                            className="size-6 object-contain dark:invert"
                            src={Icon}
                            alt="icon"
                          />
                        )}
                        <span>{service.name}</span>
                      </MenuItem>
                    );
                  })
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-2">
                    No data available
                  </p>
                )}
              </Select>

              {errors.serviceTypeId && (
                <FormHelperText className="dark:text-red-300">
                  {errors.serviceTypeId.message}
                </FormHelperText>
              )}
            </FormControl>

            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                className="accent-black w-5 h-5"
                {...register("instant_booking_check")}
                onChange={(e) =>
                  setValue("instantBookingCheck", e.target.checked, {
                    shouldDirty: true,
                  })
                }
              />
              <label className="font-medium">Allow instant booking</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceType;

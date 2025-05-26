import { useGetGadgetsQuery } from "@/api/apiSlice";
import React from "react";
import { useFormContext } from "react-hook-form";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
const SetPrice = ({ mode = "new" }) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useFormContext();
  const { data, isLoading } = useGetGadgetsQuery();
  const [globalTime, setGlobalTime] = useState({ start: "", end: "" });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const selectedTime = watch("timeOf") || "";
  const selectedPricingModel = watch("pricingModel") || "";
  const servicePrice = watch("servicePrice") || [];

  register("serviceDays", {
    validate: (value) => {
      if (!value || value.length === 0) {
        return "Please select at least one service day.";
      }

      for (let day of value) {
        if (!day.startTime || !day.endTime) {
          return `Start and end time required for ${day.day}`;
        }
        if (day.startTime >= day.endTime) {
          return `End time must be after start time for ${day.day}`;
        }
      }

      return true;
    },
  });

  register("timeOf", {
    validate: (value) =>
      value === "AM" || value === "PM" || "Please select a time (AM/PM)",
  });

  register("pricingModel", {
    validate: (value) =>
      value === "hourly" ||
      value === "daily" ||
      "Please select a Pricing Model (Hourly/Daily)",
  });
  register("servicePrice", {
    validate: (value) => {
      if (!value || value.length === 0) {
        return "At least one service must be selected.";
      }

      const allValid = value.every(
        (item) =>
          item.serviceId &&
          item.price !== undefined &&
          item.price !== "" &&
          !isNaN(Number(item.price)) &&
          Number(item.price) > 0
      );

      return (
        allValid ||
        "All selected services must have a valid price greater than 0."
      );
    },
  });

  const toggleDaySelection = (day) => {
    const lowerDay = day.toLowerCase();
    const current = watch("serviceDays") || [];

    const exists = current.find((d) => d.day === lowerDay);
    if (exists) {
      setValue(
        "serviceDays",
        current.filter((d) => d.day !== lowerDay)
      );
    } else {
      setValue("serviceDays", [
        ...current,
        { day: lowerDay, startTime: "", endTime: "" },
      ]);
    }
  };

  const updateServiceDayTime = (index, field, value) => {
    const updated = [...watch("serviceDays")];
    updated[index][field] = value;

    const { startTime, endTime } = updated[index];

    if (!startTime || !endTime || startTime >= endTime) {
      setError("serviceDays", {
        type: "manual",
        message:
          "Each selected day must have a valid start and end time (end must be after start).",
      });
    } else {
      clearErrors("serviceDays");
    }

    setValue("serviceDays", updated, { shouldDirty: true });
  };

  const applyGlobalTimeToAll = () => {
    const current = watch("serviceDays") || [];

    const updated = current.map((item) => ({
      ...item,
      startTime: globalTime.start,
      endTime: globalTime.end,
    }));

    const isInvalidTime = (start, end) => {
      if (!start || !end) return true;

      const startDate = new Date(`1970-01-01T${start}:00`);
      const endDate = new Date(`1970-01-01T${end}:00`);

      return endDate <= startDate;
    };

    const hasError = updated.some((item) =>
      isInvalidTime(item.startTime, item.endTime)
    );

    if (hasError) {
      setError("serviceDays", {
        type: "manual",
        message:
          "Each selected day must have a valid time range (end time must be after start time).",
      });
      return;
    } else {
      clearErrors("serviceDays");
    }

    setValue("serviceDays", updated, { shouldDirty: true });
  };

  // Handle checkbox selection
  const handleCheckboxChange = (id, checked) => {
    let updatedServices = [...(watch("servicePrice") || [])];

    if (checked) {
      // Add service if not already selected
      if (!updatedServices.some((s) => s.serviceId === id)) {
        updatedServices.push({ serviceId: id, price: "" });
      }
    } else {
      // Remove service
      updatedServices = updatedServices.filter((s) => s.serviceId !== id);
    }

    setValue("servicePrice", updatedServices, { shouldDirty: true });

    // Validate: ensure all selected services have price
    const hasMissingPrice = updatedServices.some(
      (s) => !s.price || s.price === "" || Number(s.price) <= 0
    );

    if (hasMissingPrice) {
      setError("servicePrice", {
        type: "manual",
        message: "Price is required for all selected services.",
      });
    } else {
      clearErrors("servicePrice");
    }
  };

  const handlePriceChange = (id, value) => {
    const updated = [...(watch("servicePrice") || [])].map((s) =>
      s.serviceId === id ? { ...s, price: value } : s
    );

    setValue("servicePrice", updated, { shouldDirty: true });

    // Validate again after price input
    const hasMissingPrice = updated.some(
      (s) => !s.price || s.price === "" || Number(s.price) <= 0
    );

    if (hasMissingPrice) {
      setError("servicePrice", {
        type: "manual",
        message: "Price is required for all selected services.",
      });
    } else {
      clearErrors("servicePrice");
    }
  };

  return (
    <div className="py-5 px-4">
      <div
        className={`grid gap-4 ${
          mode === "new" ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {mode === "new" && (
          <div>
            <p className="text-[#202529] bg-[#E7E7E7] border rounded-full w-[fit-content] px-5 py-2">
              Step 10
            </p>
            <div>
              <h2 className="text-[#171717] dark:text-white font-bold xl:text-6xl lg:text-5xl text-3xl mt-5">
                Set Your Service Price<br></br>
                —Let's Do This!
              </h2>
              <p className="text-[#171717] dark:text-white mt-3 text-lg">
                Feel free to tweak it whenever you like!
              </p>
            </div>
          </div>
        )}

        <div>
          <div className="mt-6">
            <p className="font-medium text-lg text-[#484848] dark:text-white">
              Select Service Days <span className="text-red-500">*</span>
            </p>

            {/* Day Selection */}
            <div className="flex flex-wrap gap-3 mt-3">
              {days.map((day) => {
                const selectedDay = watch("serviceDays")?.find(
                  (d) => d.day === day.toLowerCase()
                );

                return (
                  <div
                    key={day}
                    className={`min-w-[130px] text-center cursor-pointer px-4 py-2 border rounded-xl transition-colors
          ${
            selectedDay
              ? "bg-black text-white dark:bg-white dark:text-black"
              : "bg-gray-100 text-black hover:bg-gray-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 border-gray-300 dark:border-slate-600"
          }`}
                    onClick={() => toggleDaySelection(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>

            {/* Global Time Setter */}
            {watch("serviceDays")?.length > 0 && (
              <div className="mt-6 p-4 bg-gray-100 border rounded-xl">
                <h4 className="font-medium text-gray-700  mb-2">
                  Set Time for All Selected Days
                </h4>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Start</label>
                    <input
                      type="time"
                      value={globalTime.start}
                      onChange={(e) =>
                        setGlobalTime({ ...globalTime, start: e.target.value })
                      }
                      className="rounded-md border px-2 py-1 text-sm text-black"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">End</label>
                    <input
                      type="time"
                      value={globalTime.end}
                      onChange={(e) =>
                        setGlobalTime({ ...globalTime, end: e.target.value })
                      }
                      className="rounded-md border px-2 py-1 text-sm text-black"
                    />
                  </div>
                  <button
                    onClick={applyGlobalTimeToAll}
                    className="bg-black text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-800 transition"
                  >
                    Apply to All
                  </button>
                </div>
              </div>
            )}

            {/* Individual Day Time Setters */}
            <div className="mt-6 space-y-4">
              {watch("serviceDays")?.map((item, index) => (
                <div
                  key={item.day}
                  className="flex flex-col md:flex-row md:items-center gap-4 border p-4 rounded-xl bg-gray-50"
                >
                  <div className="font-semibold text-gray-700 capitalize w-24">
                    {item.day}
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Start</label>
                    <input
                      type="time"
                      value={item.startTime || ""}
                      onChange={(e) =>
                        updateServiceDayTime(index, "startTime", e.target.value)
                      }
                      className="rounded-md border px-2 py-1 text-sm text-black"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">End</label>
                    <input
                      type="time"
                      value={item.endTime || ""}
                      onChange={(e) =>
                        updateServiceDayTime(index, "endTime", e.target.value)
                      }
                      className="rounded-md border px-2 py-1 text-sm text-black"
                      min={item.startTime}
                    />
                  </div>
                </div>
              ))}
            </div>

            {errors.serviceDays && (
              <p className="text-red-500 text-sm mt-2">
                {errors.serviceDays.message}
              </p>
            )}
          </div>

          <div className="mt-6">
            <p className="font-medium text-lg text-[#484848] dark:text-white">
              Select Pricing Type
            </p>
            <div className="flex items-center gap-12 mt-4">
              <div className="flex items-center gap-2">
                <input
                  className="size-6 min-w-6 accent-black"
                  type="radio"
                  name="pricingModel"
                  id="hourly"
                  value="hourly"
                  {...register("pricingModel")}
                  onChange={() =>
                    setValue("pricingModel", "hourly", { shouldDirty: true })
                  }
                  checked={selectedPricingModel === "hourly"}
                />
                <label className="text-sm font-medium" htmlFor="hourly">
                  Per Hour
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="size-6 min-w-6 accent-black"
                  type="radio"
                  name="pricingModel"
                  id="daily"
                  value="daily"
                  {...register("pricingModel")}
                  onChange={() =>
                    setValue("pricingModel", "daily", { shouldDirty: true })
                  }
                  checked={selectedPricingModel === "daily"}
                />
                <label className="text-sm font-medium" htmlFor="daily">
                  Per Day
                </label>
              </div>
            </div>
            {errors.pricingModel && (
              <p className="text-red-500 text-sm mt-2">
                {errors.pricingModel.message}
              </p>
            )}
          </div>

          {/* Select Time (AM/PM) */}
          <div className="mt-6">
            <p className="font-medium text-lg text-[#484848] dark:text-white">
              Select Time
            </p>
            <div className="flex items-center gap-12 mt-4">
              <div className="flex items-center gap-2">
                <input
                  className="size-6 min-w-6 accent-black"
                  type="radio"
                  name="timeOf"
                  id="am"
                  value="AM"
                  {...register("timeOf")}
                  onChange={() =>
                    setValue("timeOf", "AM", { shouldDirty: true })
                  }
                  checked={selectedTime === "AM"}
                />
                <label className="text-sm font-medium" htmlFor="am">
                  AM
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="size-6 min-w-6 accent-black"
                  type="radio"
                  name="timeOf"
                  id="pm"
                  value="PM"
                  {...register("timeOf")}
                  onChange={() =>
                    setValue("timeOf", "PM", { shouldDirty: true })
                  }
                  checked={selectedTime === "PM"}
                />
                <label className="text-sm font-medium" htmlFor="pm">
                  PM
                </label>
              </div>
            </div>
            {errors.timeOf && (
              <p className="text-red-500 text-sm mt-2">
                {errors.timeOf.message}
              </p>
            )}
          </div>

          <div className="bg-[#F7F7F7] rounded-xl p-3 mt-6">
            <div className="overflow-y-auto h-[400px] px-2">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <CircularProgress size={40} />
                </div>
              ) : data?.data.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  No Data Available
                </div>
              ) : (
                data?.data.map((item, index) => {
                  const isChecked = servicePrice.some(
                    (s) => s.serviceId === item._id
                  );
                  const service = servicePrice.find(
                    (s) => s.serviceId === item._id
                  );

                  return (
                    <div
                      key={index}
                      className="flex flex-wrap items-center gap-3 border p-3 rounded-lg mt-3"
                    >
                      <input
                        type="checkbox"
                        id={item._id}
                        className="accent-black w-5 h-5"
                        checked={isChecked}
                        onChange={(e) =>
                          handleCheckboxChange(item._id, e.target.checked)
                        }
                      />
                      <div className="border p-2 flex items-center rounded-lg bg-white gap-2">
                        <p className="text-black">$</p>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="w-24 bg-transparent text-black"
                          value={service?.price || ""}
                          onChange={(e) =>
                            handlePriceChange(item._id, e.target.value)
                          }
                          disabled={!isChecked}
                        />
                      </div>
                      <label
                        htmlFor={item._id}
                        className="text-black font-medium text-lg"
                      >
                        {item.name}
                      </label>
                    </div>
                  );
                })
              )}
            </div>
            {errors.servicePrice && (
              <p className="text-red-500 text-sm mt-2">
                {errors.servicePrice.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPrice;
